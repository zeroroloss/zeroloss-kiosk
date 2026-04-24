package dao.order;

import org.apache.ibatis.session.SqlSession;

import dto.OrdersDto;
import util.MyBatisSqlSessionFactory;

public class OrdersDaoImpl implements OrdersDao {

	@Override
	public void insertOrder(SqlSession sqlSession, OrdersDto ordersDto) throws Exception {
		sqlSession.insert("mapper.kiosk2.insertOrder", ordersDto);
	}

	@Override
	public OrdersDto selectOrder(int orderId) throws Exception {
		OrdersDto ordersDto = null;
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession()) {
			sqlSession.selectOne("mapper.kiosk2.selectOrder", orderId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ordersDto;
	}
}
