import React from "react";
import { onClick } from "../../../../constant/Types";
import { IProductSize } from "../../../../model/IProductType";
import { WishList } from "../../../common/Icons";
import { QuantitySelector } from "../../../common/QuantitySelector/QuantitySelector";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import { useSelProduct } from "../useSelProduct.hook";

function ProductVarients() {
  const {
    productDetails,
    buttonName,
    count,
    handleIncrement,
    handleDecrement,
    handleSizeChange,
    handleButtonClick,
    FavIconOnclick,
    FavIconName,
    disableFav,
  } = useSelProduct();

  const { pcolor, productSize } = productDetails;

  const initialId =
    productSize && productSize.length > 0 ? productSize[0].id : 0;

  const [id, setId] = React.useState(initialId);

  const ProductColor = () => {
    const pdtColor = pcolor.includes(",")
      ? pcolor.split(",")
      : pcolor.split("-");

    return (
      <div className="ProductForm__Variants">
        <div className="ProductForm__Option ProductForm__Option--labelled">
          <span className="ProductForm__Label u-h4">Color:</span>

          <ul className="SizeSwatchList HorizontalList HorizontalList--spacingTight">
            {pdtColor.map((item: string) => {
              return (
                <li
                  className="HorizontalList__Item"
                  style={{
                    borderLeft: `4px solid ${item.toLowerCase().trim()}`,
                  }}
                  key={item}
                >
                  <input
                    id="option-product-template-0-0"
                    className="SizeSwatch__Radio"
                    type="radio"
                    name="option-0"
                    readOnly
                    data-option-position="1"
                  />
                  <label
                    htmlFor="option-product-template-0-0"
                    className="SizeSwatch u-h4"
                  >
                    {item}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const ProductSize = () => {
    const handleSizeClick = (e: onClick, item: IProductSize) => {
      e.preventDefault();
      setId(item.id);
      handleSizeChange(item.psize);
    };

    return (
      <React.Fragment>
        {productSize.length > 0 && (
          <div className="ProductForm__Variants">
            <div className="ProductForm__Option ProductForm__Option--labelled">
              {/* <div className="sizing-chart-modal-link">
                <img className="kiwi-svg" src={size} />
                <span className="_ks_text">Size Chart</span>
              </div> */}
              <span className="ProductForm__Label u-h4">Size:</span>
              <ul className="SizeSwatchList HorizontalList HorizontalList--spacingTight">
                {productSize.map((item: IProductSize, index: number) => {
                  return (
                    <li
                      key={index}
                      className="HorizontalList__Item"
                      onClick={(e: onClick) => {
                        handleSizeClick(e, item);
                      }}
                    >
                      <input
                        id={item.psize}
                        className="SizeSwatch__Radio"
                        type="radio"
                        name={`option-${index}`}
                        value={item.psize}
                        readOnly
                        checked={item.id === id ? true : false}
                      />
                      <label htmlFor={item.psize} className="SizeSwatch u-h6">
                        {item.psize}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <form className="ProductForm u-h4">
      <ProductSize />
      <ProductColor />
      <div className="ProductForm__Variants">
        <div className="ProductForm__Option ProductForm__Option--labelled">
          <span className="ProductForm__Label">Quantity:</span>
          <QuantitySelector
            count={count}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </div>
      </div>

      <TextButton
        items={buttonName}
        isprimary={true}
        className="Button--full"
        onClick={handleButtonClick}
      />

      <button
        className="ProductWishListButton"
        onClick={FavIconOnclick}
        disabled={disableFav}
      >
        <WishList name="ProductWishListIcon" fill={disableFav} />
        <span className="u-h4">{FavIconName}</span>
      </button>
    </form>
  );
}

export default ProductVarients;
