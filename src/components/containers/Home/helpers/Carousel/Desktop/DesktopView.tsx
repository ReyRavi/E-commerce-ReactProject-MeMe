import React, { useState } from "react";
import { FlickityButton } from "../common/FlickityButton";
import ImageWrapper from "../common/ImageWrapper";
import { IProduct } from "../../../../../../model/IProductType";

interface IProps {
  Sliderimages: IProduct[];
}

export const DesktopView: React.FC<IProps> = (props: IProps) => {
  const { Sliderimages } = props;

  let show = 4;
  const [currentIndex, setCurrentIndex] = useState(0);

  // const length = MockImages.length - 1;

  const [length, setLength] = useState(0);

  React.useEffect(() => {
    setLength(Sliderimages && Sliderimages.length);
  }, [Sliderimages]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 2);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 2);
    }
  };

  return (
    <div
      className="ProductList ProductList--carousel Carousel flickity-enabled is-draggable"
      tabIndex={0}
      style={{
        visibility: "inherit",
        opacity: 1,
        transform: "matrix(1, 0, 0, 1, 0, 0)",
      }}
    >
      <div
        className="flickity-viewport"
        style={{ height: "450.8px", touchAction: "pan-y" }}
      >
        <div
          className="flickity-slider"
          style={{
            left: 0,
            transform: `translateX(-${currentIndex * (100 / show)}%)`,
          }}
        >
          <ImageWrapper
            currentIndex={currentIndex}
            show={4}
            incrementCount={25}
            maxWidth="760px"
            Sliderimages={Sliderimages}
          />
        </div>
      </div>

      <FlickityButton
        currentIndex={currentIndex}
        show={show}
        length={length}
        next={next}
        prev={prev}
      />
    </div>
  );
};
