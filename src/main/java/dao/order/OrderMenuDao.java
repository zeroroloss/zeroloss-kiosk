package dao.order;

import org.apache.ibatis.session.SqlSession;

import dto.OrderMenuDto;

public interface OrderMenuDao {
	 void insertOrderMenu(SqlSession sqlSession, OrderMenuDto orderMenuDto) throws Exception;
}
