// Get the order number from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId");

// Retrieve the order from local storage based on the order number
// const orders = JSON.parse(localStorage.getItem("orders"));
// const order = orders.find((o) => o.orderNumber === parseInt(orderId));

// Display the order confirmation message with the order number and the items
const confirmationMessage = `Commande validée !<br />Votre numéro de commande est : ${orderId}`;
document.querySelector("#orderId").innerHTML = confirmationMessage;
