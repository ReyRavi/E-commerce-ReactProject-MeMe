import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ICarousel } from "../../../../model/ISliderType";
import { IRootState } from "../../../../redux/reducer/CombineReducer";
import "./Banner.scss";

export const Banner = () => {
  const { sliderData } = useSelector((state: IRootState) => state);
  const carousel = sliderData && sliderData.Sliders.carousel;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(carousel?.length);

  useEffect(() => {
    setLength(carousel?.length);
  }, [carousel]);

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
          {carousel?.map((slide: ICarousel, index: any) => {
            const activeName =
              index === currentIndex ? "slidesactive" : "slidesinactive";
            return (
              <img
                key={index}
                src={slide.bannerUrl}
                style={{
                  width: "100%",
                  objectFit: "cover",
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
      {/* <br /> */}
      <div style={{ textAlign: "center" }}>
        {carousel?.map((item: ICarousel, index: number) => {
          const cname = currentIndex === index ? "dot-active" : "";
          return <span className={`dot ${cname}`} key={index}></span>;
        })}
      </div>
    </div>
  );
};
