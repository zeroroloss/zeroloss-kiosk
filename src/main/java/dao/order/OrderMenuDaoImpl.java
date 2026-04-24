package dao.order;

import org.apache.ibatis.session.SqlSession;

import dto.OrderMenuDto;
import util.MyBatisSqlSessionFactory;

public class OrderMenuDaoImpl implements OrderMenuDao {

	@Override
	public void insertOrderMenu(SqlSession sqlSession, OrderMenuDto orderMenuDto) throws Exception {
		sqlSession.insert("mapper.kiosk2.insertOrderMenu", orderMenuDto);
	}
}
