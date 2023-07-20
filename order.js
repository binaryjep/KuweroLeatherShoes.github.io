document.getElementById("orderForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the form values
  var customerName = document.getElementById("customerName").value;
  var customerAddress = document.getElementById("customerAddress").value;
  var contactNumber = document.getElementById("contactNumber").value;
  var totalPurchase = document.getElementById("subtotal").innerText; // Assuming the total is displayed in an element with id "subtotal"
  var cardNumber = encryptData(document.getElementById("cardNumber").value);
  var expirationDate = document.getElementById("expirationDate").value;
  var cvv = encryptData(document.getElementById("cvv").value);
  var bankName = document.getElementById("bankName").value; // Assuming you have added the "id" attribute to the bank select element

  // Perform any necessary validation or processing here
  // You can validate the form inputs, send the data to a server, or integrate with a payment service provider

  // Validate card number (decrypted for display)
  if (decryptData(cardNumber).length !== 16) {
    alert("Please enter a valid 16-digit card number.");
    return;
  }

  // Validate CVV (decrypted for display)
  if (decryptData(cvv).length !== 3) {
    alert("Please enter a valid 3-digit CVV.");
    return;
  }

  // Prompt for verification code
  var verificationCode = prompt("Verification code has been sent to your SMS. Please enter the code to proceed:");

  // Simulated verification: Accept any input as valid
  if (verificationCode) {
    // Create the confirmation message
    var message = "Thank you for purchasing from Kuwero Leather Shoes! You can expect your order in 3-7 days! 😄\n\n";
    message += "Bank: " + bankName + "\n";
    message += "Total Purchase: " + totalPurchase + "\n";
    message += "Customer Name: " + customerName + "\n";
    message += "Customer Address: " + customerAddress + "\n";
    message += "Contact Number: " + contactNumber + "\n";
    message += "Card Number: " + decryptData(cardNumber) + "\n";
    message += "Expiration Date: " + expirationDate + "\n";
    message += "CVV: " + decryptData(cvv);

    // Show the alert message
    alert(message);

    // Reset the form
    document.getElementById("orderForm").reset();

    // Clear the cart
    cart = [];
    saveCartToLocalStorage();
    displayCart();

    // Navigate to ESCUERRO.html
    window.location.href = "index.html";
  } else {
    alert("Verification code is required. Please try again.");
  }
});

// Caesar Cipher encryption function
function encryptData(data) {
  var encryptedData = "";
  var key = 3; // Shift value for Caesar Cipher (can be changed)
  for (var i = 0; i < data.length; i++) {
    var charCode = data.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      encryptedData += String.fromCharCode(((charCode - 65 + key) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      encryptedData += String.fromCharCode(((charCode - 97 + key) % 26) + 97);
    } else {
      encryptedData += data.charAt(i);
    }
  }
  return encryptedData;
}

// Caesar Cipher decryption function (for display purposes only)
function decryptData(data) {
  var decryptedData = "";
  var key = 3; // Shift value for Caesar Cipher (must be the same as encryption key)
  for (var i = 0; i < data.length; i++) {
    var charCode = data.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      decryptedData += String.fromCharCode(((charCode - 65 - key + 26) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      decryptedData += String.fromCharCode(((charCode - 97 - key + 26) % 26) + 97);
    } else {
      decryptedData += data.charAt(i);
    }
  }
  return decryptedData;
}
