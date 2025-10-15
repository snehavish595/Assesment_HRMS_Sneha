import React, { useState, useEffect } from 'react';
import './css/ImageCarousel.css';

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

const images = [
  `${process.env.PUBLIC_URL}/images/Image_1.jpg`,
  `${process.env.PUBLIC_URL}/images/Image_2.jpg`,
  `${process.env.PUBLIC_URL}/images/Image_3.jpg`,
  `${process.env.PUBLIC_URL}/images/Image_4.jpg`
];


  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Auto-slide functionality only

  return (
    <div className="image-carousel">
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <div className="slide-content">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="carousel-image"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x400/3498db/ffffff?text=Image+${index + 1}`;
                  }}
                />
                <div className="slide-overlay">
                  <h3>Welcome to OPTICO</h3>
                  <p>Transforming HR Management</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ImageCarousel;
