package dao.main;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dto.KioskDto;
import util.MyBatisSqlSessionFactory;

public class KioskDaoImpl implements KioskDao {

	@Override
	public List<KioskDto> selectKioskList(int branchCode) throws Exception {
		List<KioskDto> kioskList = null;
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession()) {
			kioskList = sqlSession.selectList("mapper.kiosk2.getKioskList", branchCode);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return kioskList;
	}

}
