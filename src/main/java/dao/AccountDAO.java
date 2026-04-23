package dao;

import java.util.Map;

import dto.AccountDTO;

public interface AccountDAO {
	AccountDTO loginKiosk(String login_id, String password, int kiosk_id);
}
