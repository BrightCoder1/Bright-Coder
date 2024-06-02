// Fetch product data from JSON file
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    displayProducts(products);
  })
  .catch(error => console.error('Error fetching products:', error));

// let cart = [];

// Function to display products
function displayProducts(products) {
  const productsContainer = document.getElementById('products');
  
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    
    productDiv.innerHTML = `
      <h2 class= "productheading">${product.name}</h2>
      <img src="${product.image}" alt="${product.name}" width="150">
      <p class="price-course">Price: $${product.price.toFixed(2)}</p>
      <a class="productlink" href="${product.link}">Go To Course</a>
    `;
    
    productsContainer.appendChild(productDiv);
  });
}




// Responsive
let open = document.getElementById("open");
// let close = document.getElementById("close");
let nav_ul = document.querySelector(".nav-ul");



open.addEventListener('click', function (){
  nav_ul.classList.toggle('active-bar');
})