package service.menu;

import java.util.List;

import dto.RecipeDetailDto;

public interface RecipeDetailService {
	List<RecipeDetailDto> RecipeDetailList(String recipeCode) throws Exception;
}
