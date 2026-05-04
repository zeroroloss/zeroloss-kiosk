package service.order;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import dao.order.OrderMenuDao;
import dao.order.OrderMenuDaoImpl;
import dao.order.OrderOptionDao;
import dao.order.OrderOptionDaoImpl;
import dao.order.OrdersDao;
import dao.order.OrdersDaoImpl;
import dto.OrderMenuDto;
import dto.OrderOptionDto;
import dto.OrdersDto;
import util.MyBatisSqlSessionFactory;

public class OrderServiceImpl implements OrderService {
	private OrdersDao ordersDao;
	private OrderMenuDao orderMenuDao;
	private OrderOptionDao orderOptionDao;
	
	public OrderServiceImpl() {
		ordersDao = new OrdersDaoImpl();
		orderMenuDao = new OrderMenuDaoImpl();
		orderOptionDao = new OrderOptionDaoImpl();
	}

	@Override
	public void insertFullOrder(OrdersDto ordersDto, List<OrderMenuDto> orderMenuList,
			List<List<OrderOptionDto>> orderOptionLists) throws Exception {
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession(false)) {
			try {
				// 1. orders insert
				ordersDao.insertOrder(sqlSession, ordersDto);

				// 2. order_menu insert
				for (int i = 0; i < orderMenuList.size(); i++) {
					OrderMenuDto orderMenuDto = orderMenuList.get(i);
					orderMenuDto.setOrderId(ordersDto.getOrderId());
					orderMenuDao.insertOrderMenu(sqlSession, orderMenuDto);

					// 3. order_option insert
					List<OrderOptionDto> options = orderOptionLists.get(i);
					for (OrderOptionDto orderOptionDto : options) {
						orderOptionDto.setOrderMenuId(orderMenuDto.getOrderMenuId());
						orderOptionDao.insertOrderOption(sqlSession, orderOptionDto);
					}
				}
				sqlSession.commit();

			} catch (Exception e) {
				sqlSession.rollback();
				throw e;
			}
		}
	}

	@Override
	public void updateOrders(OrdersDto ordersDto) throws Exception {
		ordersDao.updateOrders(ordersDto);
	}

	@Override
	public boolean checkStockAvailable(int branchCode, List<OrderMenuDto> orderMenuList,
			List<List<OrderOptionDto>> orderOptionList) throws Exception {
		try (SqlSession sqlSession =
	            MyBatisSqlSessionFactory.getSqlSessionFactory().openSession()) {

	        Map<String, Double> needMap = new HashMap<>();

	        for (int i = 0; i < orderMenuList.size(); i++) {
	            OrderMenuDto menu = orderMenuList.get(i);

	            String recipeCode = menu.getRecipeCode();
	            int qty = menu.getQty();

	            Integer categoryId =
	                    sqlSession.selectOne(
	                            "mapper.kiosk1.selectCategoryIdByRecipeCode",
	                            recipeCode
	                    );

	            boolean isLargeBread = false;

	            List<OrderOptionDto> options = orderOptionList.get(i);

	            for (OrderOptionDto option : options) {

	                String code = option.getMaterialCode();

	                try {

	                    int breadCode = Integer.parseInt(code);

	                    if (breadCode >= 107 && breadCode <= 112) {
	                        isLargeBread = true;
	                        break;
	                    }

	                } catch (Exception e) {
	                }
	            }

	            int multiplier =
	                    (categoryId != null && categoryId == 2) || isLargeBread ? 2: 1;

	            // 1. 기본 재료 계산
	            List<Map<String, Object>> recipeMaterials =
	                    sqlSession.selectList("mapper.kiosk1.selectRecipeMaterialForStockCheck", recipeCode);

	            for (Map<String, Object> material : recipeMaterials) {
	                String materialCode = String.valueOf(material.get("materialCode"));
	                double requiredQty = Double.parseDouble(String.valueOf(material.get("requiredQty")));

	                double needQty = requiredQty * qty * multiplier;

	                needMap.put(
	                        materialCode,
	                        needMap.getOrDefault(materialCode, 0.0) + needQty
	                );
	            }

	            // 2. 옵션 재료 계산
	            for (OrderOptionDto option : options) {
	                String materialCode = option.getMaterialCode();

	                // 담지않기 / 추가없음 같은 비재고 옵션은 제외
	                if ("901".equals(materialCode) || "902".equals(materialCode) || "903".equals(materialCode)) {
	                    continue;
	                }

	                double needQty = qty * multiplier;

	                needMap.put(
	                        materialCode,
	                        needMap.getOrDefault(materialCode, 0.0) + needQty
	                );
	            }
	        }

	        // 3. 현재 DB 재고와 비교
	        for (String materialCode : needMap.keySet()) {
	            Map<String, Object> param = new HashMap<>();
	            param.put("branchCode", branchCode);
	            param.put("materialCode", materialCode);

	            Double currentQty =
	                    sqlSession.selectOne("mapper.kiosk1.selectCurrentQtyForStockCheck", param);

	            if (currentQty == null) {
	                currentQty = 0.0;
	            }

	            double needQty = needMap.get(materialCode);

	            if (currentQty < needQty) {
	                return false;
	            }
	        }

	        return true;
	    }
	}
}
