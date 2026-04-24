package controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dto.CategoryMaterialDto;
import dto.MaterialDto;
import service.menu.OptionSelectService;
import service.menu.OptionSelectServiceImpl;

/**
 * Servlet implementation class OptionController
 */
@WebServlet("/kiosk/option")
public class OptionController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OptionController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
        	OptionSelectService optionService = new OptionSelectServiceImpl();
            int categoryId = Integer.parseInt(request.getParameter("categoryId"));

            // 1. 옵션 그룹
            List<CategoryMaterialDto> groupList =
                optionService.selectCategoryMaterialList(categoryId);

            // 2. 재료 리스트
            List<MaterialDto> materialList =
                optionService.selectMaterialListByCategoryId(categoryId);
            
            System.out.println("categoryId = " + categoryId);
            System.out.println("materialGroupList size = " + groupList.size());
            System.out.println("materialList size = " + materialList.size());

            // 3. request에 담기
            request.setAttribute("materialGroupList", groupList);
            request.setAttribute("materialList", materialList);

            // 4. JSP 이동
            request.getRequestDispatcher("/kiosk_jsp/menu/option.jsp").forward(request, response);

        } catch (Exception e) {
            throw new ServletException(e);
        }
    }

}
