package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dto.OrdersDto;
import service.order.OrderService;
import service.order.OrderServiceImpl;
import service.order.StockService;
import service.order.StockServiceImpl;
import service.payment.TossPaymentService;
import service.payment.TossPaymentServiceImpl;

/**
 * Servlet implementation class PaymentController
 */
@WebServlet("/kiosk/payment/*")
public class PaymentController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public PaymentController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		OrderService orderservice = new OrderServiceImpl();

		String paymentKey = request.getParameter("paymentKey");
		String orderId = request.getParameter("orderId");

		// 결제 성공
		if ("/success".equals(pathInfo)) {
			int amount = Integer.parseInt(request.getParameter("amount"));
			try {
				// 토스 결제 승인 API 호출
				TossPaymentService tossPaymentService = new TossPaymentServiceImpl();
				String receiptUrl = tossPaymentService.confirmPayment(paymentKey, orderId, amount);

				request.setAttribute("paymentKey", paymentKey);
				request.setAttribute("paidOrderId", orderId);
				request.setAttribute("paidAmount", amount);
				request.setAttribute("receiptUrl", receiptUrl);

				// 주문 상태 업데이트
				OrdersDto ordersDto = new OrdersDto();
				ordersDto.setOrderId(orderId);
				ordersDto.setStatus("PAID");
				orderservice.updateOrders(ordersDto);

				// 주문 완료시 재고 차감
				StockService stockService = new StockServiceImpl();
				stockService.deductStockByOrderId(orderId);

				// 구매자 번호
				String orderNum = request.getParameter("orderNum");
				request.setAttribute("orderNum", orderNum);

				// 완료 화면으로
				request.getRequestDispatcher("/kiosk_jsp/complete/order_complete.jsp").forward(request, response);
				System.out.println(receiptUrl);

			} catch (Exception e) {
				e.printStackTrace();
				request.setAttribute("err", "결제 승인 중 오류가 발생했습니다.");
				request.getRequestDispatcher("/kiosk_jsp/common/error.jsp").forward(request, response);
			}
			return;
		}
		// 결제 실패
		if ("/fail".equals(pathInfo)) {
			try {
				OrdersDto failDto = new OrdersDto();
				failDto.setOrderId(orderId);
				failDto.setStatus("FAIL");
				orderservice.updateOrders(failDto);
			} catch (Exception e) {
				String errorMessage = request.getParameter("message");
				request.setAttribute("errorMessage", errorMessage);
				request.getRequestDispatcher("/kiosk_jsp/menu/order_confirm.jsp").forward(request, response);
			}
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
	    String pathInfo = request.getPathInfo();
	    OrderService orderService = new OrderServiceImpl();

	    if ("/cancel".equals(pathInfo)) {
	        String orderId = request.getParameter("orderId");
	        try {
	            OrdersDto cancelDto = new OrdersDto();
	            cancelDto.setOrderId(orderId);
	            cancelDto.setStatus("CANCEL");
	            orderService.updateOrders(cancelDto);
	        } catch (Exception e) {
	            e.printStackTrace();
	            String errorMessage = request.getParameter("message");
				request.setAttribute("errorMessage", errorMessage);
				request.getRequestDispatcher("/kiosk_jsp/menu/order_confirm.jsp").forward(request, response);
	        }
	    }
	}

}
