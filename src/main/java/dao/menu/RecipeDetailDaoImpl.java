package dao.menu;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dto.RecipeDetailDto;
import util.MyBatisSqlSessionFactory;

public class RecipeDetailDaoImpl implements RecipeDetailDao {

	@Override
	public List<RecipeDetailDto> selectRecipeDetail(String recipeCode) {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		List<RecipeDetailDto> recipeDetailList = null;
		try {
			recipeDetailList = sqlSession.selectList("mapper.kiosk1.selectRecipeDetailList", recipeCode);
		} catch(Exception e) {
			throw e;
		} finally {
			sqlSession.close();
		}
		return recipeDetailList;
		
	}

}
