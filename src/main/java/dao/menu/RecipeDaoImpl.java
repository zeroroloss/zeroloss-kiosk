package dao.menu;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dto.RecipeDto;
import util.MyBatisSqlSessionFactory;

public class RecipeDaoImpl implements RecipeDao {

	@Override
	public List<RecipeDto> selectRecipe() throws Exception {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		List<RecipeDto> recipeList = null;
		try {
			recipeList = sqlSession.selectList("mapper.kiosk1.selectRecipeList");
		} catch(Exception e) {
			throw e;
		} finally {
			sqlSession.close();
		}
		return recipeList;
	
	}

	@Override
	public List<Integer> selectUnavailableRecipeCodes(int branchCode) throws Exception {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
	    List<Integer> list = null;

	    try {
	        list = sqlSession.selectList("mapper.kiosk1.selectUnavailableRecipeCodes",branchCode);
	    } catch (Exception e) {
	        throw e;
	    } finally {
	        sqlSession.close();
	    }

	    return list;
	}

}
