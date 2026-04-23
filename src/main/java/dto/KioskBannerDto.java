package dto;

public class KioskBannerDto {
	private Integer	kioskId;
	private Integer branchCode;
	private String status;
	private Integer startSeq;
	
	public KioskBannerDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public KioskBannerDto(Integer kioskId, Integer branchCode, String status, Integer startSeq) {
		super();
		this.kioskId = kioskId;
		this.branchCode = branchCode;
		this.status = status;
		this.startSeq = startSeq;
	}

	public Integer getKioskId() {
		return kioskId;
	}

	public void setKioskId(Integer kioskId) {
		this.kioskId = kioskId;
	}

	public Integer getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(Integer branchCode) {
		this.branchCode = branchCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getStartSeq() {
		return startSeq;
	}

	public void setStartSeq(Integer startSeq) {
		this.startSeq = startSeq;
	}
	
}
