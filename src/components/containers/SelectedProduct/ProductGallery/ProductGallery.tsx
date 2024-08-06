import React from "react";
import { useSelProduct } from "../useSelProduct.hook";
import MainImage from "./MainImage/MainImage";
import { ThumbDots } from "./ThumbDots/ThumbDots";
import { Thumbnails } from "./Thumbnails/Thumbnails";

function ProductGallery() {
  const {
    images,
    activeIndex,
    activeImage,
    selectedImageUrl,
    handleDotsClick,
    next,
    prev,
  } = useSelProduct();

  React.useEffect(() => {
    selectedImageUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className="Product__Gallery Product__Gallery--stack Product__Gallery--withThumbnails">
      {/* <ActionButtons /> */}
      <Thumbnails
        activeIndex={activeIndex}
        onThumbnailClick={handleDotsClick}
        productImages={images}
      />
      <ThumbDots
        activeIndex={activeIndex}
        onThumbDotsClick={handleDotsClick}
        productImages={images}
      />
      <MainImage
        image={activeImage}
        activeIndex={activeIndex}
        onThumbDotsClick={handleDotsClick}
        productImages={images}
        next={next}
        prev={prev}
      />
    </div>
  );
}

export default ProductGallery;
