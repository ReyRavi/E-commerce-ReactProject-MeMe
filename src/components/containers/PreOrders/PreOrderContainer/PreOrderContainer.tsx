import { usePreOrder } from "../usePreOrder.hook";
import { PreOrderItem } from "./PreOrderItem";
import "./PreOrderContainer.scss";
import { IProduct } from "../../../../model/IProductType";

export const PreOrderContainer = () => {
  const { preoders, handleProductOnclick } = usePreOrder();

  return (
    <div className="preorder-container">
      <div className="preorder-row">
        <div className="preorder-header">
          <div className="preorder-heading">
            <h2 className="u-h3">
              Pre<span> Order </span>
            </h2>
            <h4 className="marquee card__marquee u-h3">
              place more than minimum quantities to get 50% instant discount on
              preorder products
            </h4>
          </div>
        </div>
      </div>
      <div className="preorder-row preorder-items">
        {preoders.map((item: IProduct) => {
          return (
            <PreOrderItem
              key={item.mcId}
              item={item}
              handleProductOnclick={handleProductOnclick}
            />
          );
        })}
      </div>
    </div>
  );
};
