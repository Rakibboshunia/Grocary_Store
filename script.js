document.getElementById("paymentForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const status = document.getElementById("status");
  
    // Basic validation
    if (!name || !cardNumber || !expiry || !cvv) {
      status.textContent = "Please fill in all fields.";
      status.style.color = "red";
      return;
    }
  
    if (!/^\d{16}$/.test(cardNumber)) {
      status.textContent = "Card number must be 16 digits.";
      status.style.color = "red";
      return;
    }
  
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      status.textContent = "Expiry date must be in MM/YY format.";
      status.style.color = "red";
      return;
    }
  
    if (!/^\d{3,4}$/.test(cvv)) {
      status.textContent = "CVV must be 3 or 4 digits.";
      status.style.color = "red";
      return;
    }
  
    status.textContent = "Payment processed successfully!";
    status.style.color = "#00e676";
  
    // Optionally reset the form
    // e.target.reset();
  });
  