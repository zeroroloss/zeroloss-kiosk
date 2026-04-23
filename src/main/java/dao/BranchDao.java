package dao;

import java.util.List;

import dto.BranchDto;

public interface BranchDao {
	List<BranchDto> selectBranchList() throws Exception;
}
