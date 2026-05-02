package dto;

public class MaterialStockDto {
	private Integer materialCode;
    private double currentQty;
    
	public MaterialStockDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MaterialStockDto(Integer materialCode, double currentQty) {
		super();
		this.materialCode = materialCode;
		this.currentQty = currentQty;
	}

	public Integer getMaterialCode() {
		return materialCode;
	}

	public void setMaterialCode(Integer materialCode) {
		this.materialCode = materialCode;
	}

	public double getCurrentQty() {
		return currentQty;
	}

	public void setCurrentQty(double currentQty) {
		this.currentQty = currentQty;
	}
    
}
