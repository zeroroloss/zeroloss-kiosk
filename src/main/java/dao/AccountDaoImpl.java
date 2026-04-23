package dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import dto.AccountDTO;
import util.MyBatisSqlSessionFactory;

public class AccountDaoImpl implements AccountDAO {

	@Override
	public AccountDTO loginKiosk(String login_id, String password, int kiosk_id) {
		AccountDTO account = null;
		 Map<String, Object> authData = new HashMap<>();
		 try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSessionFactory().openSession()) {
			 authData.put("login_id", login_id);
			 authData.put("password",  password);
			 authData.put("kiosk_id", kiosk_id);
			 account = sqlSession.selectOne("mapper.kiosk2.loginKiosk", authData);
		    } catch (Exception e) {
		        e.printStackTrace();
		    }
		    return account;
		}

}
