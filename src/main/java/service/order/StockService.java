package service.order;

public interface StockService {
	void deductStockByOrderId(String orderId) throws Exception;
}
