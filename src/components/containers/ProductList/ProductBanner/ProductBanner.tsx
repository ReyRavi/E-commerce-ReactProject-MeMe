import React, { useEffect, useState } from "react";
import "./ProductBanner.scss";
import banner1 from "./images/banner1.jpg";
import banner2 from "./images/banner2.jpg";
import banner3 from "./images/banner3.jpg";
import banner4 from "./images/banner4.jpg";
import banner5 from "./images/banner5.jpg";

export const ProductBanner = () => {
  const images = [banner1, banner2, banner3, banner4, banner5];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(images?.length);

  useEffect(() => {
    setLength(images?.length);
  }, [images]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  // Automatic Carousel Slide Change
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div>
      <div className="slideshow-container">
        <div className="mySlides fade">
          {images?.map((slide: any, index: any) => {
            const activeName =
              index === currentIndex ? "slidesactive" : "slidesinactive";
            return (
              <img
                key={index}
                src={slide}
                style={{
                  width: "100%",
                  objectFit: "cover",
                  // height: containerHeight,
                }}
                className={`slideimg ${activeName}`}
                alt="Slider-Img"
              />
            );
          })}
        </div>

        {currentIndex > 0 && (
          <button onClick={prev} className="prev">
            &#10094;
          </button>
        )}
        {currentIndex < length - 1 && (
          <button onClick={next} className="next">
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductBanner;
