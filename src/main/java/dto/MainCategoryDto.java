package dto;

public class MainCategoryDto {
	private Integer categoryId;
	private String name;
	private boolean isActive;
	
	public MainCategoryDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MainCategoryDto(Integer categoryId, String name, boolean isActive) {
		super();
		this.categoryId = categoryId;
		this.name = name;
		this.isActive = isActive;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
	
	
	
}
