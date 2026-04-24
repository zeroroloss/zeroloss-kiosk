package controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import dto.AccountDto;
import dto.BranchDto;
import dto.KioskDto;
import service.main.AccountService;
import service.main.AccountServiceImpl;
import service.main.BranchService;
import service.main.BranchServiceImpl;
import service.main.KioskService;
import service.main.KioskServiceImpl;

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

		if (branchCode == null || branchCode.isBlank()) {
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
		request.setCharacterEncoding("UTF-8");

		String loginId = request.getParameter("loginId");
		String password = request.getParameter("password");
		String kioskParam = request.getParameter("kiosk_id");

		try {
		    if (kioskParam == null || kioskParam.isBlank()) {
		        request.setAttribute("errorMsg", "키오스크를 선택해주세요.");
		        BranchService branchService = new BranchServiceImpl();
		        request.setAttribute("branchList", branchService.selectBranchList());
		        request.getRequestDispatcher("/kiosk_jsp/main/login.jsp")
		               .forward(request, response);
		        return;
		    }

		    int kioskId = Integer.parseInt(kioskParam);

		    AccountService accountService = new AccountServiceImpl();
		    AccountDto account = accountService.login(loginId, password, kioskId);

		    if (account == null) {
		        request.setAttribute("errorMsg", "아이디, 비밀번호 또는 키오스크를 확인해주세요.");
		        BranchService branchService = new BranchServiceImpl();
		        request.setAttribute("branchList", branchService.selectBranchList());
		        request.getRequestDispatcher("/kiosk_jsp/main/login.jsp")
		               .forward(request, response);
		        return;
		    }

		    // 로그인 성공 → 세션 저장
		    HttpSession session = request.getSession();
		    session.setAttribute("accountId", account.getAccount_id());
		    session.setAttribute("branchCode", account.getBranch_code());
		    session.setAttribute("branchName", account.getBranchName());
		    session.setAttribute("kiosk_id", account.getKiosk_id());
		    session.setAttribute("empName", account.getName());
		   
		    response.sendRedirect(request.getContextPath() + "/kiosk/start");

		} catch (Exception e) {
		    e.printStackTrace();
		    request.setAttribute("errorMsg", "오류가 발생했습니다. 다시 시도해주세요.");
		    try {
		        BranchService branchService = new BranchServiceImpl();
		        request.setAttribute("branchList", branchService.selectBranchList());
		    } catch (Exception ex) {
		        ex.printStackTrace();
		    }
		    request.getRequestDispatcher("/kiosk_jsp/main/login.jsp")
		           .forward(request, response);
		}
	}
}

