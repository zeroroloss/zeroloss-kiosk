package service.menu;

import java.util.List;

import dao.menu.MainCategoryDao;
import dao.menu.MainCategoryDaoImpl;
import dao.menu.RecipeDao;
import dao.menu.RecipeDaoImpl;
import dao.menu.SubCategoryDao;
import dao.menu.SubCategoryDaoImpl;
import dto.MainCategoryDto;
import dto.RecipeDto;
import dto.SubCategoryDto;

public class MenuSelectServiceImpl implements MenuSelectService {

	private RecipeDao recipeDao = new RecipeDaoImpl();
	private MainCategoryDao mainDao = new MainCategoryDaoImpl();
	private SubCategoryDao subDao = new SubCategoryDaoImpl();
	
	@Override
	public List<RecipeDto> RecipeList() throws Exception {
		return recipeDao.selectRecipe();
	}

	@Override
	public List<MainCategoryDto> MainList() throws Exception {
		return mainDao.selectMainCategory();
	}

	@Override
	public List<SubCategoryDto> SubList() throws Exception {
		return subDao.selectSubCategory();
	}

	@Override
	public List<Integer> selectUnavailableRecipeCodes(int branchCode) throws Exception {
		return recipeDao.selectUnavailableRecipeCodes(branchCode);
	}

}
