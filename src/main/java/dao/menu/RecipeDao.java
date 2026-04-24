package dao.menu;

import java.util.List;

import dto.RecipeDto;

public interface RecipeDao {
	List<RecipeDto> selectRecipe() throws Exception;
}
