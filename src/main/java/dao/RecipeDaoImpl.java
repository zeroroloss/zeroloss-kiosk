package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dto.MainCategoryDto;
import dto.RecipeDto;
import util.MyBatisSqlSessionFactory;

public class RecipeDaoImpl implements RecipeDao {

	@Override
	public List<RecipeDto> selectRecipe() throws Exception {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		List<RecipeDto> recipeList = null;
		try {
			recipeList = sqlSession.selectList("mapper.recipe.selectRecipeList");
		} catch(Exception e) {
			throw e;
		} finally {
			sqlSession.close();
		}
		return recipeList;
	
	}

}
