package dto;

public class StockDeductDto {
	private Integer branchCode;   // 지점
    private String materialCode;  // 재료코드
    private Integer deductQty;    // 차감 수량
    private Integer orderMenuId;
    
	public StockDeductDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StockDeductDto(Integer branchCode, String materialCode, Integer deductQty) {
		super();
		this.branchCode = branchCode;
		this.materialCode = materialCode;
		this.deductQty = deductQty;
	}
	
	public Integer getOrderMenuId() {
	    return orderMenuId;
	}
	
	public void setOrderMenuId(Integer orderMenuId) {
	    this.orderMenuId = orderMenuId;
	}

	public Integer getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(Integer branchCode) {
		this.branchCode = branchCode;
	}

	public String getMaterialCode() {
		return materialCode;
	}

	public void setMaterialCode(String materialCode) {
		this.materialCode = materialCode;
	}

	public Integer getDeductQty() {
		return deductQty;
	}

	public void setDeductQty(Integer deductQty) {
		this.deductQty = deductQty;
	}
    
}
