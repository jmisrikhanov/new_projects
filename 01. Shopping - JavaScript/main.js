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
    id: "sdfdsf",
    name: "casual shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg",
  },
];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let { id, name, img, price, desc } = item;
      return `
    <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt=${name} />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$${price}</h2>
            <div class="buttons">
              <i class="bi bi-dash-lg"></i>
              <div class="quantity">0</div>
              <i class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();
