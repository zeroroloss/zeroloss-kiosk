package dao.order;

import org.apache.ibatis.session.SqlSession;

import dto.OrdersDto;

public interface OrdersDao {
	void insertOrder(SqlSession sqlSession, OrdersDto ordersDto) throws Exception;
	OrdersDto selectOrder(String orderId) throws Exception;
	void updateOrders(OrdersDto ordersDto) throws Exception;
	int selectBranchCode(String orderId) throws Exception;
}
