package controller;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dto.MaterialStockDto;
import dto.RecipeDto;
import dto.RecipeMaterialDto;
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
                response.sendRedirect(request.getContextPath() + "/kiosk/start");
                return;
            }

            MenuSelectService service = new MenuSelectServiceImpl();

            List<Integer> unavailableRecipeCodes = service.selectUnavailableRecipeCodes(branchCode);
			List<RecipeMaterialDto> recipeMaterialList = service.selectRecipeMaterialList();
			List<MaterialStockDto> stockList = service.selectCurrentStockList(branchCode);
			
			List<RecipeDto> recipeList = service.RecipeList();
			String realPath = request.getServletContext().getRealPath("/");
			
			for (RecipeDto recipe : recipeList) {
			    if (recipe.getImgUrl() != null && !recipe.getImgUrl().isEmpty()) {
			        try {
			            File imgFile = new File(realPath + recipe.getImgUrl());
			            if (imgFile.exists()) {
			            	BufferedImage original = ImageIO.read(imgFile);
			            	if (original.getWidth() == original.getHeight()) continue;

			            	int targetSize = 400;
			            	BufferedImage resized = new BufferedImage(targetSize, targetSize, BufferedImage.TYPE_INT_ARGB);
			            	Graphics2D g = resized.createGraphics();

			            	
			            	double ratio = Math.min((double) targetSize / original.getWidth(), (double) targetSize / original.getHeight());
			            	int newWidth  = (int) (original.getWidth()  * ratio);
			            	int newHeight = (int) (original.getHeight() * ratio);
			            	int x = (targetSize - newWidth)  / 2;
			            	int y = (targetSize - newHeight) / 2;

			            	g.drawImage(original, x, y, newWidth, newHeight, null);
			            	g.dispose();
			            	ImageIO.write(resized, "png", imgFile);
			            }
			        } catch (Exception e) {
			            System.out.println("이미지 리사이징 실패: " + recipe.getImgUrl());
			        }
			    }
			}

			Map<Integer, List<RecipeMaterialDto>> recipeMaterialMap = new HashMap<>();

			for (RecipeMaterialDto dto : recipeMaterialList) {
				int recipeCode = dto.getRecipeCode();

				if (!recipeMaterialMap.containsKey(recipeCode)) {
					recipeMaterialMap.put(recipeCode, new ArrayList<>());
				}

				recipeMaterialMap.get(recipeCode).add(dto);
			}

//            request.setAttribute("recipeList", service.RecipeList());
            request.setAttribute("recipeList", recipeList);
            request.setAttribute("mainCategoryList", service.MainList());
            request.setAttribute("subCategoryList", service.SubList());
            request.setAttribute("unavailableRecipeCodes", unavailableRecipeCodes);
            request.setAttribute("recipeMaterialMap", recipeMaterialMap);
			request.setAttribute("stockList", stockList);
			
            System.out.println("branchCode = " + branchCode);
            System.out.println("품절 메뉴 코드 = " + unavailableRecipeCodes);
            System.out.println("recipeMaterialMap = " + recipeMaterialMap);
			System.out.println("stockList = " + stockList);

            request.getRequestDispatcher("/kiosk_jsp/menu/menu.jsp")
                   .forward(request, response);

        } catch (Exception e) {
            e.printStackTrace();
            throw new ServletException(e);
        }
    }

}
