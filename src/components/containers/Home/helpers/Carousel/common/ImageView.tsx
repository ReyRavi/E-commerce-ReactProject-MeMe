import React from "react";
import { onClick } from "../../../../../../constant/Types";
import { IProduct } from "../../../../../../model/IProductType";
import useProductList from "../../../../ProductList/useProductList.hook";
import { InfoWrapper } from "./InfoWrapper";

interface IProps {
  url: string;
  maxWidth: string;
  item: IProduct;
}

export const ImageView: React.FC<IProps> = (props: IProps) => {
  const { url, maxWidth, item } = props;

  const { handleProductOnclick } = useProductList();

  const ImageOnClick = (e: onClick, item: IProduct) => {
    e.preventDefault();
    handleProductOnclick(item);
  };

  const Image = () => {
    return (
      <div
        className="ProductItem__ImageWrapper"
        onClick={(e) => ImageOnClick(e, item as IProduct)}
      >
        <div
          className="AspectRatio AspectRatio--square"
          style={{ maxWidth: maxWidth, aspectRatio: "1.0" }}
        >
          <img className="ProductItem__Image" alt="Product" src={url} />
          <span className="Image__Loader"></span>
        </div>
      </div>
    );
  };

  return (
    <div className="ProductItem">
      <div className="ProductItem__Wrapper">
        <Image />
        <InfoWrapper name={item.pName} price={item.price} offer={item.offer} />
      </div>
    </div>
  );
};
