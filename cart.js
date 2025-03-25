const products_container = document.getElementById("products_container");
const cart_container = document.getElementById("cart_container");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const cart_products_container = document.getElementById("cart_products_container");

const products = [
{name : "Hammer", 		price : 15.00, id : 1},
{name : "Screwdriver",  price : 10.00, id : 2},
{name : "Shovel",  		price : 19.00, id : 3},
{name : "Axe", 		    price : 15.00, id : 4},
{name : "Chainsaw", 	price : 23.00, id : 5},
{name : "Mixer", 		price : 90.00, id : 6}
];

const cart_products = []; // array about the products that are added to the cart

// Building our products display layout
const displayProducts = () => {
  products_container.innerHTML = "";
  
  products.forEach(product => {
    const displayProduct = document.createElement("div");
    displayProduct.classList.add("tools");
    displayProduct.innerHTML = `
      <div>
        <p><strong>Name:</strong> ${product.name}</p>
        <p><strong>Price:</strong> ${product.price.toFixed(2)}$</p>
		<p><button class="btn" data-id="${product.id}">Add to cart</button></p>
      </div>
    `;
    products_container.appendChild(displayProduct);
  });
}; // end of products display layout



// Add to cart functionality

const addToCart = (productId) => {
	const product = products.find((p) => p.id === productId); // "Look inside the products array and find the first product where p.id matches productId. If found, store it in product. If not, store undefined
	
	if (product) {
	const displayCartProduct = document.createElement("div");
    displayCartProduct.classList.add("cart-item");
    displayCartProduct.innerHTML = `
      <div>
        <p><strong>Name:</strong> ${product.name}</p>
        <p><strong>Price:</strong> ${product.price}$</p>
      </div>
    `;
	cart_products.push(product);
    cart_products_container.appendChild(displayCartProduct);
	
	updateCartSummary();
    } 
};	// End of Add to cart


	// Update Cart summary
const updateCartSummary = () => {
	totalNumberOfItems.innerText = cart_products.length;
	const subtotal = cart_products.reduce((acc, item) => acc + item.price, 0); 
	cartSubTotal.innerText = `$${(subtotal / 1.24).toFixed(2)}`;
	cartTaxes.innerText = `$${(subtotal - (subtotal / 1.24)).toFixed(2)}`; // Greek 24% tax
    cartTotal.innerText = `$${subtotal.toFixed(2)}`;
	}; //end of Update Cart


// Clear Cart 
const clearCart = () => {
  cart_products.length = 0; 
  cart_products_container.innerHTML = ""; // Clear cart items
  totalNumberOfItems.innerText = 0;
  cartSubTotal.innerText = "$0.00";
  cartTaxes.innerText = "$0.00";
  cartTotal.innerText = "$0.00";
}; // End of Clear Cart

// Here i used the Event Delegation techinque, addEventListener on a parent and detect clicks on buttons inside it.
products_container.addEventListener("click", (event) => {
    const addToCartBtn = event.target.closest('.btn'); // Find the closest element that matches the class btn
    if (addToCartBtn) {
        const productId = parseInt(addToCartBtn.getAttribute('data-id'));
        addToCart(productId);
    }
});

clearCartBtn.addEventListener("click", clearCart);
displayProducts(); 




