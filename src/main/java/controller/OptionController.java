package controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dto.CategoryMaterialDto;
import dto.MaterialDto;
import dto.OptionMaterialStockDto;
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
    	System.out.println("=== OptionController 새 코드 실행됨 ===");
        try {
            request.setCharacterEncoding("utf-8");

            OptionSelectService optionService = new OptionSelectServiceImpl();

            int categoryId = Integer.parseInt(request.getParameter("categoryId"));

            HttpSession session = request.getSession();
            Integer branchCode = (Integer) session.getAttribute("branchCode");

            if (branchCode == null) {
                response.sendRedirect(request.getContextPath() + "/kiosk/test");
                return;
            }

            int multiplier = (categoryId == 2) ? 2 : 1;

            // 1. 옵션 그룹
            List<CategoryMaterialDto> groupList =
                    optionService.selectCategoryMaterialList(categoryId);

            // 2. 재료 리스트
            List<MaterialDto> materialList =
                    optionService.selectMaterialListByCategoryId(categoryId);

            // 3. 옵션 재고 상태 리스트
            List<OptionMaterialStockDto> materialStockList =
                    optionService.selectOptionMaterialStockList(branchCode, multiplier);

            System.out.println("categoryId = " + categoryId);
            System.out.println("branchCode = " + branchCode);
            System.out.println("multiplier = " + multiplier);
            System.out.println("materialGroupList size = " + groupList.size());
            System.out.println("materialList size = " + materialList.size());
            System.out.println("materialStockList size = " + materialStockList.size());

            request.setAttribute("materialGroupList", groupList);
            request.setAttribute("materialList", materialList);
            request.setAttribute("materialStockList", materialStockList);

            request.getRequestDispatcher("/kiosk_jsp/menu/option.jsp")
                   .forward(request, response);

        } catch (Exception e) {
            throw new ServletException(e);
        }
    }
}