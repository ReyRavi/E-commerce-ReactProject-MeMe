import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import Spinner from "../../common/Spinner/Spinner";
import Header from "../../header/Header.logic";
import {
  getColorsDetails,
  getMetalDetails,
  getStoneDetails,
} from "../../stateContainers/ProductListState/ThunkAction";
import { Collections } from "./Collections/Collections";
import FilterDrawer from "./Collections/FilterDrawer/FilterDrawer";
import { SortPopover } from "./SortPopover/SortPopover";
import { Title } from "./TitleBar/Title";
import { Toolbar } from "./Toolbar/Toolbar";
import useProductList from "./useProductList.hook";
import "./ProductList.scss";

export const ProductList = () => {
  const { isSortEnabled, isRightViewEnabled } = useProductList();
  const { spinnerData } = useSelector((state: IRootState) => state);
  const isLoading = spinnerData && spinnerData.isLoading;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getColorsDetails());
    dispatch(getStoneDetails());
    dispatch(getMetalDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <section
          data-section-id="collection-template"
          data-section-type="collection"
          className="container__main"
        >
          <Title />
          <Toolbar />
          {isRightViewEnabled && <FilterDrawer />}
          {isSortEnabled && <SortPopover />}
          <Collections />
        </section>
      )}
    </React.Fragment>
  );
};

export default ProductList;
