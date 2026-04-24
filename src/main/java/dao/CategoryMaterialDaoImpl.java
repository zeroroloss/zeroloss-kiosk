package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dto.CategoryMaterialDto;
import util.MyBatisSqlSessionFactory;

public class CategoryMaterialDaoImpl implements CategoryMaterialDao {

	@Override
	public List<CategoryMaterialDto> selectCategoryMaterialList(int categoryId) throws Exception {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		List<CategoryMaterialDto> categorymaterialList = null;
		try {
			categorymaterialList = sqlSession.selectList("mapper.kiosk1.selectCategoryMaterialList",categoryId);
		} catch(Exception e) {
			throw e;
		} finally {
			sqlSession.close();
		}
		return categorymaterialList;
	}

}
