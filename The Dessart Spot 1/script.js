const priceList = {
  "Dark Chocolate Bowl": { Small: 79, Big: 139 },
  "Classic Chocolate Bowl": { Small: 79, Big: 139 },
  "White Chocolate Bowl": { Small: 79, Big: 139 },
  "Triple Chocolate Bowl": { Small: 99, Big: 149 },
  "Oreo Chocolate Bowl": { Small: 99, Big: 149 },
  "Kitkat Chocolate Bowl": { Small: 99, Big: 149 },
  "Red velvet with Dark chocolate Bowl": { Small: 99, Big: 149 },
  "Red velvet with White chocolate Bowl": { Small: 99, Big: 149 },
  "Biscoff Chocolate Bowl": { Small: 119, Big: 159 },
  "Strawberry Chocolate Bowl": { Small: 129, Big: 179 }
};

document.addEventListener("DOMContentLoaded", () => {

  const menu = document.getElementById("menu");
  const size = document.getElementById("size");
  const amount = document.getElementById("amount");
  const form = document.getElementById("orderForm");

  if (menu && size && amount) {

    function updatePrice() {
      const selectedMenu = menu.value.trim();
      const selectedSize = size.value.trim();

      if (
        priceList[selectedMenu] &&
        priceList[selectedMenu][selectedSize]
      ) {
        amount.value = priceList[selectedMenu][selectedSize];
      } else {
        amount.value = "";
      }
    }

    menu.addEventListener("change", updatePrice);
    size.addEventListener("change", updatePrice);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.setItem("amount", amount.value);
      window.location.href = "payment.html";
    });
  }

  /* PAYMENT PAGE */
  const amt = localStorage.getItem("amount");

  if (amt) {
    ["gpay", "phonepe", "paytm"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.href = `upi://pay?pa=919730607299@upi&pn=Dessert%20Spot&am=${amt}&cu=INR`;
      }
    });
  }

});
