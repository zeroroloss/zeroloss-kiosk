package service;

import java.util.List;

import dto.KioskDto;

public interface KioskService {
	 List<KioskDto> selectKioskList(int branchCode) throws Exception;
}
