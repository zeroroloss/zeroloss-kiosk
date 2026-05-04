package dao.order;

import java.util.List;

import dto.StockDeductDto;

public interface StockDao {
	List<StockDeductDto> baseStock(String orderId);
	List<StockDeductDto> optionStock(String orderId);
	int deductStock(StockDeductDto dto);
	List<String> selectUnavailableRecipeCodes(int branchCode) throws Exception;
}
