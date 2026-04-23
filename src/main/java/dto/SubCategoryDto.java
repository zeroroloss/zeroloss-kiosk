package dto;

public class SubCategoryDto {
	private String subCategoryCode;
	private Integer categoryId;
	private String name;
	
	public SubCategoryDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SubCategoryDto(String subCateoryCode, Integer categoryId, String name) {
		super();
		this.subCategoryCode = subCateoryCode;
		this.categoryId = categoryId;
		this.name = name;
	}

	public String getSubCategoryCode() {
		return subCategoryCode;
	}

	public void setSubCategoryCode(String subCateoryCode) {
		this.subCategoryCode = subCateoryCode;
	}

	public Integer getcategoryId() {
		return categoryId;
	}

	public void setcategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
