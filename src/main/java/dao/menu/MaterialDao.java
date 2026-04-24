package dao.menu;

import java.util.List;

import dto.MaterialDto;

public interface MaterialDao {
	 List<MaterialDto> selectMaterialListByCategoryId(int categoryId) throws Exception;
	 List<MaterialDto> selectMaterialListByMaterialGroupId(int materialGroupId) throws Exception;
}
