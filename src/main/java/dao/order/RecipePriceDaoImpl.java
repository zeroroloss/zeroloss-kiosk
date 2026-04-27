package dao.order;

import org.apache.ibatis.session.SqlSession;

import util.MyBatisSqlSessionFactory;

public class RecipePriceDaoImpl implements RecipePriceDao {

	@Override
	public int selectRecipePrice(String recipeCode) throws Exception {
			Integer selectRecipePrice = 0;
	  try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession()) {
		   selectRecipePrice = sqlSession.selectOne("mapper.kiosk2.selectRecipePrice", recipeCode);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	  return selectRecipePrice;
	}

	@Override
	public int selectMaterialPrice(String materialCode) throws Exception {
			Integer price = 0;
		 try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession()) {
	           price = sqlSession.selectOne("mapper.kiosk2.selectMaterialPrice", materialCode);
	        } catch (Exception e) {
	        	e.printStackTrace();
	        }
		 return price != null ? price : 0;
	}

	

}
