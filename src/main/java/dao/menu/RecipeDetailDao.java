package dao.menu;

import java.util.List;

import dto.RecipeDetailDto;

public interface RecipeDetailDao {
	List<RecipeDetailDto> selectRecipeDetail(String recipeCode);
}
