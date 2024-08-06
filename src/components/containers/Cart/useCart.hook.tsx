import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ICartItemResponse, IProduct } from "../../../model/IProductType";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import { LoggedInUser } from "../../common/Script";
import {
  AddToCart,
  DeleteAllCart,
  DeleteCart,
  ViewCart,
} from "../../stateContainers/Cart/ThunkActions";
import { AddFavItem } from "../../stateContainers/WishList/ThunkActions";
import { useWishList } from "../WishList/useWishList.hook";

export const useCart = () => {
  //Types
  interface IVIEWCART {
    cusId: string;
  }

  interface IDELETEITEM {
    id: number;
  }

  interface IDELETECART {
    cusId: string;
  }

  // Customer Id
  const UserId: IVIEWCART | IDELETECART = {
    cusId: LoggedInUser as string,
  };

  //Redux Value

  const dispatch = useDispatch();
  const { cartData } = useSelector((state: IRootState) => state);
  const viewCart = cartData && cartData.viewCartItem;
  const isAddedToCart = cartData && cartData.addItem;

  const { favItems } = useWishList();

  let result =
    viewCart.cartItem &&
    viewCart.cartItem.filter((item1: ICartItemResponse) =>
      favItems.some(
        (item2: IProduct) => item1.productInfo.productCode === item2.mcId
      )
    );

  const productCodes =
    result &&
    result.map((item: ICartItemResponse) => item.productInfo.productCode);

  // updated Data
  const { selectedProductData } = useSelector((state: IRootState) => state);
  const updatedProduct =
    selectedProductData && selectedProductData.updatedProduct;

  // CartItem
  const FetchCartData = async () => {
    dispatch(ViewCart(UserId));
  };

  const handleDeleteItem = async (id: IDELETEITEM) => {
    dispatch(DeleteCart(id));
  };

  const handleDeleteAll = async () => {
    dispatch(DeleteAllCart(UserId));
  };

  const AddItemToCart = async (item: any) => {
    dispatch(AddToCart(updatedProduct));
  };

  // TextNote

  let value = localStorage.getItem("note");

  const [note, setNote] = useState(value ? value : "");

  const handleSaveNote = (e: any) => {
    e.preventDefault();
  };

  const onSaveChange = (e: any) => {
    e.preventDefault();
    setNote(e.target.value);
  };

  const handleClearNote = (e: any) => {
    e.preventDefault();
    setNote("");
  };

  React.useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);

  const history = useHistory();

  const handleOnClickCheckOut = () => {
    history.push("/address");
  };

  // Add To WishList

  const FavIconOnclick = (id: number) => {
    const item = {
      phone: LoggedInUser as string,
      pId: id,
    };

    dispatch(AddFavItem(item));
  };

  return {
    FetchCartData,
    viewCart,
    handleDeleteItem,
    handleDeleteAll,
    handleSaveNote,
    handleClearNote,
    note,
    onSaveChange,
    AddItemToCart,
    handleOnClickCheckOut,
    FavIconOnclick,
    isAddedToCart,
    productCodes,
    result,
  };
};
