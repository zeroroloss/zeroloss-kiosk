package dto;

public class OrderOptionDto {
	private Integer oderOptionId;
	private Integer orderMenuId;
	private String materialCode;
	private Integer extraPrice;
	
	public OrderOptionDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OrderOptionDto(Integer oderOptionId, Integer orderMenuId, String materialCode, Integer extraPrice) {
		super();
		this.oderOptionId = oderOptionId;
		this.orderMenuId = orderMenuId;
		this.materialCode = materialCode;
		this.extraPrice = extraPrice;
	}

	public Integer getOderOptionId() {
		return oderOptionId;
	}

	public void setOderOptionId(Integer oderOptionId) {
		this.oderOptionId = oderOptionId;
	}

	public Integer getOrderMenuId() {
		return orderMenuId;
	}

	public void setOrderMenuId(Integer orderMenuId) {
		this.orderMenuId = orderMenuId;
	}

	public String getMaterialCode() {
		return materialCode;
	}

	public void setMaterialCode(String materialCode) {
		this.materialCode = materialCode;
	}

	public Integer getExtraPrice() {
		return extraPrice;
	}

	public void setExtraPrice(Integer extraPrice) {
		this.extraPrice = extraPrice;
	}
	
}
