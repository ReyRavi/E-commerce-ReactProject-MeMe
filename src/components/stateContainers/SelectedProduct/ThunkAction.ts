import { setSpinnerLoad } from "../Spinner/Slice";
import { showProductService } from "./Services";
import { SelectedProductSlice } from "./Slice";

export const getProduct = (item: any) => {
  return async (dispatch: any, _getState: any) => {
    dispatch(setSpinnerLoad(true));
    showProductService(item)
      .then((res) => {
        const selectedProduct = {
          from: "list",
          productDetails: res,
        };
        dispatch(
          SelectedProductSlice.actions.setSelectedProduct(selectedProduct)
        );
        localStorage.setItem(
          "selected-product",
          JSON.stringify(selectedProduct)
        );
        dispatch(setSpinnerLoad(false));
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setSpinnerLoad(false));
      });
  };
};
