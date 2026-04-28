package controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dto.RecipeDetailDto;
import service.menu.RecipeDetailService;
import service.menu.RecipeDetailServiceImpl;

/**
 * Servlet implementation class RecipeDetailController
 */
@WebServlet("/kiosk/recipeDetail")
public class RecipeDetailController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private RecipeDetailService service = new RecipeDetailServiceImpl(); 
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RecipeDetailController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			String recipeCode = request.getParameter("recipeCode");
			System.out.println("recipeCode = " + recipeCode);
			
			List<RecipeDetailDto> list = service.RecipeDetailList(recipeCode);
			System.out.println("recipeDetail list size = " + list.size());
	        System.out.println("recipeDetail list = " + list);
			
			response.setContentType("application/json;charset=UTF-8");

            new Gson().toJson(list, response.getWriter());
			
		} catch(Exception e) {
			 throw new ServletException(e);
		}
	}

}
