import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios'; // Axios for making HTTP requests
import './Carousel.css';

const Carousel = () => {
  const [products, setProducts] = useState([]);

  // Fetch products data from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Update with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 products at a time
    slidesToScroll: 1,
    prevArrow: <button className="slick-prev">←</button>,
    nextArrow: <button className="slick-next">→</button>,
  };

  return (
    <section className="carousel">
      <h2>Our Latest Collection</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="carousel-item">
           <img src={product.imageUrl} alt={product.name} />
            <div className="carousel-details">
              <h3>{product.name}</h3>
              <p className="carousel-price">${product.price}</p>
              <p className="carousel-description">{product.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Carousel;
