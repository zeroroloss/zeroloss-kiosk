package dto;

public class KioskDTO {
	private Integer kiosk_id;
	private int branch_code;
	private String status;
	
	
	public KioskDTO() {
		super();
	}
	
	public KioskDTO(Integer kiosk_id, int branch_code, String status) {
		super();
		this.kiosk_id = kiosk_id;
		this.branch_code = branch_code;
		this.status = status;
	}
	public Integer getKiosk_id() {
		return kiosk_id;
	}
	public void setKiosk_id(Integer kiosk_id) {
		this.kiosk_id = kiosk_id;
	}
	public int getBranch_code() {
		return branch_code;
	}
	public void setBranch_code(int branch_code) {
		this.branch_code = branch_code;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	@Override
	public String toString() {
		return "Kiosk [kiosk_id=" + kiosk_id + ", branch_code=" + branch_code + ", status=" + status + "]";
	}
}
