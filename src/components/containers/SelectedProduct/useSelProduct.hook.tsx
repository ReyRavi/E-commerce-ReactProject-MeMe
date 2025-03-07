import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClick } from "../../../constant/Types";
import { IProductImage, IProduct } from "../../../model/IProductType";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import { LoggedInUser } from "../../common/Script";
import { AddToCart } from "../../stateContainers/Cart/ThunkActions";
import { SelectedProductSlice } from "../../stateContainers/SelectedProduct/Slice";
import { ISelectedProduct } from "../../stateContainers/SelectedProduct/Types";
import { addNotification } from "../../stateContainers/Toast/Slice";
import { AddFavItem } from "../../stateContainers/WishList/ThunkActions";
import { useWishList } from "../WishList/useWishList.hook";

export const useSelProduct = () => {
  const { selectedProductData } = useSelector((state: IRootState) => state);
  const Dispatch = useDispatch();

  const { favItems } = useWishList();

  // Selected Product
  const selectedData =
    selectedProductData && selectedProductData.selectedProduct;

  const selectedPdt = JSON.parse(
    localStorage.getItem("selected-product") as any
  );

  const selectedProduct: ISelectedProduct = selectedPdt;

  const productDetails = selectedProduct.productDetails;
  const updatedProduct =
    selectedProductData && selectedProductData.updatedProduct;

  const isFavProduct =
    favItems &&
    favItems.find(
      (item: IProduct) => item.mcId === selectedProduct.productDetails.mcId
    );

  //Fav Product

  const FavIconOnclick = (e: onClick) => {
    e.preventDefault();
    const item = {
      phone: LoggedInUser as string,
      pId: productDetails.mcId,
    };
    if (LoggedInUser !== null) {
      Dispatch(AddFavItem(item));
    } else {
      Dispatch(addNotification({ isOpen: true, text: "Login" }));

      setTimeout(() => {
        Dispatch(addNotification({ isOpen: false, text: "" }));
      }, 2000);
    }
  };

  //Images
  const { productImages: images } = productDetails;
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [activeImage, setActiveImage] = React.useState("");

  const handleDotsClick = (index: number) => {
    setActiveIndex(index);
  };

  const selectedImageUrl = () => {
    const image = images.find(
      (item: IProductImage, index: number) => index === activeIndex
    );
    setActiveImage(image?.imageUrl as string);
  };

  const [length, setLength] = useState(images?.length);

  React.useEffect(() => {
    setLength(images?.length);
  }, [images]);

  const next = () => {
    if (activeIndex < length - 1) {
      setActiveIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevState) => prevState - 1);
    }
  };

  // Cart Button
  const buttonName: any =
    selectedProduct.from === "preorder" ? "Pre Order" : "Add To Cart";

  // Fav Button
  const FavIconName =
    isFavProduct !== undefined ? "In WishList" : "Add To WishList";

  const [disableFav, setDisableFav] = React.useState(false);

  React.useEffect(() => {
    if (isFavProduct !== undefined) {
      setDisableFav(true);
    } else {
      setDisableFav(false);
    }
  }, [isFavProduct]);

  const countValue =
    selectedProduct.from === "preorder"
      ? selectedProduct.productDetails.minqty
      : 1;

  const initialState = {
    count: countValue,
    size:
      productDetails.productSize.length > 0
        ? productDetails.productSize[0].psize
        : "",
    color: "",
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "increment":
        return { ...state, count: state.count + 1 };
      case "decrement":
        return {
          ...state,
          count: state.count > 1 ? state.count - 1 : state.count,
        };
      case "color":
        return {
          ...state,
          color: action.payload,
        };
      case "size":
        return {
          ...state,
          size: action.payload,
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  let count = state.count;
  let size = state.size;

  const handleIncrement = () => {
    dispatch({ type: "increment" });
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  };

  const handleSizeChange = (size: string) => {
    dispatch({ type: "size", payload: size });
  };

  const handleColorChange = (color: string) => {
    dispatch({ type: "color", payload: color });
  };

  React.useEffect(() => {
    let updatedPreOrderedItem = { ...updatedProduct };
    updatedPreOrderedItem = {
      productId: selectedProduct.productDetails?.mcId as number,
      qty: state.count,
      cusId: LoggedInUser as string,
      size: state.size,
    };
    Dispatch(
      SelectedProductSlice.actions.setUpdatedProduct(updatedPreOrderedItem)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleButtonClick = () => {
    if (LoggedInUser !== null) {
      Dispatch(AddToCart(updatedProduct));
    } else {
      Dispatch(addNotification({ isOpen: true, text: "Login" }));

      setTimeout(() => {
        Dispatch(addNotification({ isOpen: false, text: "" }));
      }, 2000);
    }
  };

  return {
    selectedProduct,
    productDetails,
    count,
    handleIncrement,
    handleDecrement,
    images,
    activeIndex,
    activeImage,
    selectedImageUrl,
    handleDotsClick,
    buttonName,
    size,
    handleSizeChange,
    handleColorChange,
    handleButtonClick,
    FavIconOnclick,
    FavIconName,
    disableFav,
    next,
    prev,
    selectedData,
  };
};
