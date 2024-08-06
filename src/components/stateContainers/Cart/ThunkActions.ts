import { LoggedInUser } from "../../common/Script";
import { setSpinnerLoad } from "../Spinner/Slice";
import { addNotification } from "../Toast/Slice";
import {
  addCartService,
  deleteAllCartService,
  deleteCartService,
  viewCartService,
} from "./Service";
import { addCartItem, getViewCartItem } from "./Slice";

export const ViewCart = (UserId: any) => {
  return async (dispatch: any, _getState: any) => {
    dispatch(setSpinnerLoad(true));
    viewCartService(UserId)
      .then((res) => {
        dispatch(getViewCartItem(res));
        dispatch(setSpinnerLoad(false));
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setSpinnerLoad(false));
      });
  };
};

export const AddToCart = (item: any) => {
  return async (dispatch: any, _getState: any) => {
    try {
      const response: any = await addCartService(item);
      if (response === 200) {
        dispatch(addNotification({ isOpen: true, text: "Added To Cart" }));
        dispatch(ViewCart({ cusId: LoggedInUser as string }));
        setTimeout(() => {
          dispatch(addNotification({ isOpen: false, text: "" }));
        }, 500);
      }
    } catch (error) {
      dispatch(addCartItem(false));
    }
  };
};

export const DeleteCart = (id: any) => {
  return async (dispatch: any, _getState: any) => {
    deleteCartService(id)
      .then((_res) => {
        // window.location.reload();
        dispatch(addNotification({ isOpen: true, text: "Removed From Cart" }));
        dispatch(ViewCart({ cusId: LoggedInUser as string }));
        setTimeout(() => {
          dispatch(addNotification({ isOpen: false, text: "" }));
        }, 500);
      })
      .catch((error) => {
        console.log("Error - ", error);
      });
  };
};

export const DeleteAllCart = (id: any) => {
  return async (dispatch: any, _getState: any) => {
    deleteAllCartService(id)
      .then((_res) => {
        // window.location.reload();
        dispatch(
          addNotification({ isOpen: true, text: "Removed All Cart Items" })
        );
        dispatch(ViewCart({ cusId: LoggedInUser as string }));
        setTimeout(() => {
          dispatch(addNotification({ isOpen: false, text: "" }));
        }, 500);
      })
      .catch((error) => {
        console.log("Error - ", error);
      });
  };
};
