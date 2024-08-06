import React from "react";
import { ImageView } from "./ImageView";
import { IProduct } from "../../../../../../model/IProductType";

interface IProps {
  currentIndex: number;
  show: number;
  incrementCount: number;
  maxWidth: string;
  Sliderimages: IProduct[];
}

export const ImageWrapper: React.FC<IProps> = (props: IProps) => {
  const { currentIndex, show, maxWidth, incrementCount, Sliderimages } = props;
  let leftCount;

  const getClassname = (index: number) => {
    let name;
    if (index >= currentIndex && index < currentIndex + show) {
      name = "Carousel__Cell is-selected";
    } else name = "Carousel__Cell";
    return name;
  };

  return (
    <>
      {Sliderimages?.map((item: IProduct, index: number) => {
        leftCount = index * incrementCount;
        return (
          item?.imageurl && (
            <div
              key={index}
              className={getClassname(index)}
              style={{ position: "absolute", left: `${leftCount}%` }}
            >
              <ImageView
                url={item?.imageurl || ""}
                maxWidth={maxWidth}
                item={item}
              />
            </div>
          )
        );
      })}
    </>
  );
};

export default ImageWrapper;
