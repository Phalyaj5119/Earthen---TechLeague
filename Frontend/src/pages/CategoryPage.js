import React from 'react';
import './Category.css'; // Keep the original file name

const CategoryPage = () => {
  return (
    <section className="category-page">
      <h2>Shop By Category</h2> {/* Heading added here */}
      <div className="category-buttons">
        <div className="category-item">
          <img src="/images/mug.png" alt="Mugs" className="category-image" />
          <div className="overlay">
            <h3>Mugs</h3>
            <div className="arrow">→</div>
          </div>
        </div>
        <div className="category-item">
          <img src="/images/plate.png" alt="Plates" className="category-image" />
          <div className="overlay">
            <h3>Plates</h3>
            <div className="arrow">→</div>
          </div>
        </div>
        <div className="category-item">
          <img src="/images/vase.png" alt="Vase" className="category-image" />
          <div className="overlay">
            <h3>Vase</h3>
            <div className="arrow">→</div>
          </div>
        </div>
        <div className="category-item">
          <img src="/images/statue.png" alt="Statue" className="category-image" />
          <div className="overlay">
            <h3>Statue</h3>
            <div className="arrow">→</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;


