import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import { SelectedProductSlice } from "../../stateContainers/SelectedProduct/Slice";
import { IProduct } from "../../../model/IProductType";
import { removeChar } from "../../common/Script";

export const usePreOrder = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { navData } = useSelector((state: IRootState) => state);
  const preoders: IProduct[] = navData && navData.PreOrderList;

  const { spinnerData } = useSelector((state: IRootState) => state);
  const isLoading = spinnerData && spinnerData.isLoading;

  const handleProductOnclick = (item: IProduct) => {
    const selectedProductdetails = {
      from: "preorder",
      productDetails: item,
    };
    localStorage.setItem(
      "selected-product",
      JSON.stringify(selectedProductdetails)
    );
    dispatch(
      SelectedProductSlice.actions.setSelectedProduct(selectedProductdetails)
    );
    const str = removeChar(item.pName);
    const url = `info/${str}/${item.mcId}`;
    history.push(url, { from: "PreOrder" });
  };

  return { preoders, isLoading, handleProductOnclick };
};
