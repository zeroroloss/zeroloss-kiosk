package dao.menu;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import dto.MaterialDto;
import dto.OptionMaterialStockDto;
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

	@Override
	public List<OptionMaterialStockDto> selectOptionMaterialStockList(int branchCode, int multiplier) throws Exception {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
	    List<OptionMaterialStockDto> list = null;
	    try {
	        Map<String, Object> param = new HashMap<>();
	        param.put("branchCode", branchCode);
	        param.put("multiplier", multiplier);
	        list = sqlSession.selectList("mapper.kiosk1.selectOptionMaterialStockList", param);
	    } catch (Exception e) {
	        throw e;
	    } finally {
	        sqlSession.close();
	    }
	    return list;
	}

}
