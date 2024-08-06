import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useWindowSize } from "../../../hook/useWindowSize.hook";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import Spinner from "../../common/Spinner/Spinner";
import Header from "../../header/Header.logic";
import { getProduct } from "../../stateContainers/SelectedProduct/ThunkAction";
import ProductGallery from "./ProductGallery/ProductGallery";
import ProductInfo from "./ProductInfo/ProductInfo";
import "./SelectedProduct.scss";
import { useSelProduct } from "./useSelProduct.hook";

export const SelectedProduct = () => {
  const [width] = useWindowSize();
  const dispatch = useDispatch();
  const { spinnerData } = useSelector((state: IRootState) => state);
  const isLoading = spinnerData && spinnerData.isLoading;

  const maxWidth = width > 1024 ? "950px" : "800px";

  const { selectedProduct } = useSelProduct();
  const { name, id } = useParams() as any;

  useEffect(() => {
    if (
      selectedProduct === null ||
      Object.entries(selectedProduct).length < 1
    ) {
      dispatch(getProduct({ pId: id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Fragment key={name}>
      <Header />
      <section className="Product Product--large">
        <div className="Product__Wrapper" style={{ minHeight: maxWidth }}>
          <ProductGallery />
          <ProductInfo />
        </div>
      </section>
    </Fragment>
  );
};

export default SelectedProduct;
