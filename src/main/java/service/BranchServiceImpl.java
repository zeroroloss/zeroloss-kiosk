package service;

import java.util.List;

import dao.BranchDao;
import dao.BranchDaoImpl;
import dto.BranchDto;

public class BranchServiceImpl implements BranchService {
	
	private BranchDao branchDao;
	
	public BranchServiceImpl() {
		branchDao = new BranchDaoImpl();
	}
	@Override
	public List<BranchDto> selectBranchList() throws Exception {
		return branchDao.selectBranchList();
	}

}
