import { addToCart, updateQuantity, removeFromCart, calculateTotal, getCartItems, clearCart, updateCartCount } from './cart.js';
import { fetchProducts, fetchCategories } from './api.js';


export const renderProducts = (products) => {
  const container = document.getElementById('products-container');
  container.innerHTML = '';
  
  if (products.length === 0) {
    container.innerHTML = '<p class="message">No products found</p>';
    return;
  }
  
  products.forEach(product => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
};


const createProductCard = (product) => {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="product-image">
    <div class="product-info">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-category">${product.category}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
    </div>
  `;
  

  card.querySelector('.add-to-cart').addEventListener('click', () => {
    addToCart(product);
  });
  
  return card;
};


export const renderCartItems = () => {
  const container = document.getElementById('cart-items');
  const totalElement = document.getElementById('cart-total-amount');
  const cartItems = getCartItems();
  
  container.innerHTML = '';
  
  if (cartItems.length === 0) {
    container.innerHTML = '<p class="message">your cart is empty</p>';
    totalElement.textContent = '$0.00';
    return;
  }
  
  cartItems.forEach(item => {
    const cartItemElement = createCartItemElement(item);
    container.appendChild(cartItemElement);
  });
  
  totalElement.textContent = `$${calculateTotal()}`;
};


const createCartItemElement = (item) => {
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';
  
  cartItem.innerHTML = `
    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
    <div class="cart-item-details">
      <h4 class="cart-item-title">${item.title}</h4>
      <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
      <div class="cart-item-quantity">
        <button class="quantity-btn minus" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn plus" data-id="${item.id}">+</button>
      </div>
      <button class="remove-item" data-id="${item.id}">Eliminar</button>
    </div>
  `;
  

  cartItem.querySelector('.minus').addEventListener('click', () => {
    const newQuantity = item.quantity - 1;
    updateQuantity(item.id, newQuantity);
    renderCartItems();
  });
  
  cartItem.querySelector('.plus').addEventListener('click', () => {
    const newQuantity = item.quantity + 1;
    updateQuantity(item.id, newQuantity);
    renderCartItems();
  });
  
  cartItem.querySelector('.remove-item').addEventListener('click', () => {
    removeFromCart(item.id);
    renderCartItems();
  });
  
  return cartItem;
};

export const initCategoryFilter = async () => {
  const categoryFilter = document.getElementById('category-filter');
  
  try {
    const categories = await fetchCategories();
    

    while (categoryFilter.options.length > 1) {
      categoryFilter.remove(1);
    }

    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categoryFilter.appendChild(option);
    });
  } catch (error) {
    console.error('Error initializing category filter:', error);
  }
};


export const setupCartToggle = () => {
  const cartToggle = document.getElementById('cart-toggle');
  const closeCart = document.getElementById('close-cart');
  const cartSidebar = document.getElementById('cart-sidebar');
  
  cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('open');
  });
  
  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
  });
};


export const setupCheckout = () => {
  const checkoutBtn = document.getElementById('checkout-btn');
  
  checkoutBtn.addEventListener('click', () => {
    if (getCartItems().length === 0) {
      alert('your cart is empty');
      return;
    }
    
    if (confirm('Do you want to proceed to checkout?')) {
      clearCart();
      renderCartItems();
      alert('Purchase completed successfully! Thank you for your purchase.');
    }
  });
};


export const setupPriceFilter = () => {
  const priceFilter = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');
  
  priceFilter.addEventListener('input', () => {
    priceValue.textContent = `$${priceFilter.value}`;
  });
};