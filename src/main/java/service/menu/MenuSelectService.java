package service.menu;

import java.util.List;

import dto.MainCategoryDto;
import dto.MaterialStockDto;
import dto.RecipeDto;
import dto.RecipeMaterialDto;
import dto.SubCategoryDto;

public interface MenuSelectService {
	List<RecipeDto> RecipeList() throws Exception;
	List<MainCategoryDto> MainList() throws Exception;
	List<SubCategoryDto> SubList() throws Exception;
	List<Integer> selectUnavailableRecipeCodes(int branchCode) throws Exception;
	
	List<RecipeMaterialDto> selectRecipeMaterialList() throws Exception;
	List<MaterialStockDto> selectCurrentStockList(Integer branchCode) throws Exception;
}
