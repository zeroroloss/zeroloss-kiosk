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
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		OrderService orderservice = new OrderServiceImpl();
		
		String paymentKey = request.getParameter("paymentKey");
		String orderId = request.getParameter("orderId");
		int amount = Integer.parseInt(request.getParameter("amount"));
		
        // 결제 성공
        if ("/success".equals(pathInfo)) {
            try {
                // 토스 결제 승인 API 호출
            	TossPaymentService tossPaymentService = new TossPaymentServiceImpl();
            	String receiptUrl = tossPaymentService.confirmPayment(paymentKey, orderId, amount);

            	request.setAttribute("paymentKey", paymentKey);
            	request.setAttribute("paidOrderId", orderId);
            	request.setAttribute("paidAmount", amount);
            	request.setAttribute("receiptUrl", receiptUrl);
            	
            	OrdersDto ordersDto = new OrdersDto();
            	ordersDto.setOrderId(orderId);
            	ordersDto.setStatus("PAID");
            	orderservice.updateOrders(ordersDto);
            	System.out.println(ordersDto);

                // 완료 화면으로
                request.getRequestDispatcher("/kiosk_jsp/complete/order_complete.jsp")
                       .forward(request, response);
                System.out.println(receiptUrl);

            } catch (Exception e) {
                e.printStackTrace();
                request.setAttribute("errorMsg", "결제 승인 중 오류가 발생했습니다.");
                request.getRequestDispatcher("/kiosk_jsp/common/error.jsp")
                       .forward(request, response);
            }
            return;
        }

        // 결제 실패
        if ("/fail".equals(pathInfo)) {
        	OrdersDto failDto = new OrdersDto();
            failDto.setOrderId(orderId);
            failDto.setStatus("FAIL");
            String errorMessage = request.getParameter("message");
            request.setAttribute("errorMessage", errorMessage);
            request.getRequestDispatcher("/kiosk_jsp/menu/order_confirm.jsp")
                   .forward(request, response);
        }
    }

}
