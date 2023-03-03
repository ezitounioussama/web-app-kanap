const section = document.getElementById("cart__items");
let total = document.getElementById("totalPrice");
let totalQuantity = document.getElementById("totalQuantity");
let sumTotal = 0;
let items = JSON.parse(localStorage.getItem("items"));

const updateTotalPrice = () => {
  sumTotal = 0;
  items.forEach((item) => {
    const quantity = parseInt(document.getElementById(item.id).value);
    item.qty = quantity;
    sumTotal += item.price * quantity;
  });
  total.innerHTML = sumTotal.toFixed(2);
};

const Sum = (e) => {
  sumTotal += e.price * e.qty;
  return sumTotal;
};

const deleteProduct = (event) => {
  const itemId = event.target.closest(".cart__item").dataset.id;
  items = items.filter((item) => item.id !== itemId);
  localStorage.setItem("items", JSON.stringify(items));
  event.target.closest(".cart__item").remove();
  totalQuantity.innerHTML = items.length;
  Swal.fire("Good job!", "Delete successfuly", "success");
  updateTotalPrice();
};

section.innerHTML = items
  .map((e) => {
    total.innerHTML = Sum(e);

    return `<article class="cart__item" data-id="${e.id}">
    <div class="cart__item__img">
      <img src="${e.img}" alt="${e.imgAlt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${e.title}</h2>
        <p>${e.color}</p>
        <p>${e.price} $</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" id=${e.id} class="itemQuantity" name="itemQuantity" min="1" max="100" value="${e.qty}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`;
  })
  .join("");

// Listen for 'change' event on all the quantity inputs
const quantityInputs = document.querySelectorAll(".itemQuantity");
quantityInputs.forEach((input) => {
  input.addEventListener("change", updateTotalPrice);
});

totalQuantity.innerHTML = items.length;
total.innerHTML = sumTotal.toFixed(2);

// Add event listener to all delete buttons
const deleteItem = document.querySelectorAll(".deleteItem");
deleteItem.forEach((button) => {
  button.addEventListener("click", deleteProduct);
});

// ! Getting the data from the form

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const order = document.getElementById("order");
let arr = [];
order.addEventListener("click", () => {});
