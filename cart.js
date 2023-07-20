// Cart array to store the added products
var cart = [];

// Function to add a product to the cart
function addToCart(productId, productName, price, image) {
  // Check if the product is already in the cart
  var existingProduct = cart.find(function(item) {
    return item.productId === productId;
  });

  if (existingProduct) {
    // If the product is already in the cart, increment the quantity
    existingProduct.quantity++;
  } else {
    // If the product is not in the cart, add it with quantity 1
    var product = {
      productId: productId,
      productName: productName,
      price: price,
      quantity: 1,
      image: image
    };
    cart.push(product);
  }

  // Save the cart to localStorage
  saveCartToLocalStorage();

  // Redirect the user to the cart.html page
  window.location.href = 'cart.html';
} 

  // Display the updated cart
  displayCart();


// Function to remove a product from the cart
function removeItem(productId) {
  // Find the index of the product in the cart
  var index = cart.findIndex(function(item) {
    return item.productId === productId;
  });

  if (index !== -1) {
    // Remove the product from the cart
    cart.splice(index, 1);

    // Save the cart to localStorage
    saveCartToLocalStorage();

    // Display the updated cart
    displayCart();
  }
}

// Function to update the quantity of a product in the cart
function updateQuantity(productId, quantity) {
  // Find the product in the cart
  var product = cart.find(function(item) {
    return item.productId === productId;
  });

  if (product) {
    // Update the quantity
    product.quantity = parseInt(quantity);

    // Save the cart to localStorage
    saveCartToLocalStorage();

    // Display the updated cart
    displayCart();
  }
}

// Function to compute the subtotal including delivery fee
function computeSubtotal() {
  var subtotal = 0;

  // Calculate the subtotal of all products in the cart
  for (var i = 0; i < cart.length; i++) {
    var product = cart[i];
    subtotal += product.price * product.quantity;
  }

  // Add the delivery fee
  subtotal += 100;

  return subtotal;
}

// Function to save the cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to retrieve the cart from localStorage
function retrieveCartFromLocalStorage() {
  var storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}


// Function to display the cart
function displayCart() {
  // Retrieve the cart from localStorage
  retrieveCartFromLocalStorage();

  var cartTable = document.getElementById("cartTable");
  var subtotalElement = document.getElementById("subtotal");

  // Clear the cart table
  cartTable.innerHTML = "";

  // Create a row for the category titles
  var categoryRow = document.createElement("tr");

  // Create cells for the category titles
  var productTitleCell = document.createElement("th");
  productTitleCell.innerHTML = `
    <div class="header-cell">
      <span class="header-title">Product</span>
      <span class="header-label"></span>
    </div>
  `;

  var quantityTitleCell = document.createElement("th");
  quantityTitleCell.innerHTML = `
    <div class="header-cell">
      <span class="header-title">Quantity</span>
      <span class="header-label"></span>
    </div>
  `;

  var priceTitleCell = document.createElement("th");
  priceTitleCell.innerHTML = `
    <div class="header-cell">
      <span class="header-title">Price</span>
      <span class="header-label"></span>
    </div>
  `;

  var subtotalTitleCell = document.createElement("th");
  subtotalTitleCell.innerHTML = `
    <div class="header-cell">
      <span class="header-title">Subtotal</span>
      <span class="header-label"></span>
    </div>
  `;

  var actionTitleCell = document.createElement("th");
  actionTitleCell.innerHTML = `
    <div class="header-cell">
      <span class="header-title">Action</span>
      <span class="header-label"></span>
    </div>
  `;

  // Add the category title cells to the category row
  categoryRow.appendChild(productTitleCell);
  categoryRow.appendChild(quantityTitleCell);
  categoryRow.appendChild(priceTitleCell);
  categoryRow.appendChild(subtotalTitleCell);
  categoryRow.appendChild(actionTitleCell);

  // Add the category row to the cart table
  cartTable.appendChild(categoryRow);

  var subtotal = 0;

  // Display the cart items
  for (var i = 0; i < cart.length; i++) {
    var product = cart[i];

    // Create a row for the product in the cart table
    var row = document.createElement("tr");

    // Create cells for the product details
    var nameCell = document.createElement("td");
    nameCell.innerHTML = `
      <img src="${product.image}" alt="${product.productName}" width="50px">
      <h4>${product.productName}</h4>
    `;

    var quantityCell = document.createElement("td");
    var quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = product.quantity;
    quantityInput.addEventListener("change", function() {
      updateQuantity(product.productId, this.value);
    });
    quantityCell.appendChild(quantityInput);

    var priceCell = document.createElement("td");
    priceCell.textContent = `₱${product.price.toFixed(2)}`;

    var subtotalCell = document.createElement("td");
    var productSubtotal = product.price * product.quantity;
    subtotalCell.textContent = `₱${productSubtotal.toFixed(2)}`;

    subtotal += productSubtotal;

    var removeCell = document.createElement("td");
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
      removeItem(product.productId);
    });
    removeCell.appendChild(removeButton);

    // Add the cells to the row
    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(subtotalCell);
    row.appendChild(removeCell);

    // Add the row to the cart table
    cartTable.appendChild(row);
  }

  // Display the subtotal
  subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
}




// Function to handle the order/purchase button click
function placeOrder() {
  // Here you can implement the logic for placing the order
  // You can access the cart array and perform further processing or send the data to a server

  // Clear the cart
  cart = [];

  // Save the empty cart to localStorage
  saveCartToLocalStorage();

  // Display the empty cart
  displayCart();
}

// Retrieve the cart from localStorage and display it initially
retrieveCartFromLocalStorage();
displayCart();