import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import { PaypalButtons } from "../../common/PaypalButton/PayPalButton";
import { LoggedInUser } from "../../common/Script";
import { placeOrderAction } from "../../stateContainers/Order/ThunkAction";
import { IPlaceOrder } from "../../stateContainers/Order/Types";
import { useAddress } from "../Address/useAddress.hook";
import { useCart } from "../Cart/useCart.hook";
import { MiniCart } from "../MiniCart/MiniCart";
import { Stepper } from "../Stepper/Stepper";
import "./PaymentContainer.scss";

import useRazarPay from "./useRazarPay.hook";

export const PaymentContainer = () => {
  const { fetchAddreses, addressList } = useAddress();
  const { displayRazorpay } = useRazarPay();
  const history = useHistory();
  const { viewCart, FetchCartData } = useCart();
  const [activeUPI, setActiveUPI] = useState(false);
  const [activeRazarPay, setActiveRazarPay] = useState(false);
  const { addressData } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const selectedAddress = addressData && addressData.selectedAddress;

  React.useEffect(() => {
    if (Object.keys(selectedAddress).length < 1) {
      history.push("/address");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress]);

  React.useEffect(() => {
    if (Object.entries(addressList).length < 1) {
      fetchAddreses();
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (Object.entries(viewCart).length < 1) {
      FetchCartData();
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRazarOnClick = (e: any) => {
    e.preventDefault();
    setActiveRazarPay(!activeRazarPay);
    setActiveUPI(false);
  };

  const handlePayPalOnClick = (e: any) => {
    e.preventDefault();
    setActiveUPI(!activeUPI);
    setActiveRazarPay(false);
  };

  const OrderItems: IPlaceOrder = {
    cusId: LoggedInUser as string,
    addId: selectedAddress.address?.id,
    pstatus: "success",
  };

  const onPaymentSuccess = () => {
    dispatch(placeOrderAction(OrderItems));
    history.push("/orderconfirm");
  };

  const RazProps = {
    name: selectedAddress.address?.name,
    amount: viewCart.totalPrice?.toFixed() as any,
    email: selectedAddress.address?.phone,
    phoneNo: selectedAddress?.uPhone,
    onSuccess: onPaymentSuccess,
  };

  const AddressBar = () => {
    const history = useHistory();
    return (
      <div className="add_old_address mb-4 u-h5">
        <h3>{selectedAddress.address?.name}</h3>
        <p>
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              display: "inline-block",
              verticalAlign: "top",
            }}
          >
            <p>
              {selectedAddress.address?.flatNo},
              {selectedAddress.address?.street}
            </p>
            <p>{selectedAddress.address?.landMark}</p>
            <p>
              {selectedAddress.address?.city} - {selectedAddress.address?.pin}
            </p>
          </span>
        </p>
        <p>
          Mobile Number: &nbsp;
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              display: "inline-block",
              verticalAlign: "top",
            }}
          >
            {selectedAddress.uPhone}
          </span>
        </p>
        <p
          style={{
            marginTop: "7px",
            color: "#e88e7e",
            fontWeight: 500,
          }}
        >
          Delivery in 3-12 Days.
        </p>
        <button
          className="edit-button u-h6"
          onClick={() => history.push("/Address")}
        >
          Edit
        </button>
      </div>
    );
  };

  const RazarPay = () => {
    const isActiveRazarPay = activeRazarPay ? "active" : "";
    return (
      <div
        className={`payment-method ${isActiveRazarPay}`}
        onClick={handleRazarOnClick}
      >
        <div
          className="payment-method-title choice"
          style={{ position: "relative" }}
        >
          <input
            type="radio"
            name="payment[method]"
            className="radio paymentInput"
          />
          <label htmlFor="razorpay" className="payment-label u-h6">
            Razorpay
          </label>
        </div>
        {activeRazarPay && (
          <div className="payment-method-button">
            <button
              id="payu_button"
              type="button"
              className="checkout u-h6"
              onClick={() => displayRazorpay(RazProps)}
            >
              Continue Checkout
            </button>
          </div>
        )}
      </div>
    );
  };

  const PayPal = () => {
    const isActiveUPI = activeUPI ? "active" : "";
    return (
      <div
        className={`payment-method ${isActiveUPI}`}
        onClick={handlePayPalOnClick}
      >
        <div
          className="payment-method-title choice"
          style={{ position: "relative" }}
        >
          <input
            type="radio"
            name="payment[method]"
            className="radio paymentInput"
          />
          <label htmlFor="paypal" className="payment-label u-h6">
            <span>Paypal</span>
          </label>
        </div>
        {activeUPI && (
          <PaypalButtons
            amount={
              viewCart.totalPrice && (viewCart?.totalPrice?.toFixed() as any)
            }
            PaymentSuccess={onPaymentSuccess}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <Stepper activeIndex={2} />
      <div className="checkout-main">
        <div className="checkout-main-wrapper">
          <div className="col-md-8 col-sm-12 col-xs-12 checkout-section">
            <div className="payment-method-section omc-section">
              <AddressBar />
              <PayPal />
              <RazarPay />
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-xs-12 omc-sidebar">
            <MiniCart onClickContinue={() => displayRazorpay(RazProps)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentContainer;
