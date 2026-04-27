package dto;

public class OrderMenuDto {
	private Integer orderMenuId;
	private String orderId;
	private String recipeCode;
	private Integer qty;
	private Integer unit_price;
	private Integer lineTotalAmount;

	public OrderMenuDto() {
		super();
	}
	public OrderMenuDto(Integer orderMenuId, String orderId, String recipeCode, Integer qty, Integer unit_price,
			Integer lineTotalAmount) {
		super();
		this.orderMenuId = orderMenuId;
		this.orderId = orderId;
		this.recipeCode = recipeCode;
		this.qty = qty;
		this.unit_price = unit_price;
		this.lineTotalAmount = lineTotalAmount;
	}
	public Integer getOrderMenuId() {
		return orderMenuId;
	}
	public void setOrderMenuId(Integer orderMenuId) {
		this.orderMenuId = orderMenuId;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getRecipeCode() {
		return recipeCode;
	}
	public void setRecipeCode(String recipeCode) {
		this.recipeCode = recipeCode;
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
	
	@Override
	public String toString() {
		return "OrderMenuDto [orderMenuId=" + orderMenuId + ", orderId=" + orderId + ", recipeCode=" + recipeCode
				+ ", qty=" + qty + ", unit_price=" + unit_price + ", lineTotalAmount=" + lineTotalAmount + "]";
	}
	
}