package dao.main;

import java.util.Map;

import dto.AccountDto;

public interface AccountDao {
	AccountDto loginKiosk(String login_id, String password, int kiosk_id) throws Exception;
}
