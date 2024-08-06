import { handleErrorResponse } from "../../common/Script";
import { setSpinnerLoad } from "../Spinner/Slice";
import {
  getAllProductsAPI,
  getCategoriesAPI,
  getPreOrderAPI,
  getSearchAPI,
} from "./Services";
import {
  getAllProducts,
  getCategories,
  getPreOrderList,
  getSearchList,
} from "./Slice";

export function fetchCategories() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(setSpinnerLoad(true));
    try {
      const response = await getCategoriesAPI();
      dispatch(getCategories(response));
      dispatch(setSpinnerLoad(false));
    } catch (error) {
      handleErrorResponse(error);
      dispatch(setSpinnerLoad(false));
    }
  };
}

export const fetchAllProducts = (item: any, template?: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(setSpinnerLoad(true));
    try {
      const response = await getAllProductsAPI(item);

      let newArr = [...response];

      if (template?.color !== undefined) {
        newArr = newArr.filter((x) => x.pcolor.includes(template?.color));
      }
      if (template?.stone !== undefined) {
        newArr = newArr.filter((x) => x.stone.includes(template?.stone));
      }
      if (template?.metal !== undefined) {
        newArr = newArr.filter((x) => x.metal.includes(template?.metal));
      }

      const ProductList = template ? newArr : response;
      dispatch(getAllProducts(ProductList));
      dispatch(setSpinnerLoad(false));
    } catch (error) {
      handleErrorResponse(error);
      dispatch(setSpinnerLoad(false));
    }
  };
};

export const fetchSearchProducts = (item: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(setSpinnerLoad(true));
    try {
      const response = await getSearchAPI(item);
      dispatch(getSearchList(response));
      dispatch(setSpinnerLoad(false));
    } catch (error) {
      handleErrorResponse(error);
      dispatch(setSpinnerLoad(false));
    }
  };
};

export function fetchPreOrderList() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(setSpinnerLoad(true));
    try {
      const response = await getPreOrderAPI();
      dispatch(getPreOrderList(response));
      dispatch(setSpinnerLoad(false));
    } catch (error) {
      handleErrorResponse(error);
      dispatch(setSpinnerLoad(false));
    }
  };
}
