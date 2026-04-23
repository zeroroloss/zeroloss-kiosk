package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dto.BranchDto;
import util.MyBatisSqlSessionFactory;

public class BranchDaoImpl implements BranchDao {

	@Override
	public List<BranchDto> selectBranchList() throws Exception {
		List<BranchDto> branchList = null;
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession()) {
			branchList = sqlSession.selectList("mapper.kiosk2.getBranchList");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return branchList;
	}

}
