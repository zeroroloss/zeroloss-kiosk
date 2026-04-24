package dao.order;

import org.apache.ibatis.session.SqlSession;

import dto.OrderOptionDto;
import util.MyBatisSqlSessionFactory;

public class OrderOptionDaoImpl implements OrderOptionDao {

	@Override
	public void insertOrderOption(SqlSession sqlSession, OrderOptionDto orderOptionDto) throws Exception {
		sqlSession.insert("mapper.kiosk2.insertOrderMenu", orderOptionDto);
	}
}
