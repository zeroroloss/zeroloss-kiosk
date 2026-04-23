package dao;

import java.util.List;

import dto.KioskDto;

public interface KioskDao {
	 List<KioskDto> selectKioskList(int branchCode) throws Exception;
}
