package dto;

public class MaterialDto {

	private String materialCode;
	private Integer materialGroupId;
	private String materialName;
	private Integer price;
	
	public MaterialDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MaterialDto(String materialCode, Integer materialGroupId, String materialName, Integer price) {
		super();
		this.materialCode = materialCode;
		this.materialGroupId = materialGroupId;
		this.materialName = materialName;
		this.price = price;
	}

	public String getMaterialCode() {
		return materialCode;
	}

	public void setMaterialCode(String materialCode) {
		this.materialCode = materialCode;
	}

	public Integer getMaterialGroupId() {
		return materialGroupId;
	}

	public void setMaterialGroupId(Integer materialGroupId) {
		this.materialGroupId = materialGroupId;
	}

	public String getMaterialName() {
		return materialName;
	}

	public void setMaterialName(String materialName) {
		this.materialName = materialName;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}
	
}
