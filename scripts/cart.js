
let cart = JSON.parse(localStorage.getItem('cart')) || [];


const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
};

export const updateCartCount = () => {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
};

export const addToCart = (product) => {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  saveCart();
  showMessage(`${product.title} added to cart`, 'success');
};


export const removeFromCart = (productId) => {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
};


export const updateQuantity = (productId, newQuantity) => {
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      removeFromCart(productId);
    }
    saveCart();
  }
};

export const calculateTotal = () => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
};

export const getCartItems = () => {
  return [...cart];
};


const showMessage = (message, type) => {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${type}`;
  messageElement.textContent = message;
  
  document.body.appendChild(messageElement);
  
  setTimeout(() => {
    messageElement.remove();
  }, 3000);
};


export const clearCart = () => {
  cart = [];
  saveCart();
};