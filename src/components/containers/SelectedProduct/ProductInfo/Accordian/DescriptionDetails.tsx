import React from "react";
import { useSelProduct } from "../../useSelProduct.hook";

function DescriptionDetails() {
  const { productDetails } = useSelProduct();
  const { descpription: description, descpription1: description1 } =
    productDetails;

  return (
    <ul className="desc-list">
      {description && (
        <li className="desc-list-item">
          <div className="data">{description}</div>
        </li>
      )}
      {description1 && (
        <li className="desc-list-item">
          <div className="desc-data">{}</div>
        </li>
      )}
    </ul>
  );
}

export default DescriptionDetails;
