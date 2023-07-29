function validateForm() {
    const firstName = document.getElementById('InputName1').value;
    const lastName = document.getElementById('InputName2').value;
    const email = document.getElementById('InputEmail1').value;
    const cardNumber = document.getElementById('InputCardNum').value;

    // Simple validation for required fields
    if (firstName === '' || lastName === '' || email === '' || cardNumber === '') {
      alert('Please fill in all required fields.');
      return false;
    }

    // You can add more validation here for specific patterns like email and credit card number

    return true;
  }

  // Function to remove a product from the cart and update the checkout page
  function removeProduct(productId) {
    const cartData = localStorage.getItem("cartData");

    if (cartData) {
      const cart = JSON.parse(cartData);

      // Remove the product from the cart
      delete cart[productId];

      // Update the cart data in the local storage
      localStorage.setItem("cartData", JSON.stringify(cart));

      // Refresh the page to update the cart summary
      location.reload();
    }
  }