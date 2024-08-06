import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SORT } from "../../../constant/Variables";
import { IProduct } from "../../../model/IProductType";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import { removeChar } from "../../common/Script";
import { fetchAllProducts } from "../../stateContainers/NavState/ThunkActions";
import { ICategory, ISubCategory } from "../../stateContainers/NavState/Types";
import { ProductListSlice } from "../../stateContainers/ProductListState/Slice";
import { IView } from "../../stateContainers/ProductListState/Types";
import { SelectedProductSlice } from "../../stateContainers/SelectedProduct/Slice";

export default function useProductList() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Values From Redux
  const { navData } = useSelector((state: IRootState) => state);
  const productList = navData && navData.allProducts;
  const selectedCategory = navData && navData.selectedCategory;
  const categories = navData && navData.categories;

  const { productListData } = useSelector((state: IRootState) => state);
  const gridView = productListData && productListData.gridView;
  const sortedList = productListData && productListData.sortedList;
  const colors = productListData && productListData.colors;
  const stones = productListData && productListData.stones;
  const metals = productListData && productListData.metals;
  const selectedId = productListData && productListData.selectedListId;
  const selectedColor = productListData && productListData.selectedColorId;
  const selectedMetal = productListData && productListData.selectedMetal;
  const selectedStone = productListData && productListData.selectedStone;

  React.useEffect(() => {
    dispatch(ProductListSlice.actions.setSortedList(productList as IProduct[]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productList]);

  const GetAlphabeticalOrderList = (): IProduct[] => {
    return [...productList].sort((a: IProduct, b: IProduct) =>
      a.pName.localeCompare(b.pName)
    );
  };

  const GetPriceOrderList = (): IProduct[] => {
    return [...productList].sort(
      (a: IProduct, b: IProduct) => a.price - b.price
    );
  };

  // Sort Handler
  const isSortEnabled = productListData && productListData.isSortEnabled;
  const handleSortIconClick = () => {
    dispatch(ProductListSlice.actions.setSortVisibility(!isSortEnabled));
  };

  const handleSort = (item: string) => {
    let list;
    switch (item) {
      case SORT.AlPHABET: {
        list = GetAlphabeticalOrderList();
        break;
      }
      case SORT.REVERSEALPHABET: {
        list = GetAlphabeticalOrderList().reverse();
        break;
      }
      case SORT.HIGHTOLOW: {
        list = GetPriceOrderList().reverse();
        break;
      }
      case SORT.LOWTOHIGH: {
        list = GetPriceOrderList();
        break;
      }
      default:
        list = productList;
        break;
    }
    dispatch(ProductListSlice.actions.setSortedList(list));
    setTimeout(() => {
      handleSortIconClick();
    }, 1000);
  };

  const selectedCategoryItems = () => {
    const item = categories.find((item: ICategory) => {
      return item.mainCatName === selectedCategory.mc;
    });
    return item;
  };

  // Filters
  const getFilters = () => {
    const item = selectedCategoryItems();
    const subList = item?.categories.map((item: ISubCategory) => item.cName);
    return subList;
  };

  //Toggle Filter Inner
  const filterInnerEnabled =
    productListData && productListData.toggleFilterInner;
  const toggleFilterClick = () => {
    dispatch(
      ProductListSlice.actions.settoggleFilterInner(!filterInnerEnabled)
    );
  };

  // Filter List Selector

  const handleSelectedItemClick = (id: number) => {
    if (selectedId === id) {
      dispatch(ProductListSlice.actions.setSelectedListId(undefined));
    } else {
      dispatch(ProductListSlice.actions.setSelectedListId(id));
    }
  };

  const handleSelectedColorClick = (color: string) => {
    if (selectedColor === color) {
      dispatch(ProductListSlice.actions.setSelectedColorId(undefined));
    } else {
      dispatch(ProductListSlice.actions.setSelectedColorId(color));
    }
  };

  const handleSelectedStoneClick = (stone: string) => {
    if (selectedStone === stone) {
      dispatch(ProductListSlice.actions.setSelectedStone(undefined));
    } else {
      dispatch(ProductListSlice.actions.setSelectedStone(stone));
    }
  };

  const handleSelectedMetalClick = (metal: string) => {
    if (selectedMetal === metal) {
      dispatch(ProductListSlice.actions.setSelectedMetal(undefined));
    } else {
      dispatch(ProductListSlice.actions.setSelectedMetal(metal));
    }
  };

  const MenuApplyHandleClick = () => {
    if (selectedId !== undefined) {
      const subCategory = getFilters();
      const sCategory = subCategory?.find(
        (item: any, index: number) => index === selectedId
      );
      const mtName: any = {
        mt: selectedCategory.mc,
        st: sCategory,
      };

      if (
        selectedColor !== undefined ||
        selectedMetal !== undefined ||
        selectedStone !== undefined
      ) {
        const template = {
          color: selectedColor,
          metal: selectedMetal,
          stone: selectedStone,
        };

        dispatch(fetchAllProducts(mtName, template as any));
      } else {
        dispatch(fetchAllProducts(mtName));
      }
    }

    if (selectedId === undefined) {
      let newArr = [...productList];

      if (selectedColor !== undefined) {
        newArr = newArr.filter((x) => x.pcolor.includes(selectedColor));
      }
      if (selectedStone !== undefined) {
        newArr = newArr.filter((x) => x.stone.includes(selectedStone));
      }
      if (selectedMetal !== undefined) {
        newArr = newArr.filter((x) => x.metal.includes(selectedMetal));
      }

      dispatch(ProductListSlice.actions.setSortedList(newArr));
    }

    if (isRightViewEnabled) {
      handleRightViewVisibility();
    }
  };

  const resetButtonOnClick = () => {
    const mtName: any = {
      mt: selectedCategory.mc,
    };
    dispatch(ProductListSlice.actions.setSelectedListId(undefined));
    dispatch(ProductListSlice.actions.setSelectedColorId(undefined));
    dispatch(ProductListSlice.actions.setSelectedMetal(undefined));
    dispatch(ProductListSlice.actions.setSelectedStone(undefined));
    dispatch(fetchAllProducts(mtName));

    if (isRightViewEnabled) {
      handleRightViewVisibility();
    }
  };

  //Right View Filter List Selector
  const isRightViewEnabled =
    productListData && productListData.isRightviewEnabled;

  const handleRightViewVisibility = () => {
    dispatch(
      ProductListSlice.actions.setRightFilterVisibility(!isRightViewEnabled)
    );
  };

  // Grid View Controller
  const handleGridView = (view: IView) => {
    dispatch(ProductListSlice.actions.setgridView(view));
  };

  const getActiveGridView = (view: IView) => {
    const activeClass =
      gridView.key === view.key ? "layout-type is-active" : "layout-type";
    return activeClass;
  };

  // Image OnClick
  const handleProductOnclick = (item: IProduct) => {
    const selectedProduct = {
      from: "list",
      productDetails: item,
    };
    dispatch(SelectedProductSlice.actions.setSelectedProduct(selectedProduct));
    localStorage.setItem("selected-product", JSON.stringify(selectedProduct));
    const str = removeChar(item.pName);
    const url = `info/${str}/${item.mcId}`;
    history.push(url, { from: "list" });
  };

  return {
    isSortEnabled,
    handleSortIconClick,
    selectedId,
    handleSelectedItemClick,
    resetButtonOnClick,
    isRightViewEnabled,
    handleRightViewVisibility,
    filterInnerEnabled,
    toggleFilterClick,
    gridView,
    handleGridView,
    getActiveGridView,
    productList,
    selectedCategory,
    getFilters,
    handleProductOnclick,
    MenuApplyHandleClick,
    sortedList,
    handleSort,
    categories,
    colors,
    selectedColor,
    handleSelectedColorClick,
    stones,
    metals,
    handleSelectedStoneClick,
    handleSelectedMetalClick,
    selectedMetal,
    selectedStone,
    selectedCategoryItems,
  };
}
