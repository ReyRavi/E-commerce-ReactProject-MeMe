import React from "react";
import { onClick } from "../../../constant/Types";
import { IProductSize, IProduct } from "../../../model/IProductType";
import { getOfferPrice, LoggedInUser } from "../../common/Script";
import { useWishList } from "./useWishList.hook";
import CloseIcon from "../../../assets/image/Close.svg";

interface IProps {
  item: IProduct;
}

export const ImageList: React.FC<IProps> = (props: IProps) => {
  const { item } = props;

  const { handleAddToCartClick, handleDeleteClick } = useWishList();

  const initialState =
    item.productSize.length > 0 ? item.productSize[0].psize : "";
  const [size, setSize] = React.useState(initialState);
  const [qty, setQty] = React.useState(1);

  let code = item.mcId;

  const addToCart = {
    productId: code,
    qty: qty,
    cusId: LoggedInUser as string,
    size: size,
  };

  const handleSizeChange = (e: any) => {
    const value = e.target.value;
    setSize(value);
  };

  const handleQtyChange = (e: any) => {
    const value = e.target.value;
    setQty(value);
  };

  const QuantityMaker = () => {
    return (
      <div className="modal-ap-contain u-h5">
        <div className="modal-size">
          <div className="modal-size-standalone mss-size">
            <div className="modal-size-inner">
              <span>Size: </span>
              {item.productSize.length > 0 ? (
                <select
                  className="size-select"
                  onChange={handleSizeChange}
                  value={size}
                >
                  {item.productSize.map((item: IProductSize) => {
                    return (
                      <option key={item.psize} value={item.psize}>
                        {item.psize}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <span> Std </span>
              )}
            </div>
          </div>
        </div>
        <div className="modal-size">
          <div className="modal-size-standalone mss-qty">
            <div className="modal-size-inner">
              <span>Qty: </span>
              <select
                className="size-select"
                onChange={handleQtyChange}
                value={qty}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="Grid__Cell 1/1--phone 1/3--tablet-and-up 1/4--desk">
        <div
          className="ProductItem "
          style={{
            visibility: "inherit",
            opacity: 1,
            transform: "matrix(1, 0, 0, 1, 0, 0)",
          }}
        >
          <div className="ProductItem__Wrapper img-container">
            <div className="modal-img-container">
              <div className="wishlist-pos-relative"></div>
              <a
                href={item.productImages[0].imageUrl}
                className="wishlist-img-anchor"
              >
                <img
                  className="img-responsive resultImg"
                  src={item.productImages[0].imageUrl}
                  alt={item.pName}
                />
              </a>
              <span
                onClick={() => {
                  handleDeleteClick(item.mcId);
                }}
              >
                <img className="modal-close-icon" alt="Close" src={CloseIcon} />
              </span>

              <div className="wishlist-action-wrapper">
                <QuantityMaker />
                <button
                  className="modal-add-bag"
                  onClick={(e: onClick) => {
                    handleAddToCartClick(e, addToCart);
                  }}
                >
                  <div className="modal-inner-bag u-h5">Add To Cart</div>
                </button>
              </div>
            </div>

            <div className="ProductItem__Info ProductItem__Info--center wishText">
              <div className="ProductItem__Title u-h4">{item.pName}</div>
              <div
                className="ProductItem__PriceList u-h4"
                style={{ marginBottom: "10px" }}
              >
                <span className="ProductItem__Price Price">
                  $ {getOfferPrice(item?.price, item.offer)}
                </span>
                {item.offer !== 0 && (
                  <span
                    className="ProductItem__Price Price Price--compareAt Text--subdued"
                    data-money-convertible=""
                  >
                    $ {item?.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImageList;
