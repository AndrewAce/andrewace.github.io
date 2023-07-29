// Floating cart button
const cartButton = document.getElementById("btn-cart");
// Summary cart page
const cartSummary = document.getElementById("cart-summary");
const cartItems = cartSummary.querySelector(".cart-items");
const cartTotalAmount = cartSummary.querySelector("#cart-total-amount");

// Get all the product cards on the page
const productCards = document.querySelectorAll(".col-lg-4.col-md-6.mb-4");

// Create an object to keep track of the cart items
const cart = {};

// Function to update the cart summary page
function updateCartSummary() {
  cartItems.innerHTML = "";
  let totalAmount = 0;

  for (const productId in cart) {
    const productInfo = cart[productId];
    const { image, name, cost, quantity } = productInfo;

    // Create a div element to display the product details
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
          <img src="${image}" alt="${name}" class="cart-item-image">
          <div class="cart-item-details">
            <h5 class="cart-item-name">${name}</h5>
            <p class="cart-item-cost">$${cost.toFixed(2)}</p>
            <div class="cart-item-quantity">
              <button class="cart-item-decrease">-</button>
              <span class="cart-item-quantity-value">${quantity}</span>
              <button class="cart-item-increase">+</button>
            </div>
          </div>
          <button class="cart-item-remove">Remove</button>
        `;
    cartItems.appendChild(cartItem);

    // Calculate the total cost
    totalAmount += cost * quantity;

    // Add event listeners to the buttons for quantity modification and removal
    const decreaseButton = cartItem.querySelector(".cart-item-decrease");
    const increaseButton = cartItem.querySelector(".cart-item-increase");
    const removeButton = cartItem.querySelector(".cart-item-remove");

    decreaseButton.addEventListener("click", () => updateQuantity(productId, -1));
    increaseButton.addEventListener("click", () => updateQuantity(productId, 1));
    removeButton.addEventListener("click", () => removeFromCart(productId));
  }

  cartTotalAmount.textContent = totalAmount.toFixed(2);
}

// Function to update the quantity of a product in the cart
function updateQuantity(productId, change) {
  if (cart[productId]) {
    cart[productId].quantity += change;
    if (cart[productId].quantity <= 0) {
      removeFromCart(productId);
    }
    updateCartSummary();
  }
}

// Function to add a product to the cart
function addToCart(productId, productImage, productName, productCost) {
  if (cart[productId]) {
    cart[productId].quantity++;
  } else {
    cart[productId] = {
      image: productImage,
      name: productName,
      cost: productCost,
      quantity: 1,
    };
  }
  updateCartSummary();
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  delete cart[productId];
  updateCartSummary();
}

// Attach click event listeners to each product card's add-to-cart button
productCards.forEach((productCard) => {
  const addToCartButton = productCard.querySelector(".bi-bag-dash");
  const productImage = productCard.querySelector("img").src;
  const productName = productCard.querySelector(".card-title").textContent;
  const productCost = parseFloat(productCard.querySelector(".cost").textContent.slice(1));
  const productId = productCard.getAttribute("id");
  addToCartButton.addEventListener("click", () => addToCart(productId, productImage, productName, productCost));
});

// Show/hide the cart summary page on cart button click
cartButton.addEventListener("click", () => {
  cartSummary.classList.toggle("show");
});
// Function to redirect to the checkout page
function redirectToCheckout() {
  // Convert the cart object to a JSON string and store it in a local storage
  localStorage.setItem("cartData", JSON.stringify(cart));

  // Redirect to the checkout page
  window.location.href = "checkout.html";
}