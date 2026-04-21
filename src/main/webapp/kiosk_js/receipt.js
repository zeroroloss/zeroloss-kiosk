const RECEIPT_PRINT_KEY = 'receiptPrint';

window.goNext = function(contextPath, isPrint) {

  sessionStorage.setItem(RECEIPT_PRINT_KEY, isPrint ? 'Y' : 'N');

  location.href = contextPath + '/kiosk_jsp/complete/order_complete.jsp';
};