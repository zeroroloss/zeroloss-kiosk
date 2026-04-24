package service.menu;

import java.util.List;

import dao.menu.CategoryMaterialDao;
import dao.menu.CategoryMaterialDaoImpl;
import dao.menu.MaterialDao;
import dao.menu.MaterialDaoImpl;
import dto.CategoryMaterialDto;
import dto.MaterialDto;

public class OptionSelectServiceImpl implements OptionSelectService {
	private CategoryMaterialDao categoryMaterialDao = new CategoryMaterialDaoImpl();
	private MaterialDao materialDao = new MaterialDaoImpl();	
	
	@Override
	public List<CategoryMaterialDto> selectCategoryMaterialList(int categoryId) throws Exception {
		return categoryMaterialDao.selectCategoryMaterialList(categoryId);
	}

	@Override
	public List<MaterialDto> selectMaterialListByCategoryId(int categoryId) throws Exception {
		return materialDao.selectMaterialListByCategoryId(categoryId);
	}

}
