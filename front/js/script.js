// Get the HTML element with id "items"
const items = document.getElementById("items");

// Fetch data from the specified API endpoint
fetch("http://localhost:3000/api/products")
  // Convert the response to JSON format
  .then((res) => res.json())
  // Process the JSON data and insert it into the HTML element
  .then(
    (res) =>
      (items.innerHTML = Object.values(res)
        .map(
          (e) =>
            `      
      <a href="./product.html?id=${e._id}">
        <article>
        <img src=${e.imageUrl} alt=${e.altTxt}>
        <h3 class="productName">${e.name}</h3>
        <p class="productDescription">${e.description}</p>
        </article>
      </a>`
        )
        // Join the array of HTML strings into a single string
        .join(""))
  );
