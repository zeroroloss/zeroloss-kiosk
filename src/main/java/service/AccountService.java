package service;

import java.util.Map;

import dto.AccountDTO;

public interface AccountService {
	AccountDTO login(String login_id, String password, int kioskId);
}
