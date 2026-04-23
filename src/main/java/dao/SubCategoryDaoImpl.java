package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dto.MainCategoryDto;
import dto.SubCategoryDto;
import util.MyBatisSqlSessionFactory;

public class SubCategoryDaoImpl implements SubCategoryDao {

	@Override
	public List<SubCategoryDto> selectSubCategory() throws Exception {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		List<SubCategoryDto> subList = null;
		try {
			subList = sqlSession.selectList("mapper.kiosk1.selectSubCategoryList");
		} catch(Exception e) {
			throw e;
		} finally {
			sqlSession.close();
		}
		return subList;
	}

}
