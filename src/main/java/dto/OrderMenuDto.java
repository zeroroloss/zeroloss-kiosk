package dto;

public class OrderMenuDto {
	private Integer orderMenuId;
	private Integer orderId;
	private String recipCode;
	private Integer qty;
	private Integer unit_price;
	private Integer lineTotalAmount;
	private Boolean toasting;
	
	public OrderMenuDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OrderMenuDto(Integer orderMenuId, Integer orderId, String recipCode, Integer qty, Integer unit_price,
			Integer lineTotalAmount, Boolean toasting) {
		super();
		this.orderMenuId = orderMenuId;
		this.orderId = orderId;
		this.recipCode = recipCode;
		this.qty = qty;
		this.unit_price = unit_price;
		this.lineTotalAmount = lineTotalAmount;
		this.toasting = toasting;
	}

	public Integer getOrderMenuId() {
		return orderMenuId;
	}

	public void setOrderMenuId(Integer orderMenuId) {
		this.orderMenuId = orderMenuId;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public String getRecipCode() {
		return recipCode;
	}

	public void setRecipCode(String recipCode) {
		this.recipCode = recipCode;
	}

	public Integer getQty() {
		return qty;
	}

	public void setQty(Integer qty) {
		this.qty = qty;
	}

	public Integer getUnit_price() {
		return unit_price;
	}

	public void setUnit_price(Integer unit_price) {
		this.unit_price = unit_price;
	}

	public Integer getLineTotalAmount() {
		return lineTotalAmount;
	}

	public void setLineTotalAmount(Integer lineTotalAmount) {
		this.lineTotalAmount = lineTotalAmount;
	}

	public Boolean getToasting() {
		return toasting;
	}

	public void setToasting(Boolean toasting) {
		this.toasting = toasting;
	}
	
	
	
}
