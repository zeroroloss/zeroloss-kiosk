package dao.menu;

import java.util.List;

import dto.SubCategoryDto;

public interface SubCategoryDao {
	List<SubCategoryDto> selectSubCategory() throws Exception;
}
