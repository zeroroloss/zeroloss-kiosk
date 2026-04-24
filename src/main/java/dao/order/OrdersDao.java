package dao.order;

import org.apache.ibatis.session.SqlSession;

import dto.OrdersDto;

public interface OrdersDao {
	void insertOrder(SqlSession sqlSession, OrdersDto ordersDto) throws Exception;
	OrdersDto selectOrder(int orderId) throws Exception;
}
