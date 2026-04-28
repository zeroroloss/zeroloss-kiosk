package service.order;

import java.util.List;

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
}
