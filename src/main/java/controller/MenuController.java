package controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import service.menu.MenuSelectService;
import service.menu.MenuSelectServiceImpl;

/**
 * Servlet implementation class Menu
 */
@WebServlet("/kiosk/menu")
public class MenuController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MenuController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");

        try {
            HttpSession session = request.getSession();

            Integer branchCode = (Integer) session.getAttribute("branchCode");

            if (branchCode == null) {
                response.sendRedirect(request.getContextPath() + "/kiosk/test");
                return;
            }

            MenuSelectService service = new MenuSelectServiceImpl();

            List<Integer> unavailableRecipeCodes =
                    service.selectUnavailableRecipeCodes(branchCode);

            request.setAttribute("recipeList", service.RecipeList());
            request.setAttribute("mainCategoryList", service.MainList());
            request.setAttribute("subCategoryList", service.SubList());
            request.setAttribute("unavailableRecipeCodes", unavailableRecipeCodes);

            System.out.println("branchCode = " + branchCode);
            System.out.println("품절 메뉴 코드 = " + unavailableRecipeCodes);

            request.getRequestDispatcher("/kiosk_jsp/menu/menu.jsp")
                   .forward(request, response);

        } catch (Exception e) {
            e.printStackTrace();
            throw new ServletException(e);
        }
    }

}
