package service.menu;

import java.util.List;

import dto.CategoryMaterialDto;
import dto.MaterialDto;

public interface OptionSelectService {
	List<CategoryMaterialDto> selectCategoryMaterialList(int categoryId) throws Exception;
    List<MaterialDto> selectMaterialListByCategoryId(int categoryId) throws Exception;
}
