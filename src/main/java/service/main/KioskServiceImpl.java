package service.main;

import java.util.List;

import dao.main.KioskDao;
import dao.main.KioskDaoImpl;
import dto.KioskDto;

public class KioskServiceImpl implements KioskService {
	private KioskDao kioskdao;
	
	public KioskServiceImpl() {
		kioskdao = new KioskDaoImpl();
	}
	@Override
	public List<KioskDto> selectKioskList(int branchCode) throws Exception {
		return kioskdao.selectKioskList(branchCode);
	}

}
