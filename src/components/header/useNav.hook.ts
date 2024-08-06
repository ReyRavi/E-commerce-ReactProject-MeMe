import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRootState } from "../../redux/reducer/CombineReducer";
import { ICategory, ISubCategory } from "../stateContainers/NavState/Types";
import { fetchAllProducts } from "../stateContainers/NavState/ThunkActions";
import { NavSLice } from "../stateContainers/NavState/Slice";
import { useNavInfoContext } from "../../react-context/NavContext";

export type productType = {
  mCategory: string;
  sCategory: string[];
  indexValue?: number;
  open?: boolean;
};

export const useNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { navData } = useSelector((state: IRootState) => state);
  const categories = navData && navData.categories;
  const { isVisibleMenu, MenuIconClick } = useNavInfoContext();
  const [Products, setProducts] = React.useState<productType[]>([]);

  React.useEffect(() => {
    const getOrderValues = () => {
      return categories?.map((item: ICategory, index: number) => {
        return {
          mCategory: item.mainCatName,
          sCategory: item.categories.map((item: ISubCategory) => {
            return item.cName;
          }),
          indexValue: index,
          open: false,
        };
      });
    };

    if (categories.length > 0) {
      const product = getOrderValues();
      setProducts(product);
    } else return;
  }, [categories]);

  const SubMenuHandleClick = (mCategory: string, subCategory: string) => {
    const mtName: any = {
      mt: mCategory,
      st: subCategory,
    };
    dispatch(fetchAllProducts(mtName));
    dispatch(
      NavSLice.actions.setSelectedCategory({ mc: mCategory, sc: subCategory })
    );
    if (isVisibleMenu) {
      MenuIconClick();
    }
    history.push("/list");
  };

  const MenuItemHandleClick = (mCategory: string) => {
    const mtName: any = {
      mt: mCategory,
    };
    dispatch(fetchAllProducts(mtName));
    dispatch(NavSLice.actions.setSelectedCategory({ mc: mCategory, sc: "" }));

    if (isVisibleMenu) {
      MenuIconClick();
    }
    history.push("/list");
  };
  const handlePreOrderClick = () => {
    if (isVisibleMenu) {
      MenuIconClick();
    }
    history.push("/preorder", { from: "HomePage" });
  };
  const handleExpandClick = (key: number) => {
    const newProducts = Products.map((item: any, sidx: number) => {
      const openValue = item.open;
      if (key !== sidx) {
        return item;
      }
      return {
        ...item,
        open: !openValue,
      };
    });
    setProducts(newProducts);
  };

  return {
    Products,
    handleExpandClick,
    SubMenuHandleClick,
    handlePreOrderClick,
    MenuItemHandleClick,
  };
};
