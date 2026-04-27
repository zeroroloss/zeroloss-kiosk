package controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dto.OrderMenuDto;
import dto.OrderOptionDto;
import dto.OrdersDto;
import service.order.OrderService;
import service.order.OrderServiceImpl;

/**
 * Servlet implementation class OrderController
 */
@WebServlet("/kiosk/order")
public class OrderController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public OrderController() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
	    response.sendRedirect(request.getContextPath() + "/kiosk/start");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");

		// 세션이 null이거나 accountid가 없을때 로그인화면으로
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("accountId") == null) {
			response.sendRedirect(request.getContextPath() + "/kiosk/login");
			return;
		}

		try {
			// 세션에서 가져오기
			int branchCode = (Integer) session.getAttribute("branchCode");
			int kioskId = (Integer) session.getAttribute("kiosk_id");
			String orderType = (String) session.getAttribute("orderType");

			// orders DTO 세팅
			OrdersDto ordersDto = new OrdersDto();
			ordersDto.setBranchCode(branchCode);
			ordersDto.setKioskId(kioskId);
			ordersDto.setOrderType(orderType);

			// 메뉴 개수
			int menuCount = Integer.parseInt(request.getParameter("menuCount"));

			List<OrderMenuDto> orderMenuList = new ArrayList<>();
			List<List<OrderOptionDto>> orderOptionList = new ArrayList<>();

			for (int i = 0; i < menuCount; i++) {
				OrderMenuDto orderMenuDto = new OrderMenuDto();
				orderMenuDto.setRecipeCode(request.getParameter("recipeCode" + i));
				orderMenuDto.setQty(Integer.parseInt(request.getParameter("qty" + i)));
				orderMenuDto.setUnit_price(Integer.parseInt(request.getParameter("unit_price" + i)));
				orderMenuDto.setLineTotalAmount(Integer.parseInt(request.getParameter("lineTotalAmount" + i)));
				orderMenuList.add(orderMenuDto);

				// 옵션 리스트
				int optionCount = Integer.parseInt(request.getParameter("optionCount_" + i));
				List<OrderOptionDto> options = new ArrayList<>();
				for (int j = 0; j < optionCount; j++) {
					OrderOptionDto optionDto = new OrderOptionDto();
					optionDto.setMaterialCode(request.getParameter("materialCode" + i + "_" + j));
					options.add(optionDto);
				}
				orderOptionList.add(options);
			}

			// totalAmount 계산
			int totalAmount = orderMenuList.stream().mapToInt(OrderMenuDto::getLineTotalAmount).sum();
			ordersDto.setTotalAmount(totalAmount);

			// DB 저장
			OrderService orderService = new OrderServiceImpl();
			OrdersDto saved = orderService.insertFullOrder(ordersDto, orderMenuList, orderOptionList);

			// 세션에 orderId 저장
			session.setAttribute("orderId", saved.getOrderId());

			// 완료 화면으로
			response.sendRedirect(request.getContextPath() + "/kiosk/complete");

		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("errorMsg", "주문 처리 중 오류가 발생했습니다.");
			request.getRequestDispatcher("/kiosk_jsp/common/error.jsp").forward(request, response);
		}
	}
}