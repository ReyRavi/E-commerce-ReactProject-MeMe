import React from "react";
import { IProduct } from "../../../../../model/IProductType";
import { getOfferPrice } from "../../../../common/Script";

interface IProps {
  gridName: any;
  url: string;
  name: string;
  price: number;
  offer: number;
  item: IProduct;
  handleProductOnclick: (item: IProduct) => void;
}

export const ImageView: React.FC<IProps> = (props: IProps) => {
  const { gridName, url, name, price, offer, handleProductOnclick, item } =
    props;

  return (
    <div
      className={gridName}
      onClick={() => {
        handleProductOnclick(item);
      }}
    >
      <div className="ProductItem ProductTwo">
        <div className="ProductItem__Wrapper">
          <div className="ProductItem__ImageWrapper">
            <div className="AspectRatio AspectRatio--square P2-square">
              <img className="ProductItem__Image" src={url} alt="name" />
            </div>
          </div>

          <div className="ProductItem__Info ProductItem__Info--center">
            <h2 className="ProductItem__Title Collection-Heading u-h4">
              {name}
            </h2>
            <div className="ProductItem__PriceList  Collection-Heading u-h4">
              <span
                className="ProductItem__Price Price Price--highlight"
                data-money-convertible=""
              >
                $ {getOfferPrice(price, offer)}
              </span>
              {offer !== 0 && (
                <span
                  className="ProductItem__Price Price Price--compareAt Text--subdued"
                  data-money-convertible=""
                >
                  $ {price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
