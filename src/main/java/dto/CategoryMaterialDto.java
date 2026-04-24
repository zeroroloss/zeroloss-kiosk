package dto;

public class CategoryMaterialDto {
	private Integer materialGroupId;
	private String groupName;
	private Integer groupMin;
	private Integer groupMax;

	public Integer getMaterialGroupId() {
		return materialGroupId;
	}

	public void setMaterialGroupId(Integer materialGroupId) {
		this.materialGroupId = materialGroupId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public Integer getGroupMin() {
		return groupMin;
	}

	public void setGroupMin(Integer groupMin) {
		this.groupMin = groupMin;
	}

	public Integer getGroupMax() {
		return groupMax;
	}

	public void setGroupMax(Integer groupMax) {
		this.groupMax = groupMax;
	}
}
