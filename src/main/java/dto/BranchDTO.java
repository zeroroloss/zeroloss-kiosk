package dto;

public class BranchDTO {
	private Integer branch_code;
	private String name;
	private String status;
	
	public BranchDTO() {
		super();
	}
	public BranchDTO(Integer branch_code, String name, String status) {
		super();
		this.branch_code = branch_code;
		this.name = name;
		this.status = status;
	}
	
	public Integer getBranch_code() {
		return branch_code;
	}
	public void setBranch_code(Integer branch_code) {
		this.branch_code = branch_code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	@Override
	public String toString() {
		return "Branch [branch_code=" + branch_code + ", name=" + name + ", status=" + status + "]";
	}
}
