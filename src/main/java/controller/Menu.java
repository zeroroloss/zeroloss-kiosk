package controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dto.MainCategoryDto;
import dto.RecipeDto;
import dto.SubCategoryDto;
import service.MenuSelectService;
import service.MenuSelectServiceImpl;

/**
 * Servlet implementation class Menu
 */
@WebServlet("/kiosk/menu")
public class Menu extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Menu() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		
		try {
			MenuSelectService service = new MenuSelectServiceImpl();
			request.setAttribute("recipeList", service.RecipeList());
			request.setAttribute("mainCategoryList", service.MainList());
			request.setAttribute("subCategoryList", service.SubList());
			request.getRequestDispatcher("/kiosk_jsp/menu/menu.jsp").forward(request, response);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}


}
