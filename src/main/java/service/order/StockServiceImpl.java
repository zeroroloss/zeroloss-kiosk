package service.order;

import java.util.List;

import dao.order.OrdersDao;
import dao.order.OrdersDaoImpl;
import dao.order.StockDao;
import dao.order.StockDaoImple;
import dto.StockDeductDto;

public class StockServiceImpl implements StockService {

    private StockDao stockDao = new StockDaoImple();
    private OrdersDao ordersDao = new OrdersDaoImpl();

    @Override
    public void deductStockByOrderId(String orderId) throws Exception {
        int branchCode = ordersDao.selectBranchCode(orderId);

        List<StockDeductDto> baseList = stockDao.baseStock(orderId);
        List<StockDeductDto> optionList = stockDao.optionStock(orderId);

        // 1. 기본재료 차감
        deductList(branchCode, baseList);

        // 2. 일반 옵션 차감
        for (StockDeductDto option : optionList) {
            String code = option.getMaterialCode();

            if ("401".equals(code) || "407".equals(code)) {
                continue;
            }

            deductOne(branchCode, option);
        }

        // 3. order_menu_id별 치즈추가 / 미트추가 처리
        for (StockDeductDto option : optionList) {
            String optionCode = option.getMaterialCode();

            // 치즈추가
            if ("401".equals(optionCode)) {
                deductSelectedCheese(branchCode, option.getOrderMenuId(), optionList);
            }

            // 미트추가
            if ("407".equals(optionCode)) {
                deductBaseMeat(branchCode, option.getOrderMenuId(), baseList);
            }
        }
    }

    private void deductSelectedCheese(
            int branchCode,
            Integer orderMenuId,
            List<StockDeductDto> optionList
    ) throws Exception {

        for (StockDeductDto option : optionList) {
            if (!sameOrderMenu(orderMenuId, option.getOrderMenuId())) {
                continue;
            }

            if (isCheeseMaterial(option.getMaterialCode())) {
                deductOne(branchCode, option);
            }
        }
    }

    private void deductBaseMeat(
            int branchCode,
            Integer orderMenuId,
            List<StockDeductDto> baseList
    ) throws Exception {

        for (StockDeductDto base : baseList) {
            if (!sameOrderMenu(orderMenuId, base.getOrderMenuId())) {
                continue;
            }

            if (isMeatMaterial(base.getMaterialCode())) {
                deductOne(branchCode, base);
            }
        }
    }

    private boolean sameOrderMenu(Integer a, Integer b) {
        return a != null && a.equals(b);
    }

    private void deductList(int branchCode, List<StockDeductDto> list) throws Exception {
        for (StockDeductDto dto : list) {
            deductOne(branchCode, dto);
        }
    }

    private void deductOne(int branchCode, StockDeductDto dto) throws Exception {
        dto.setBranchCode(branchCode);
        stockDao.deductStock(dto);
    }

    private boolean isCheeseMaterial(String materialCode) {
        return "201".equals(materialCode)
            || "202".equals(materialCode)
            || "203".equals(materialCode);
    }

    private boolean isMeatMaterial(String materialCode) {
        return "402".equals(materialCode)
            || "403".equals(materialCode)
            || "601".equals(materialCode)
            || "602".equals(materialCode)
            || "603".equals(materialCode)
            || "604".equals(materialCode)
            || "606".equals(materialCode)
            || "607".equals(materialCode)
            || "609".equals(materialCode)
            || "611".equals(materialCode)
            || "612".equals(materialCode)
            || "613".equals(materialCode)
            || "614".equals(materialCode)
            || "615".equals(materialCode)
            || "617".equals(materialCode);
    }
}