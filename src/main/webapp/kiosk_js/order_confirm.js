const CART_KEY = "cart";

const orderList = document.getElementById("orderList");
const emptyBox = document.getElementById("emptyBox");
const totalPrice = document.getElementById("totalPrice");

function createEmptyCart() {
   return {
      orderId: null,
      orderType: sessionStorage.getItem("orderType") || null,
      totalAmount: 0,
      items: []
   };
}

function getCart() {
   try {
      const cart = JSON.parse(sessionStorage.getItem(CART_KEY) || "null");

      if (!cart) return crea...