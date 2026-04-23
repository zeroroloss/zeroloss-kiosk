package dto;

public class OrdersDto {
	private Integer orderId;
	private Integer branchCode; 
	private Integer kioskId;
	private String orderSeq;
	private String orderType;
	private Integer totalAmount;
	
	public OrdersDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OrdersDto(Integer orderId, Integer branchCode, Integer kioskId, String orderSeq, String orderType,
			Integer totalAmount) {
		super();
		this.orderId = orderId;
		this.branchCode = branchCode;
		this.kioskId = kioskId;
		this.orderSeq = orderSeq;
		this.orderType = orderType;
		this.totalAmount = totalAmount;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(Integer branchCode) {
		this.branchCode = branchCode;
	}

	public Integer getKioskId() {
		return kioskId;
	}

	public void setKioskId(Integer kioskId) {
		this.kioskId = kioskId;
	}

	public String getOrderSeq() {
		return orderSeq;
	}

	public void setOrderSeq(String orderSeq) {
		this.orderSeq = orderSeq;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public Integer getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Integer totalAmount) {
		this.totalAmount = totalAmount;
	}

	
	
}
