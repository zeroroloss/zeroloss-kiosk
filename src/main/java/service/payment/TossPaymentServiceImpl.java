package service.payment;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class TossPaymentServiceImpl implements TossPaymentService {
	
	private static final String SECRET_KEY = "";

	@Override
	public String confirmPayment(String paymentKey, String orderId, int amount) throws Exception {
		String authorization = "Basic " + Base64.getEncoder().encodeToString((SECRET_KEY + ":").getBytes("UTF-8"));

		URL url = new URL("https://api.tosspayments.com/v1/payments/confirm");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Authorization", authorization);
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setDoOutput(true);

		// 요청 바디
		JSONObject body = new JSONObject();
		body.put("paymentKey", paymentKey);
		body.put("orderId", orderId);
		body.put("amount", amount);

		try (OutputStream os = conn.getOutputStream()) {
			os.write(body.toJSONString().getBytes("UTF-8"));
		}

		int responseCode = conn.getResponseCode();

		InputStream is = responseCode == 200 ? conn.getInputStream() : conn.getErrorStream();

		StringBuilder sb = new StringBuilder();
		try (BufferedReader br = new BufferedReader(new InputStreamReader(is, "UTF-8"))) {
			String line;
			while ((line = br.readLine()) != null)
				sb.append(line);
		}

		JSONParser parser = new JSONParser();
		// 실패 시 예외
		if (responseCode != 200) {
			JSONObject error = (JSONObject) parser.parse(sb.toString());
			throw new Exception("토스 결제 승인 실패: " + error.get("message"));
		}
		JSONObject result = (JSONObject) parser.parse(sb.toString());
        JSONObject receipt = (JSONObject) result.get("receipt");
        return receipt != null ? (String) receipt.get("url") : null;
	}

}
