let shop = document.getElementById("shop");

let shopItemsData = [
  {
    id: "sdfdsf",
    name: "casual shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg",
  },
  {
    id: "sdfdsf32",
    name: "casual shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg",
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let { id, name, img, price, desc } = item;

      let search = basket.find((x) => x.id === id) || [];

      return `
    <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt=${name} />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})"  class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));

  // console.log(basket);
  update(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));

  // console.log(basket);
  update(selectedItem.id);
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((num) => num.item)
    .reduce((acc, curr) => (acc += curr), 0);
};

calculation();
