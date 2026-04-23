package dto;

public class RecipeDto {
	private String recipeCode;
	private Integer categoryId;
	private String subCategoryCode;
	private String name;
	private Integer price;
	private String imgUrl;
	private boolean isActive;
	
	public RecipeDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RecipeDto(String recipeCode, Integer categoryId, String subCategoryCode, String name, Integer price,
			String imgUrl, boolean isActive) {
		super();
		this.recipeCode = recipeCode;
		this.categoryId = categoryId;
		this.subCategoryCode = subCategoryCode;
		this.name = name;
		this.price = price;
		this.imgUrl = imgUrl;
		this.isActive = isActive;
	}

	public String getRecipeCode() {
		return recipeCode;
	}

	public void setRecipeCode(String recipeCode) {
		this.recipeCode = recipeCode;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getSubCategoryCode() {
		return subCategoryCode;
	}

	public void setSubCategoryCode(String subCategoryCode) {
		this.subCategoryCode = subCategoryCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
	
}
