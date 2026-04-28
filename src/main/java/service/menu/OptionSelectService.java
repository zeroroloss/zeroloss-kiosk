package service.menu;

import java.util.List;

import dto.CategoryMaterialDto;
import dto.MaterialDto;
import dto.OptionMaterialStockDto;

public interface OptionSelectService {
	List<CategoryMaterialDto> selectCategoryMaterialList(int categoryId) throws Exception;
    List<MaterialDto> selectMaterialListByCategoryId(int categoryId) throws Exception;
    List<OptionMaterialStockDto> selectOptionMaterialStockList(int branchCode, int multiplier) throws Exception;
}
