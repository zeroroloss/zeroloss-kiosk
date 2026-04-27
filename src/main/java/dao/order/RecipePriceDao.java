package dao.order;

public interface RecipePriceDao {
	
	int selectRecipePrice(String recipeCode) throws Exception;
	int selectMaterialPrice(String materialCode) throws Exception;

}
