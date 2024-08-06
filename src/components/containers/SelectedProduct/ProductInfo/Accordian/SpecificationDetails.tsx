import React from "react";
import { useSelProduct } from "../../useSelProduct.hook";

function SpecificationDetails() {
  const { productDetails } = useSelProduct();
  const { pWeight, productHeight, proSize, metal, stone } = productDetails;

  return (
    <div>
      <table className="Product-Table">
        {pWeight && (
          <thead>
            <tr>
              <td>Weight</td>
              <td>{pWeight}</td>
            </tr>
          </thead>
        )}
        <tbody>
          {productHeight && (
            <tr>
              <td>Height</td>
              <td>{productHeight}</td>
            </tr>
          )}

          {proSize && (
            <tr>
              <td>Size</td>
              <td>{proSize}</td>
            </tr>
          )}
          {metal && (
            <tr>
              <td>Metal</td>
              <td>{metal}</td>
            </tr>
          )}
          {stone && (
            <tr>
              <td>Stone</td>
              <td>{stone}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SpecificationDetails;
