import React from "react";
import { useSelProduct } from "../useSelProduct.hook";

export default function ProductDescription() {
  enum Page {
    Info,
    Delivery,
  }

  const { productDetails } = useSelProduct();
  const {
    deliveryTime,
    descpription: description,
    descpription1: description1,
  } = productDetails;
  const time = deliveryTime ? deliveryTime : "3-21";

  const [state, setState] = React.useState(Page.Info);

  const Description = () => {
    return (
      <>
        <div>{description && description}</div>
        <br />
        <div>{description1 && description1}</div>
      </>
    );
  };

  return (
    <div id="tsp_tab_products" className="product-collateral clearfix">
      <ul className="nav-tabs u-h6">
        <li
          className="active"
          onClick={() => {
            setState(Page.Info);
          }}
        >
          <span data-toggle="tab">More Info</span>
        </li>
        <li
          onClick={() => {
            setState(Page.Delivery);
          }}
        >
          <span data-toggle="tab">Delivery</span>
        </li>
      </ul>
      <div className="tab-content">
        <section className="active">
          {state === Page.Delivery ? (
            `Products are generally dispatched in ${time} days depending upon the
          product you have ordered.`
          ) : (
            <Description />
          )}
        </section>
      </div>
    </div>
  );
}
