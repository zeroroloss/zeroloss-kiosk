package dao.menu;

import java.util.List;

import dto.MaterialStockDto;
import dto.RecipeDto;
import dto.RecipeMaterialDto;

public interface RecipeDao {
	List<RecipeDto> selectRecipe() throws Exception;
	List<Integer> selectUnavailableRecipeCodes(int branchCode) throws Exception;
	List<RecipeMaterialDto> selectRecipeMaterialList() throws Exception;
	List<MaterialStockDto> selectCurrentStockList(Integer branchCode) throws Exception;
}
