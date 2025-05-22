import { useState, useEffect } from "react";

const Gallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 10000); // 10 seconds
      return () => clearInterval(interval);
    }
  }, [images]);

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  if (!images || images.length === 0) {
    return <div className="gallery">No images available</div>;
  }

  return (
    <div className="gallery">
      <div className="preview">
        <img src={images[activeIndex]} />
      </div>
      {images.length > 1 && (
        <div className="views">
          {images.map((img, index) => (
            <div
              key={index}
              className={`view ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleImageClick(index)}
            >
              <img src={img} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
