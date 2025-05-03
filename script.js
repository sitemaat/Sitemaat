const products = [
  { 
    id: 1, 
    name: 'Website Pakket Basic', 
    price: 499.99, 
    image: 'basicwebsite.jpg', 
    description: 'Perfect voor kleine bedrijven'
  },
  { 
    id: 2, 
    name: 'E-commerce Oplossing', 
    price: 999.99, 
    image: 'ecommerce.jpg', 
    description: 'Complete webwinkel oplossing'
  },
  { 
    id: 3, 
    name: 'Custom Web App', 
    price: 1499.99, 
    image: 'webapp.jpg', 
    description: 'Op maat gemaakte web applicatie'
  }
];

let cart = [];

// Laad de winkelwagen uit localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCartCount();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function displayProducts() {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <p class="price">€${product.price}</p>
      <button onclick="addToCart(${product.id})" class="button1">In Winkelwagen</button>
    </div>
  `).join('');
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCartCount();
  saveCart();

  // Animate cart icon
  const cartIcon = document.getElementById('cart-icon');
  cartIcon.classList.add('cart-added');
  setTimeout(() => cartIcon.classList.remove('cart-added'), 500);

  showNotification('Product toegevoegd aan winkelwagen!');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  saveCart();
  showNotification('Product uit winkelwagen verwijderd!');
}

function displayCartItems() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.name}</span>
      <span>€${item.price}</span>
     <!-- From Uiverse.io by vinodjangid07 --> 
<button onclick="removeFromCart(${item.id})" class="bin-button">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 39 7"
    class="bin-top"
  >
    <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
    <line
      stroke-width="3"
      stroke="white"
      y2="1.5"
      x2="26.0357"
      y1="1.5"
      x1="12"
    ></line>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 33 39"
    class="bin-bottom"
  >
    <mask fill="white" id="path-1-inside-1_8_19">
      <path
        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
      ></path>
    </mask>
    <path
      mask="url(#path-1-inside-1_8_19)"
      fill="white"
      d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
    ></path>
    <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
    <path stroke-width="4" stroke="white" d="M21 6V29"></path>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 89 80"
    class="garbage"
  >
    <path
      fill="white"
      d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
    ></path>
  </svg>
</button>

    </div>
  `).join('');
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
  displayCartItems();
}

function showCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const cartTotal = document.getElementById('cart-total');

  displayCartItems(); // ← Belangrijk: toont nu altijd verwijderknoppen

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `Totaal: €${total.toFixed(2)}`;

  sidebar.classList.add('active');
}

function closeCart() {
  const sidebar = document.getElementById('cart-sidebar');
  sidebar.classList.remove('active');
}

function checkout() {
  if (cart.length === 0) {
    alert('Uw winkelwagen is leeg!');
    return;
  }
  alert('Bedankt voor uw bestelling!');
  cart = [];
  updateCartCount();
  closeCart();
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Swiper initialisatie
const swiper = new Swiper('.testimonials-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Initialisaties
loadCart();
displayProducts();
document.getElementById('cart-icon').addEventListener('click', showCart);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Preloader
window.addEventListener('load', function () {
  const loader = document.getElementById('preloader');
  loader.style.opacity = '0';
  loader.style.pointerEvents = 'none';
  setTimeout(() => loader.style.display = 'none', 500);
});




