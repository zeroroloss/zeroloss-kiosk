package service.main;

import java.util.List;

import dto.BranchDto;

public interface BranchService {
	List<BranchDto> selectBranchList() throws Exception;
}
