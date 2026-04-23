package controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dto.BranchDto;
import dto.KioskDto;
import service.BranchService;
import service.BranchServiceImpl;
import service.KioskService;
import service.KioskServiceImpl;

/**
 * Servlet implementation class LoginController
 */
@WebServlet("/kiosk/login")
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String branchCode = request.getParameter("branchCode");

		if (branchCode == null) {
		    try {
		        BranchService branchService = new BranchServiceImpl();
		        List<BranchDto> branchList = branchService.selectBranchList();
		        request.setAttribute("branchList", branchList);
		        request.getRequestDispatcher("/kiosk_jsp/main/login.jsp")
		               .forward(request, response);
		    } catch (Exception e) {
		        e.printStackTrace();
		        request.setAttribute("errorMsg", "지점 목록을 불러오지 못했습니다.");
		        request.getRequestDispatcher("/kiosk_jsp/main/login.jsp")
		               .forward(request, response);
		    }
		} else {
		    try {
		        KioskService kioskService = new KioskServiceImpl();
		        List<KioskDto> kioskList = kioskService.selectKioskList(Integer.parseInt(branchCode));
		        response.setContentType("application/json;charset=UTF-8");
		        response.getWriter().write(new Gson().toJson(kioskList));
		    } catch (Exception e) {
		        e.printStackTrace();
		        response.setContentType("application/json;charset=UTF-8");
		        response.getWriter().write("[]");
		    }
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
