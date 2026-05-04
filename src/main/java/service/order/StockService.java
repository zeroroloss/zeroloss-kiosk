package service.order;

import java.util.List;

import dto.OrderMenuDto;

public interface StockService {
	void deductStockByOrderId(String orderId) throws Exception;
}
