document.addEventListener("DOMContentLoaded", () => {

  // 🔒 Block direct access (must come from customer page)
  if (!localStorage.getItem("customerName")) {
    window.location.href = "customer.html";
    return;
  }

  const items = document.querySelectorAll(".item");
  const totalEl = document.getElementById("total");
  const confirmBtn = document.getElementById("confirmBtn");
  const radios = document.querySelectorAll('input[name="orderType"]');

  const PARCEL_PRICE = 5;

  // 🧮 Calculate Total
  function calculateTotal() {
    let total = 0;
    let hasItem = false;

    items.forEach(item => {
      const size = item.querySelector(".size").value;
      const qty = Number(item.querySelector(".qty").value);

      if (size && qty > 0) {
        hasItem = true;

        const price =
          size === "Small"
            ? Number(item.dataset.small)
            : Number(item.dataset.big);

        total += price * qty;
      }
    });

    const parcelSelected = document.querySelector(
      'input[name="orderType"][value="Parcel"]'
    ).checked;

    if (parcelSelected && hasItem) {
      total += PARCEL_PRICE;
    }

    totalEl.textContent = total;
  }

  // Event Listeners
  items.forEach(item => {
    item.querySelector(".size").addEventListener("change", calculateTotal);
    item.querySelector(".qty").addEventListener("input", calculateTotal);
  });

  radios.forEach(r => r.addEventListener("change", calculateTotal));

  // 🎫 Confirm Order
  confirmBtn.addEventListener("click", () => {

    let total = Number(totalEl.textContent);

    if (total <= 0) {
      alert("Please select at least one bowl");
      return;
    }

    // 🎡 If eligible for spin
    if (total >= 200) {

  if (!localStorage.getItem("spinDone")) {
    localStorage.setItem("preSpinTotal", total);
    window.location.href = "spin.html";
    return;
  }
    }

    // ✅ If returning from spin page
    if (localStorage.getItem("finalAmount")) {
      total = Number(localStorage.getItem("finalAmount"));
    }

    // 🔢 Generate Token
    let lastToken = Number(localStorage.getItem("lastToken") || 100);

let token = lastToken + 1;

if(token > 300){
  token = 101; // reset next day or after 300
}

localStorage.setItem("lastToken", token);

    // Save order details
    const orderType = document.querySelector(
      'input[name="orderType"]:checked'
    ).value;

    const name = localStorage.getItem("customerName");
    const phone = localStorage.getItem("customerPhone");

    localStorage.setItem("orderToken", token);
    localStorage.setItem("orderTotal", total);
    localStorage.setItem("orderType", orderType);

    // 📲 Send WhatsApp to Shop
    sendOrderToWhatsApp(token, name, phone, orderType, total);

    // Clear spin flags
    localStorage.removeItem("spinDone");
localStorage.removeItem("finalAmount");
localStorage.removeItem("preSpinTotal");
localStorage.removeItem("spinReward");

    // Redirect to success page
    window.location.href = "success.html";
  });

});


// 📲 WhatsApp Sender Function
function sendOrderToWhatsApp(token, name, phone, type, total) {

  const shopNumber = "919XXXXXXXXX"; // ← Replace with your real number

  const message =
`🍫 NEW ORDER RECEIVED 🍫
Token No: ${token}
Name: ${name}
Phone: ${phone}
Order Type: ${type}
Total: ₹${total}`;

  const url = `https://wa.me/${shopNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
