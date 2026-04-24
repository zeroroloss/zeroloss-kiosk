package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dto.MaterialDto;
import util.MyBatisSqlSessionFactory;

public class MaterialDaoImpl implements MaterialDao {

	@Override
	public List<MaterialDto> selectMaterialListByCategoryId(int categoryId) throws Exception {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		List<MaterialDto> materialListByCategoryId = null;
		try {
			materialListByCategoryId = sqlSession.selectList("mapper.kiosk1.selectMaterialListByCategoryId",categoryId);
		} catch(Exception e) {
			throw e;
		} finally {
			sqlSession.close();
		}
		return materialListByCategoryId;
	}

	@Override
	public List<MaterialDto> selectMaterialListByMaterialGroupId(int materialGroupId) throws Exception {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		List<MaterialDto> materialListByMaterialGroupID = null;
		try {
			materialListByMaterialGroupID = sqlSession.selectList("mapper.kiosk1.selectMaterialListByMaterialGroupId",materialGroupId);
		} catch(Exception e) {
			throw e;
		} finally {
			sqlSession.close();
		}
		return materialListByMaterialGroupID;
	}

}
