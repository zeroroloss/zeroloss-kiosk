package dto;

public class RecipeDetailDto {
	private Integer recipeDetailId;
	private String recipeCode;
	private String materialCode;
	private Integer requiredQty;
	private String materialName;
	
	public RecipeDetailDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RecipeDetailDto(Integer recipeDetailId, String recipeCode, String materialCode, Integer requiredQty,
			String materialName) {
		super();
		this.recipeDetailId = recipeDetailId;
		this.recipeCode = recipeCode;
		this.materialCode = materialCode;
		this.requiredQty = requiredQty;
		this.materialName = materialName;
	}



	public RecipeDetailDto(Integer recipeDetailId, String recipeCode, String materialCode, Integer requiredQty) {
		super();
		this.recipeDetailId = recipeDetailId;
		this.recipeCode = recipeCode;
		this.materialCode = materialCode;
		this.requiredQty = requiredQty;
	}

	public Integer getRecipeDetailId() {
		return recipeDetailId;
	}

	public void setRecipeDetailId(Integer recipeDetailId) {
		this.recipeDetailId = recipeDetailId;
	}

	public String getRecipeCode() {
		return recipeCode;
	}

	public void setRecipeCode(String recipeCode) {
		this.recipeCode = recipeCode;
	}

	public String getMaterialCode() {
		return materialCode;
	}

	public void setMaterialCode(String materialCode) {
		this.materialCode = materialCode;
	}

	public Integer getRequiredQty() {
		return requiredQty;
	}

	public void setRequiredQty(Integer requiredQty) {
		this.requiredQty = requiredQty;
	}

	public String getMaterialName() {
		return materialName;
	}

	public void setMaterialName(String materialName) {
		this.materialName = materialName;
	}
	
	
}
