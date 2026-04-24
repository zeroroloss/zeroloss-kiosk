package dao.menu;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dto.MainCategoryDto;
import util.MyBatisSqlSessionFactory;

public class MainCategoryDaoImpl implements MainCategoryDao {

	@Override
	public List<MainCategoryDto> selectMainCategory() throws Exception {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		List<MainCategoryDto> mainList = null;
		try {
			mainList = sqlSession.selectList("mapper.kiosk1.selectMainCategoryList");
		} catch(Exception e) {
			throw e;
		} finally {
			sqlSession.close();
		}
		return mainList;
	}

}
