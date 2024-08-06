import React from "react";
import { useDispatch } from "react-redux";
import { onClick } from "../../../../constant/Types";
import { ICartItemResponse } from "../../../../model/IProductType";
import { CloseIcon, WishList } from "../../../common/Icons";
import { QuantitySelector } from "../../../common/QuantitySelector/QuantitySelector";
import { LoggedInUser } from "../../../common/Script";
import { SelectedProductSlice } from "../../../stateContainers/SelectedProduct/Slice";
import { useCart } from "../useCart.hook";

interface IProps {
  item: ICartItemResponse;
}

export const CartBody: React.FC<IProps> = (props: IProps) => {
  const { item } = props;
  const code = item.productInfo.productCode;

  const { handleDeleteItem, FavIconOnclick, productCodes } = useCart();

  const [count, setCount] = React.useState<number>(item.productInfo?.qty);

  let updateAccount = {
    productId: item.productInfo?.productCode,
    qty: count,
    cusId: LoggedInUser as string,
    size: item.productInfo?.size,
  };
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(SelectedProductSlice.actions.setUpdatedProduct(updateAccount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const [includes, setIncludes] = React.useState(false);

  React.useEffect(() => {
    if (productCodes.includes(code)) {
      setIncludes(true);
    } else {
      setIncludes(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCodes]);

  const Name = includes ? "Saved To Wishlist" : "Save To Wishlist";

  const handleFavIconClick = (e: onClick) => {
    e.preventDefault();
    if (!includes) {
      FavIconOnclick(item.productInfo.productCode);
    } else return;
  };

  const ProductDetails = () => {
    return (
      <div className="cart-item-details-info">
        <div className="product-item-details">
          <strong className="product-item-name">
            {item.productInfo?.productName}
          </strong>

          <dl className="item-options">
            <dt>Size</dt>
            <dd>
              {item.productInfo?.size ? item.productInfo?.size : "One Size"}
            </dd>
          </dl>
        </div>
        <div className="item-options">
          <span className="price-title">Price:</span>
          <span className="item-price">
            $ {item.productInfo?.price.toFixed(2)}
          </span>
        </div>

        <button
          className="cart-item-action"
          onClick={handleFavIconClick}
          disabled={includes}
        >
          <span className="action-towishlist">
            <WishList
              height={15}
              width={15}
              addtoWishList={true}
              fill={includes}
            />
          </span>
          <span className="towishlist u-h5">{Name}</span>
        </button>
      </div>
    );
  };

  const Quantity = () => {
    return (
      <td className="col qty">
        <QuantitySelector
          count={count}
          handleDecrement={(prevCount: number) => {
            if (prevCount > 1) {
              setCount(prevCount - 1);
            }
          }}
          handleIncrement={(prevCount: number) => {
            setCount(prevCount + 1);
          }}
          classname="customqty"
        />
      </td>
    );
  };

  const RemoveItem = () => {
    return (
      <td colSpan={4}>
        <div
          className="cart-actions-toolbar"
          onClick={() => {
            handleDeleteItem({ id: item.productInfo.cartId });
          }}
        >
          <CloseIcon classname="remove-icon" />
        </div>
      </td>
    );
  };

  return (
    <tbody className="cart item u-h5">
      <tr className="item-info">
        <td className="col item">
          <div className="product-image-container CartItem__ImageWrapper AspectRatio">
            <div className="AspectRatio" style={{ aspectRatio: "0.8" }}>
              <img
                alt=""
                className="CartItem__Image Image--lazyLoaded"
                src={item.productInfo?.imageurl}
              />
            </div>
          </div>
        </td>
        <td data-th="Description" className="col item dec">
          <ProductDetails />
        </td>
        <Quantity />
        <td className="col subtotal" data-th="Subtotal">
          <span className="price">$ {item.subTotal.toFixed(2)}</span>
        </td>
        <RemoveItem />
      </tr>
    </tbody>
  );
};
