package dto;

public class CategoryMaterialGroupDto {
	private Integer caMaId;
	private Integer categoryId;
	private Integer materialGroupId;
	
	public CategoryMaterialGroupDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CategoryMaterialGroupDto(Integer caMaId, Integer categoryId, Integer materialGroupId) {
		super();
		this.caMaId = caMaId;
		this.categoryId = categoryId;
		this.materialGroupId = materialGroupId;
	}

	public Integer getCaMaId() {
		return caMaId;
	}

	public void setCaMaId(Integer caMaId) {
		this.caMaId = caMaId;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getMaterialGroupId() {
		return materialGroupId;
	}

	public void setMaterialGroupId(Integer materialGroupId) {
		this.materialGroupId = materialGroupId;
	}
	
	
	
}
