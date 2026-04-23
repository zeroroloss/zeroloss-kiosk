package dao;

import java.util.List;

import dto.MainCategoryDto;

public interface MainCategoryDao {
	List<MainCategoryDto> selectMainCategory() throws Exception;
}
