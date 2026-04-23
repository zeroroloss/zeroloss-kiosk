package service;

import java.util.List;

import dao.MainCategoryDao;
import dao.MainCategoryDaoImpl;
import dao.RecipeDao;
import dao.RecipeDaoImpl;
import dao.SubCategoryDao;
import dao.SubCategoryDaoImpl;
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

}
