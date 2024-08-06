import React from "react";
import FlickyDots from "../FlickyDots/FlickyDots";
import { IProductImage } from "../../../../../model/IProductType";
import FlickyViewPort from "../FlickyViewPort/FlickyViewPort";
import { useWindowSize } from "../../../../../hook/useWindowSize.hook";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

const SingleImage = (props: any) => {
  return (
    <Gallery>
      <Item
        original={props.url}
        thumbnail={props.url}
        width="1024"
        height="768"
      >
        {({ ref, open }) => (
          <img
            src={props.url}
            ref={ref as any}
            onClick={open}
            alt="product"
            data-max-width="1600"
            data-max-height="1600"
          />
        )}
      </Item>
    </Gallery>
  );
};

const DesktopView = (props: any) => {
  const [width] = useWindowSize();
  let aspectRatio = width > 1024 ? "1.0" : "0.8";
  return (
    <div className="Product__Slideshow Product__Slideshow--zoomable Carousel">
      <div className="Product__SlideItem Product__SlideItem--image Carousel__Cell">
        <div
          className="AspectRatio AspectRatio--withFallback"
          style={{ paddingBottom: "100.0%", aspectRatio: aspectRatio }}
        >
          <SingleImage url={props.image} />
        </div>
      </div>
    </div>
  );
};

interface IProps {
  image: any;
  activeIndex: number;
  onThumbDotsClick: (activeIndex: number) => void;
  productImages: IProductImage[];
  next: () => void;
  prev: () => void;
}

function MainImage(props: IProps) {
  const [width] = useWindowSize();

  const { image, activeIndex, onThumbDotsClick, productImages, next, prev } =
    props;

  return (
    <React.Fragment>
      {width < 1024 ? (
        <div className="Product__Slideshow  Carousel flickity-enabled is-draggable mobileview">
          <FlickyViewPort
            activeIndex={activeIndex}
            productImages={productImages}
            next={next}
            prev={prev}
          />
          <FlickyDots
            activeIndex={activeIndex}
            onThumbDotsClick={onThumbDotsClick}
            images={productImages}
          />
        </div>
      ) : (
        <DesktopView image={image} />
      )}
    </React.Fragment>
  );
}

export default MainImage;
