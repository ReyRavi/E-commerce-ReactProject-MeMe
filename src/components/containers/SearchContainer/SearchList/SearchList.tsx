import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { onClick } from "../../../../constant/Types";
import useSearch from "../../../header/SearchBox/useSearch.hook";
import { SelectedProductSlice } from "../../../stateContainers/SelectedProduct/Slice";
import { IProduct } from "../../../../model/IProductType";
import { getOfferPrice, removeChar } from "../../../common/Script";

function SearchList() {
  const { searchList } = useSearch();
  const dispatch = useDispatch();
  const history = useHistory();

  // Image OnClick
  const handleProductOnclick = (e: onClick, item: IProduct) => {
    e.preventDefault();

    const selectedProduct = {
      from: "list",
      productDetails: item,
    };
    localStorage.setItem("selected-product", JSON.stringify(selectedProduct));
    dispatch(SelectedProductSlice.actions.setSelectedProduct(selectedProduct));
    const str = removeChar(item.pName);
    const url = `info/${str}/${item.mcId}`;
    history.push(url, { from: "PreOrder" });
  };

  return (
    <>
      <header className="SearchPageHeader">
        <div className="Container">
          <div className="SectionHeader SectionHeader--center">
            <h1 className="WishListHeading u-h3">
              Search Results ( {searchList?.length} )
            </h1>
          </div>
        </div>
      </header>
      <div className="SearchCollectionInner">
        <div className="CollectionInner__Products">
          <div className="ProductListWrapper">
            <div
              className="ProductList ProductList--grid ProductList--removeMargin Grid"
              data-mobile-count="2"
              data-desktop-count="4"
            >
              {searchList.map((item: IProduct) => {
                return (
                  <div className="Grid__Cell 1/2--phone 1/3--tablet-and-up 1/4--desk">
                    <div
                      className="ProductItem"
                      onClick={(e: onClick) => handleProductOnclick(e, item)}
                    >
                      <div className="ProductItem__Wrapper">
                        <div className="ProductItem__ImageWrapper">
                          <div className="AspectRatio AspectRatio--square P2-square">
                            <img
                              className="ProductItem__Image"
                              src={item.imageurl}
                              alt="name"
                            />
                          </div>
                        </div>

                        <div className="ProductItem__Info u-h4">
                          <div className="Product__title">
                            <p>{item.pName}</p>
                          </div>
                          <div className="Product__price">
                            <span className="original__Price">
                              $ {getOfferPrice(item.price, item.offer)}
                            </span>
                            {item.offer !== 0 && (
                              <span className="offer__Price">
                                $ {item.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchList;
