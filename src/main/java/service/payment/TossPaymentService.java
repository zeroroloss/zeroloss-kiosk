package service.payment;

public interface TossPaymentService {
	String confirmPayment(String paymentKey, String orderId, int amount) throws Exception;
}
