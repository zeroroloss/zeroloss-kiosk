package dto;

public class MaterialDto {

	private String materialCode;
	private Integer materialGroupId;
	private String materialName;
	private Integer perice;
	
	public MaterialDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MaterialDto(String materialCode, Integer materialGroupId, String materialName, Integer perice) {
		super();
		this.materialCode = materialCode;
		this.materialGroupId = materialGroupId;
		this.materialName = materialName;
		this.perice = perice;
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

	public Integer getPerice() {
		return perice;
	}

	public void setPerice(Integer perice) {
		this.perice = perice;
	}
	
	
	
}
