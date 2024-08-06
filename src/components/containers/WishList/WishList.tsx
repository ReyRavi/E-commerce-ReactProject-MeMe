import React from "react";
import ImageList from "./ImageList";
import Header from "../../header/Header.logic";
import EmptyWishList from "./EmptyWishList/EmptyWishList";
import { useWishList } from "./useWishList.hook";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import Spinner from "../../common/Spinner/Spinner";
import "./WishList.scss";
import { IProduct } from "../../../model/IProductType";

export const WishList = () => {
  const { favItems } = useWishList();

  const { spinnerData } = useSelector((state: IRootState) => state);
  const isLoading = spinnerData && spinnerData.isLoading;

  const WishListView = () => {
    return (
      <>
        <header className="PageHeader">
          <div className="Container">
            <div className="SectionHeader SectionHeader--center">
              <h1 className="WishListHeading u-h3">My WishList</h1>
            </div>
          </div>
        </header>
        <div className="CollectionMain">
          <div className="CollectionInner">
            <div className="CollectionInner__Products">
              <div className="ProductListWrapper">
                <div
                  className="ProductList ProductList--grid ProductList--removeMargin Grid FavList"
                  data-mobile-count="1"
                  data-desktop-count="4"
                >
                  {favItems.map((item: IProduct, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <ImageList item={item} />
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <section>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : favItems.length > 0 ? (
        <WishListView />
      ) : (
        <EmptyWishList />
      )}
    </section>
  );
};

export default WishList;
