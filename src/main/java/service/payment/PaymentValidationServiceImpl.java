package service.payment;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import dao.order.RecipePriceDao;
import dao.order.RecipePriceDaoImpl;

public class PaymentValidationServiceImpl implements PaymentValidationService {
	private RecipePriceDao receipePriceDao;
	public PaymentValidationServiceImpl() {
		receipePriceDao = new RecipePriceDaoImpl();
	}
	
	@Override
	public int calculateServerTotal(String cartJson) throws Exception {
		JSONParser parser = new JSONParser();
        JSONArray cart = (JSONArray) parser.parse(cartJson);
        int total = 0;

        for (Object obj : cart) {
            JSONObject item = (JSONObject) obj;

            String recipeCode = (String) item.get("recipeCode");
            int qty = ((Long) item.getOrDefault("qty", 1L)).intValue();

            // DB에서 실제 레시피 가격 조회
            int recipePrice = receipePriceDao.selectRecipePrice(recipeCode);

            // 옵션 가격 조회
            JSONArray materialCodes = (JSONArray) item.get("materialCodes");
            int extraPrice = 0;
            if (materialCodes != null) {
                for (Object codeObj : materialCodes) {
                    String materialCode = (String) codeObj;
                    extraPrice += receipePriceDao.selectMaterialPrice(materialCode);
                }
            }

            total += (recipePrice + extraPrice) * qty;
        }

        return total;
    }

}
