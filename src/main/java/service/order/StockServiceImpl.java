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
		
		for(StockDeductDto dto : baseList) {
			dto.setBranchCode(branchCode);
			stockDao.deductStock(dto);
		}
		
		for (StockDeductDto dto : optionList) {
			
			if ("401".equals(dto.getMaterialCode()) || "407".equals(dto.getMaterialCode())) {
			    continue;
			}
			
		    dto.setBranchCode(branchCode);
		    stockDao.deductStock(dto);
		}
	}

}
