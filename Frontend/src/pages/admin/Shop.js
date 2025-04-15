/* Shop.css */


/* Container and Layout */
.shop-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  background: transparent;
  min-height: 100vh;
}

.shop-heading {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.shop-content {
  display: flex;
  gap: 20px;
}

/* Sidebar */
.sidebar {
  flex: 1;
  max-width: 250px;
  background-color: #fff8ec;
  padding: 20px;
  border-radius: 16px;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 30px;
}

.filter-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #444;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 8px;
  transition: background-color 0.3s;
  color: #333;
  font-weight: 500;
}

.category-item:hover {
  background-color: #f0e3d1;
}

.category-item.active {
  background-color: #e8d6be;
  color: #000;
}

.filter-select {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  background-color: #fff;
}

/* Product Grid */
.products-grid {
  flex: 3;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

/* Product Card */
.product-card {
  background-color: #f5f0e6; /* beige tone */
  border-radius: 16px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image-link,
.product-name-link {
  text-decoration: none;
  color: inherit;
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
}

.product-name {
  margin: 10px 0 5px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 10px;
}

.product-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.wishlist-button,
.cart-button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.wishlist-button:hover,
.cart-button:hover {
  background-color: #ddd;
}

.no-products {
  font-size: 1.2rem;
  color: #888;
  text-align: center;
  margin-top: 40px;
}

/* Responsive */
@media (max-width: 768px) {
  .shop-content {
    flex-direction: column;
  }

  .sidebar {
    max-width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
