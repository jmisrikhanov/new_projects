let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((num) => num.item)
    .reduce((acc, curr) => (acc += curr), 0);
};

calculation();

let generateCartItem = () => {
  if (basket.length !== 0) {
    console.log("first");
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
        <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItem();
