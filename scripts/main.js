import { fetchProducts, fetchCategories } from './api.js';
import { renderProducts, renderCartItems, initCategoryFilter, setupCartToggle, setupCheckout, setupPriceFilter } from './dom.js';
import { updateCartCount } from './cart.js';



let allProducts = [];


const initApp = async () => {
    
  try {

    allProducts = await fetchProducts();
    renderProducts(allProducts);
    

    await initCategoryFilter();
    setupPriceFilter();
    

    renderCartItems();
    setupCartToggle();
    setupCheckout();
    updateCartCount();

    setupFilters();
    setupSearch();
    
  } catch (error) {
    console.error('Error initializing app:', error);
    document.getElementById('products-container').innerHTML = 
      '<p class="message error">Error while loading products. Please try again.</p>';
  }
};


const setupFilters = () => {
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');
  const sortBy = document.getElementById('sort-by');
  
  const applyFilters = () => {
    const category = categoryFilter.value;
    const maxPrice = parseFloat(priceFilter.value);
    const sortOption = sortBy.value;
    
    let filteredProducts = [...allProducts];

    if (category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    

    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    

    switch (sortOption) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
  
        break;
    }
    
    renderProducts(filteredProducts);
  };
  
  categoryFilter.addEventListener('change', applyFilters);
  priceFilter.addEventListener('input', applyFilters);
  sortBy.addEventListener('change', applyFilters);
};


const setupSearch = () => {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  const performSearch = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
      renderProducts(allProducts);
      return;
    }
    
    const filteredProducts = allProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(filteredProducts);
  };
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
};


document.addEventListener('DOMContentLoaded', initApp);