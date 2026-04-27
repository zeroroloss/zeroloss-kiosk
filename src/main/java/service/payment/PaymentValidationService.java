package service.payment;

public interface PaymentValidationService {
	int calculateServerTotal(String cartJson) throws Exception;
}
