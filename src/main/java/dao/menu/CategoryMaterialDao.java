package dao.menu;

import java.util.List;

import dto.CategoryMaterialDto;

public interface CategoryMaterialDao {
	List<CategoryMaterialDto> selectCategoryMaterialList(int categoryId) throws Exception;
}
