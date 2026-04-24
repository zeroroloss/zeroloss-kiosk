package service.main;

import java.util.Map;

import dao.main.AccountDao;
import dao.main.AccountDaoImpl;
import dto.AccountDto;

public class AccountServiceImpl implements AccountService {
	
	private AccountDao accountDao;
	
	public AccountServiceImpl() {
		accountDao = new AccountDaoImpl();
	}
	
	@Override
	public AccountDto login(String login_id, String password, int kiosk_id) throws Exception{
		return accountDao.loginKiosk(login_id, password, kiosk_id);
	}

}
