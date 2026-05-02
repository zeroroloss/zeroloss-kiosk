package dto;

public class RecipeMaterialDto {
	  private Integer recipeCode;
	  private Integer materialCode;
	  private double deductQty;
	  
	public RecipeMaterialDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RecipeMaterialDto(Integer recipeCode, Integer materialCode, double deductQty) {
		super();
		this.recipeCode = recipeCode;
		this.materialCode = materialCode;
		this.deductQty = deductQty;
	}

	public Integer getRecipeCode() {
		return recipeCode;
	}

	public void setRecipeCode(Integer recipeCode) {
		this.recipeCode = recipeCode;
	}

	public Integer getMaterialCode() {
		return materialCode;
	}

	public void setMaterialCode(Integer materialCode) {
		this.materialCode = materialCode;
	}

	public double getDeductQty() {
		return deductQty;
	}

	public void setDeductQty(double deductQty) {
		this.deductQty = deductQty;
	}
	
}
