package service.main;

import java.util.List;

import dao.main.BranchDao;
import dao.main.BranchDaoImpl;
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
