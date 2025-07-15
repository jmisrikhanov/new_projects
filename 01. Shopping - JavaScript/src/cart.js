let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((num) => num.item)
    .reduce((acc, curr) => (acc += curr), 0);
};

calculation();
