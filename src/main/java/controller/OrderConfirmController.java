package controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dto.MaterialStockDto;
import dto.RecipeMaterialDto;
import service.menu.MenuSelectService;
import service.menu.MenuSelectServiceImpl;

/**
 * Servlet implementation class OrderConfirmController
 */
@WebServlet("/kiosk/orderCon")
public class OrderConfirmController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OrderConfirmController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			HttpSession session = request.getSession();

			Integer branchCode = (Integer) session.getAttribute("branchCode");

			if (branchCode == null) {
				response.sendRedirect(request.getContextPath() + "/kiosk/start");
				return;
			}

			MenuSelectService service = new MenuSelectServiceImpl();

			List<RecipeMaterialDto> recipeMaterialList =
					service.selectRecipeMaterialList();

			List<MaterialStockDto> stockList =
					service.selectCurrentStockList(branchCode);

			Map<Integer, List<RecipeMaterialDto>> recipeMaterialMap = new HashMap<>();

			for (RecipeMaterialDto dto : recipeMaterialList) {
				int recipeCode = dto.getRecipeCode();

				if (!recipeMaterialMap.containsKey(recipeCode)) {
					recipeMaterialMap.put(recipeCode, new ArrayList<>());
				}

				recipeMaterialMap.get(recipeCode).add(dto);
			}

			request.setAttribute("recipeMaterialMap", recipeMaterialMap);
			request.setAttribute("stockList", stockList);

			request.getRequestDispatcher("/kiosk_jsp/menu/order_confirm.jsp")
					.forward(request, response);

		} catch (Exception e) {
			e.printStackTrace();
			throw new ServletException(e);
		}
		
	}

}
