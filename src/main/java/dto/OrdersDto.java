package dto;

public class OrdersDto {
	private String orderId;
	private Integer branchCode; 
	private Integer kioskId;
	private String orderType;
	private Integer totalAmount;
	private String status;
	
	public OrdersDto() {
		super();
	}
	public OrdersDto(String orderId, Integer branchCode, Integer kioskId, String orderType, Integer totalAmount,
			String status) {
		super();
		this.orderId = orderId;
		this.branchCode = branchCode;
		this.kioskId = kioskId;
		this.orderType = orderType;
		this.totalAmount = totalAmount;
		this.status = status;
	}

	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
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
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "OrdersDto [orderId=" + orderId + ", branchCode=" + branchCode + ", kioskId=" + kioskId + ", orderType="
				+ orderType + ", totalAmount=" + totalAmount + "]";
	}
}
