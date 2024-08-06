import React from "react";
import { IProduct } from "../../../../model/IProductType";
import { getOfferPrice } from "../../../common/Script";
import { useTimer } from "../../../common/Timer/useTimer.hook";
import { Timer } from "../Timer/Timer";

interface IProps {
  item: IProduct;
  handleProductOnclick: (item: IProduct) => void;
}

export const PreOrderItem: React.FC<IProps> = (props: IProps) => {
  const { item, handleProductOnclick } = props;
  const { imageurl, pName, offer, price, endDate, minqty } = item;
  const { timeLeft } = useTimer(endDate);

  const Badge = () => {
    return (
      <div className="preorder-overlay">
        <span className="u-h6">{timeLeft?.days}</span> Days
      </div>
    );
  };

  return (
    <div
      className="preorder-wrapper"
      key={item.mcId}
      onClick={() => {
        handleProductOnclick(item);
      }}
    >
      <div className="preorder-item">
        <div className="preorder-thumb">
          <img className="preorder-img" src={imageurl} alt="Thumb" />
          {timeLeft && <Badge />}
        </div>
        <div className="preorder-info u-h4">
          <h4>{pName}</h4>

          <div className="ProductItem__PriceList  u-h4">
            <span
              className="ProductItem__Price Price Price--highlight"
              data-money-convertible=""
            >
              $ {getOfferPrice(price, offer)}
            </span>
            {offer !== 0 && (
              <span
                className="ProductItem__Price Price Price--compareAt Heading"
                data-money-convertible=""
              >
                $ {price}
              </span>
            )}
          </div>
          <div className="preorder-minqty">Minimum Quantity : {minqty}</div>
          <Timer endDate={endDate} />
        </div>
      </div>
    </div>
  );
};
