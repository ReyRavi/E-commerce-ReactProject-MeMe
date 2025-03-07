import React from "react";
import {
  gridViewOne,
  gridViewTwo,
  view1,
  view2,
} from "../../../../../constant/Variables";
import { useWindowSize } from "../../../../../hook/useWindowSize.hook";
import { IProduct } from "../../../../../model/IProductType";
import useProductList from "../../useProductList.hook";
import { ImageView } from "./ImageView";

export const ListView = () => {
  const [width] = useWindowSize();
  const { handleProductOnclick, sortedList } = useProductList();
  const { gridView } = useProductList();

  let initialState = {
    mobileCount: "",
    desktopCount: "",
    GridName: "",
    maxWidth: "",
    aspectRatio: "",
  };

  const [state, setState] = React.useState(initialState);

  const setView = (gridViewOne: any[]) => {
    if (width > 1024) {
      setState(gridViewOne[0]);
    }
    if (width > 641) {
      setState(gridViewOne[1]);
    }
    if (width < 641) {
      setState(gridViewOne[2]);
    }
  };

  React.useEffect(() => {
    if (gridView.key === view1.key) setView(gridViewOne);
    if (gridView.key === view2.key) setView(gridViewTwo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, gridView]);

  const imageView = () => {
    return [...sortedList]?.map((item: IProduct, index: number) => {
      let productView = item?.productImages?.length > 0 && (
        <ImageView
          key={index}
          gridName={state.GridName}
          url={item.imageurl || item.productImages[0]?.imageUrl}
          name={item.pName}
          price={item.price}
          offer={item.offer}
          item={item}
          handleProductOnclick={handleProductOnclick}
        />
      );
      return productView;
    });
  };

  return (
    <div className="CollectionInner__Products" style={{ width: "100%" }}>
      <div className="ProductListWrapper">
        <div
          className="ProductList ProductList--grid ProductList--removeMargin Grid"
          data-mobile-count={state.mobileCount}
          data-desktop-count={state.desktopCount}
        >
          {imageView()}
        </div>
      </div>
    </div>
  );
};
