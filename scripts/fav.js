
let cart = JSON.parse(localStorage.getItem('cart')) || [];


const saveCart = () => {
  localStorage.setItem('fav', JSON.stringify(cart));
  updateCartCount();
};

export const addTofav = (product) => {
  const existingItem = fav.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  saveCart();
  showMessage(`${product.title} added to favorites`, 'success');
};


export const removeFromfav = (productId) => {
  cart = fav.filter(item => item.id !== productId);
  saveCart();
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