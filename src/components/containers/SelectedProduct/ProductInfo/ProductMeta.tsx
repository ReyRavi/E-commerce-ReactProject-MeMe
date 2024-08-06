import React from "react";
import { getOfferPrice } from "../../../common/Script";
import { ProductMetaTimer } from "./Timer";

interface IProps {
  name: string;
  price: number;
  offer: number;
  endDate?: string;
  minqty?: number;
  productcode: number | string | null;
}

export const ProductMeta: React.FC<IProps> = (props: IProps) => {
  const { name, price, offer, endDate, minqty, productcode } = props;
 

  return (
    <div className="ProductMeta">
      <h1 className="ProductMeta__Title u-h3">{name}</h1>
      {productcode !== null && (
        <h1 className="ProductMeta__Code u-h4">Product Code: {productcode}</h1>
      )}
      <div className="ProductMeta__PriceList u-h4">
        <span
          className="ProductMeta__Price Price Price--highlight"
          data-money-convertible=""
        >
          $ {getOfferPrice(price, offer)}
        </span>
        {offer !== 0 && (
          <span
            className="ProductMeta__Price Price Price--compareAt Text--subdued"
            data-money-convertible=""
          >
            $ {price}
          </span>
        )}
      </div>
      {endDate && minqty && <ProductMetaTimer endDate={endDate} />}
    </div>
  );
};
