package service.main;

import dto.AccountDto;

public interface AccountService {
	AccountDto login(String login_id, String password, int kioskId) throws Exception;
}
