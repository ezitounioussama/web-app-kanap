// Get the product ID from the query parameters in the URL
let param = new URLSearchParams(document.location.search);
let id = param.get("id");

// Get the HTML element for the "Add to cart" button
const addToCart = document.getElementById("addToCart");

// Define a function to display the details of a product
const product = (e) => {
  // Get the HTML element for the product image and create a new image element
  const img = document.querySelector(".item__img");
  const productImage = document.createElement("img");

  // Set the attributes for the new image element
  productImage.setAttribute("id", "image");
  productImage.setAttribute("src", e.imageUrl);
  productImage.setAttribute("alt", e.altTxt);

  // Append the new image element to the product image HTML element
  img.appendChild(productImage);

  // Set the inner HTML for the product title, description, and price
  document.getElementById("description").innerHTML = e.description;
  document.getElementById("title").innerHTML = e.name;
  document.getElementById("price").innerHTML = e.price;

  // Populate the available colors for the product
  const colors = document.getElementById("colors");
  e.colors.map((c) => {
    let options = document.createElement("option");
    options.setAttribute("value", c);
    options.innerHTML = c;
    colors.appendChild(options);
  });
};

// Fetch the product details from the API and display them on the page
fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((res) => {
    product(res);
    let title = document.getElementById("title").innerHTML;
    let color = document.getElementById("colors");
    let qty = document.getElementById("quantity");
    let price = document.getElementById("price").textContent;
    let imageSrc = document.getElementById("image").src;
    let imageAlt = document.getElementById("image").alt;
    console.log(imageSrc);

    // Add an event listener to the "Add to cart" button
    addToCart.addEventListener("click", () => {
      let q = Number(qty.value);

      // Check if the selected quantity is valid
      if (q <= 0 || q > 100) {
        alert("Please enter a valid quantity (between 1 and 100)");
        return;
      }

      // Check if a color is selected
      if (color.value === "") {
        alert("Please select a color");
        return;
      }

      // Create a unique ID for the product using its ID and selected color
      addToCart.setAttribute("data-id", id);
      let uniqueID = addToCart.dataset.id;

      // Create a product object with all the necessary details
      let products = {
        id: uniqueID,
        color: color.value,
        title: title,
        imgAlt: imageAlt,
        img: imageSrc,
        price: price,
        qty: q,
      };

      // Get the existing cart items from localStorage, or create an empty array if none exist
      const items = JSON.parse(localStorage.getItem("items")) || [];

      // Check if the product already exists in the cart
      const existingProductIndex = items.findIndex(
        (item) => item.id === products.id
      );

      if (existingProductIndex > -1) {
        // If the product exists, update the quantity
        items[existingProductIndex].qty += products.qty;
        // If the new quantity is 0 or negative, remove the product from the cart
        if (items[existingProductIndex].qty <= 0) {
          items.splice(existingProductIndex, 1);
        }
      } else {
        // If the product doesn't exist, add it to the cart
        items.push(products);
        alert("The item is added to cart");
      }

      // Save the updated cart to localStorage
      localStorage.setItem("items", JSON.stringify(items));
    });
  });
