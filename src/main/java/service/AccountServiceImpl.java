package service;

import java.util.Map;

import dao.AccountDAO;
import dao.AccountDaoImpl;
import dto.AccountDTO;

public class AccountServiceImpl implements AccountService {
	
	private AccountDAO accountDao;
	
	public AccountServiceImpl() {
		accountDao = new AccountDaoImpl();
	}
	
	@Override
	public AccountDTO login(String loginId, String password, int kiosk_id) {
		return accountDao.loginKiosk(loginId, password, kiosk_id);
	}

}
