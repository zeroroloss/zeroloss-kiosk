package dao.order;

import org.apache.ibatis.session.SqlSession;

import dto.OrderOptionDto;

public interface OrderOptionDao {
	 void insertOrderOption(SqlSession sqlSession, OrderOptionDto orderOptionDto) throws Exception;
}
