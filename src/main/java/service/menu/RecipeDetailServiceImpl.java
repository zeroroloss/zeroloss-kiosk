package service.menu;

import java.util.List;

import dao.menu.RecipeDetailDao;
import dao.menu.RecipeDetailDaoImpl;
import dto.RecipeDetailDto;

public class RecipeDetailServiceImpl implements RecipeDetailService {

	private RecipeDetailDao recipeDetailDao = new RecipeDetailDaoImpl();
	
	@Override
	public List<RecipeDetailDto> RecipeDetailList(String recipeCode) throws Exception {
		return recipeDetailDao.selectRecipeDetail(recipeCode);
	}

}
