import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes as RoutedComponent } from "../routes/Index";
import Toast from "../components/common/Toast/Toast";
import { IRootState } from "../redux/reducer/CombineReducer";
import { IgetProfile } from "../components/stateContainers/Profile/Services";
import { LoggedInUser } from "../components/common/Script";
import { fetchCategories } from "../components/stateContainers/NavState/ThunkActions";
import { fetchSlidersList } from "../components/stateContainers/Sliders/ThunkAction";
import { getProfileDetails } from "../components/stateContainers/Profile/ThunkAction";
import { useCart } from "../components/containers/Cart/useCart.hook";
import { useWishList } from "../components/containers/WishList/useWishList.hook";

/**
 * Responsible for rendering the component as per route path
 */

export const Layout: React.FC = () => {
  const dispatch = useDispatch();

  const { toastData } = useSelector((state: IRootState) => state);
  const openToast = toastData && toastData.notifications.isOpen;
  const text = toastData && toastData.notifications.text;

  const { FetchCartData } = useCart();
  const { FetchWishList } = useWishList();

  const item: IgetProfile = {
    phone: LoggedInUser as string,
  };

  React.useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(fetchSlidersList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(getProfileDetails(item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (LoggedInUser !== null) {
      FetchCartData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (LoggedInUser !== null) {
      FetchWishList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RoutedComponent />
      {openToast && <Toast openToast={openToast} message={text} />}
    </>
  );
};
