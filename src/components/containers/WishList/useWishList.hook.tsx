import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { onClick } from "../../../constant/Types";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import { LoggedInUser } from "../../common/Script";
import { AddToCart } from "../../stateContainers/Cart/ThunkActions";
import { IProduct } from "../../../model/IProductType";
import {
  DeleteFavItem,
  GetFavItem,
} from "../../stateContainers/WishList/ThunkActions";

export const useWishList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { favData } = useSelector((state: IRootState) => state);
  const favItems: IProduct[] = favData && favData.getFav;

  const FetchWishList = () => {
    if ((LoggedInUser as string) !== "") {
      dispatch(GetFavItem({ phone: LoggedInUser as string }));
    } else {
      history.push("/login");
    }
  };

  const handleAddToCartClick = (e: onClick, updatedProduct: any) => {
    e.preventDefault();
    dispatch(AddToCart(updatedProduct));
  };

  const handleDeleteClick = (item: any) => {
    dispatch(DeleteFavItem({ id: item }));
  };

  return {
    favData,
    favItems,
    handleAddToCartClick,
    handleDeleteClick,
    FetchWishList,
  };
};
