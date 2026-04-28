package dao.order;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dto.StockDeductDto;
import util.MyBatisSqlSessionFactory;

public class StockDaoImple implements StockDao {

	@Override
	public List<StockDeductDto> baseStock(String orderId) {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		List<StockDeductDto> baseStock = null;
		try {
			baseStock = sqlSession.selectList("mapper.kiosk1.baseStock",orderId);
		} catch(Exception e) {
			throw e;
		} finally {
			sqlSession.close();
		}
		return baseStock;
	}

	@Override
	public List<StockDeductDto> optionStock(String orderId) {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		List<StockDeductDto> optionStock = null;
		try {
			optionStock = sqlSession.selectList("mapper.kiosk1.optionStock",orderId);
		} catch(Exception e) {
			throw e;
		} finally {
			sqlSession.close();
		}
		return optionStock;
	}

	@Override
	public int deductStock(StockDeductDto dto) {
		SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession();
		int result = 0;
		try {
			result = sqlSession.update("mapper.kiosk1.deductStock", dto);
			sqlSession.commit();
		} catch (Exception e) {
			sqlSession.rollback();
			throw e;
		} finally {
			sqlSession.close();
		}
		return result;
	}

}
