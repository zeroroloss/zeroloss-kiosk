package dao.main;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import dto.AccountDto;
import util.MyBatisSqlSessionFactory;

public class AccountDaoImpl implements AccountDao {

	@Override
	public AccountDto loginKiosk(String login_id, String password, int kiosk_id) throws Exception{
		AccountDto account = null;
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
