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
  localStorage.setItem("items", JSON.stringify(items));
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

// Get the form element
const form = document.querySelector(".cart__order__form");

// Add event listener to the submit button
form.addEventListener("submit", (e) => {
  // Prevent the default form submission
  e.preventDefault();

  // Create a new FormData object to collect the form data
  const formData = new FormData(form);

  // Generate a random order number
  const orderNumber = Math.floor(Math.random() * 1000000000);

  // Store the form data and order number in local storage with the items in the cart
  const order = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    address: formData.get("address"),
    city: formData.get("city"),
    email: formData.get("email"),
    orderNumber: orderNumber,
    items: JSON.parse(localStorage.getItem("items")),
  };
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Redirect to the confirmation page with the order number in the URL query parameter
  window.location.href = `confirmation.html?orderId=${orderNumber}`;
});
