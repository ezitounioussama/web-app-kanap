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

const form = document.querySelector(".cart__order__form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  let products = JSON.parse(localStorage.getItem("items")).map(
    (item) => item.id
  );

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const address = formData.get("address");
  const city = formData.get("city");
  const email = formData.get("email");

  // Regular expression to validate email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate the email field
  if (!emailRegex.test(email)) {
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    emailErrorMsg.innerText = "Please enter a valid email address.";
    return;
  }

  const order = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: products,
  };

  await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then(
      (res) =>
        (window.location.href = `confirmation.html?orderId=${res.orderId}`)
    );
});
