import React from "react";
import { onClick } from "../../../constant/Types";
import { ICartItemResponse } from "../../../model/IProductType";
import { useCart } from "../Cart/useCart.hook";
import "./MiniCart.scss";

interface IProps {
  onClickContinue: () => void;
}

export const MiniCart: React.FC<IProps> = (props: IProps) => {
  const { viewCart } = useCart();

  const { onClickContinue } = props;

  const CouponContainer = () => {
    return (
      <div className="checkout_coupon_container">
        <span className="Sub-title coupon-head u-h4">
          Apply Discount Coupon
        </span>
        <form className="apply_coupon u-h5">
          <input type="text" placeholder="Enter coupon code" />
          <button
            type="submit"
            className="coupon-button"
            onClick={() => {
              alert("No Coupons Available");
            }}
          >
            Apply
          </button>
        </form>
      </div>
    );
  };

  const getImage = (item: ICartItemResponse, index: number) => {
    const { imageurl, productName, size, qty } = item.productInfo;

    return (
      <li className="product-item u-h6" key={index}>
        <span
          className="product-image OrderItem__ImageWrapper AspectRatio"
          style={{ aspectRatio: "0.8" }}
        >
          <img alt={productName} src={imageurl} />
        </span>
        <div className="item-details">
          <div className="product-name">{productName}</div>
          <div className="pdt-text" style={{ marginTop: "3px" }}>
            <span>Qty : </span>
            <span className="value">{qty}</span>
          </div>
          <div>
            <div className="pdt-text" style={{ marginTop: "3px" }}>
              <span>Size : </span>
              <span className="value">{size}</span>
            </div>
          </div>
          <div className="subtotal pdt-text" style={{ marginTop: "3px" }}>
            <span>SubTotal : </span>
            <span className="price">
              $ {item.subTotal && item.subTotal.toFixed()}
            </span>
          </div>
        </div>
      </li>
    );
  };

  const Total = () => {
    const { totalPrice } = viewCart;
    return (
      <div className="summary-total u-h5">
        <table>
          <tbody>
            <tr className="totals sub">
              <th>Subtotal</th>
              <td className="currancy">
                $ {totalPrice && totalPrice.toFixed()}
              </td>
            </tr>
            <tr className="coupon totals">
              <th>Discount</th>
              <td className="currancy">$ 0</td>
            </tr>
            <tr className="totals shipping">
              <th>Delivery Charges</th>
              <td className="currancy">$ 0</td>
            </tr>
            <tr className="divider"></tr>
            <tr className="grandtotals">
              <th className="gdTotal">Order Total</th>
              <td className="currancy gdTotal">
                $ {totalPrice && totalPrice.toFixed()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const ImageContent = () => {
    const { totalPrice } = viewCart;

    const handleContinue = (e: onClick) => {
      e.preventDefault();
      onClickContinue();
    };

    return (
      <div className="content">
        <ol className="minicart-items">
          {viewCart.cartItem?.map((item: ICartItemResponse, index: number) => {
            return getImage(item, index);
          })}
        </ol>
        <Total />
        <div className="mobile-total u-h4">
          Total: ${totalPrice && totalPrice.toFixed()}
        </div>
        <div className="disabled-continue u-h4" onClick={handleContinue}>
          Continue
        </div>
      </div>
    );
  };

  return (
    <div className="minicart">
      <CouponContainer />
      <span className="summary-title u-h4">Order Summary</span>
      <span className="edit-cart u-h6">
        <a href="/cart" className="">
          Edit Cart
        </a>
      </span>
      <ImageContent />
    </div>
  );
};
