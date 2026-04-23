package dto;

public class AccountDto {
	private Integer account_id;
	private Integer branch_code;
	private String login_id;
	private String password;
	private String  branchName;
	private Integer kiosk_id;
	
	public AccountDto() {
		super();
	}
	public AccountDto(Integer account_id, Integer branch_code, String login_id, String password, String branchName,
			Integer kiosk_id) {
		super();
		this.account_id = account_id;
		this.branch_code = branch_code;
		this.login_id = login_id;
		this.password = password;
		this.branchName = branchName;
		this.kiosk_id = kiosk_id;
	}
	
	public Integer getAccount_id() {
		return account_id;
	}
	public void setAccount_id(Integer account_id) {
		this.account_id = account_id;
	}
	public Integer getBranch_code() {
		return branch_code;
	}
	public void setBranch_code(Integer branch_code) {
		this.branch_code = branch_code;
	}
	public String getLogin_id() {
		return login_id;
	}
	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public Integer getKiosk_id() {
		return kiosk_id;
	}
	public void setKiosk_id(Integer kiosk_id) {
		this.kiosk_id = kiosk_id;
	}
	
	@Override
	public String toString() {
		return "AccountDTO [account_id=" + account_id + ", branch_code=" + branch_code + ", login_id=" + login_id
				+ ", password=" + password + ", branchName=" + branchName + ", kiosk_id=" + kiosk_id + "]";
	}
}
