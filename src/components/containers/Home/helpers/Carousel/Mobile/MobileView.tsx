import React from "react";
import { IProduct } from "../../../../../../model/IProductType";
import { ImageView } from "../common/ImageView";

interface IProps {
  Sliderimages: IProduct[];
}

export const MobileView: React.FC<IProps> = (props: IProps) => {
  const { Sliderimages } = props;

  const getUrl = (item: IProduct) => {
    return item.productImages?.length > 0 ? item.productImages[0].imageUrl : "";
  };

  return (
    <div
      className="ProductList ProductList--carousel Carousel"
      style={{
        visibility: "inherit",
        opacity: 1,
        transform: "matrix(1, 0, 0, 1, 0, 0)",
      }}
    >
      {Sliderimages.map((item: any, index: number) => {
        return (
          <div className="Carousel__Cell" key={index}>
            <ImageView url={getUrl(item)} maxWidth="3072px" item={item} />
          </div>
        );
      })}
    </div>
  );
};
