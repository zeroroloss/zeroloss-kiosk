package dao.menu;

import java.util.List;

import dto.MaterialDto;
import dto.OptionMaterialStockDto;

public interface MaterialDao {
	 List<MaterialDto> selectMaterialListByCategoryId(int categoryId) throws Exception;
	 List<MaterialDto> selectMaterialListByMaterialGroupId(int materialGroupId) throws Exception;
	 List<OptionMaterialStockDto> selectOptionMaterialStockList(int branchCode, int multiplier) throws Exception;
}
