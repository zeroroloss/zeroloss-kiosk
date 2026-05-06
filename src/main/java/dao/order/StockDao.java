package dao.order;

import java.util.List;
import java.util.Map;

import dto.StockDeductDto;

public interface StockDao {
	List<StockDeductDto> baseStock(String orderId);
	List<StockDeductDto> optionStock(String orderId);
	int deductStock(StockDeductDto dto);
	List<String> selectUnavailableRecipeCodes(int branchCode) throws Exception;
	List<Map<String, Object>> selectBranchStockLotsForDeduct(Map<String, Object> param);
	int updateBranchStockQty(Map<String, Object> param);
}
