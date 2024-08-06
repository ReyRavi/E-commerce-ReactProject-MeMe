import React from "react";
import { CartSummary } from "./CartSummary/CartSummary";
import { CartTable } from "./CartTable/CartTable";
import { useCart } from "./useCart.hook";
import { IViewCartResponse } from "../../../model/IProductType";
import EmptyCart from "../../common/EmptyCart/EmptyCart";
import Stepper from "../Stepper/Stepper";
import "./Cart.scss";

export const Cart = () => {
  const { viewCart } = useCart();

  const [cartItems, setCartItems] = React.useState<IViewCartResponse>(
    {} as IViewCartResponse
  );

  React.useEffect(() => {
    setCartItems(viewCart);
  }, [viewCart]);

  return (
    <div className="ccolumns">
      <div className="ccolumn main">
        <Stepper activeIndex={0} />
        {viewCart.cartItem?.length > 0 ? (
          <div className="cart-container">
            <CartSummary items={cartItems} />
            <div className="cart-page-title u-h4">
              IN MY BAG
              <div className="cart-count u-h4">{`( ${cartItems.cartItem?.length} items )`}</div>
            </div>
            <CartTable cartItems={cartItems.cartItem} />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
