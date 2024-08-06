import { TextButton } from "../../ui-kit/TextButton/TextButton.view";
import "./EmptyProducts.scss";
import { useHistory } from "react-router-dom";
import comingsoon from "../../../assets/image/ComingSoon.png";

function EmptyProducts() {
  const history = useHistory();

  return (
    <div className="productsNotFoundCard-wrapper">
      <img
        src={comingsoon}
        alt="products-not-found"
        className="productsNotFoundCard-image"
      />
      {/* <div className="productsNotFoundCard-text">OOPS! No Products Found </div> */}
      <TextButton
        items="BACK TO SHOPPING"
        isprimary={true}
        className="productsNotFoundCard-button"
        onClick={() => {
          history.push("/");
        }}
      />
    </div>
  );
}

export default EmptyProducts;
