import React from "react";
import { useDispatch } from "react-redux";
import { onChange, onClick } from "../../../constant/Types";
import { SubscriptionServices } from "../../../utils/API";
import { addNotification } from "../../stateContainers/Toast/Slice";
import { validateEmailId } from "../../UserAccount/Script";

function useSubscribe() {
  const [email, setEmail] = React.useState<string>("");

  const handleOnChange = (e: onChange) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const dispatch = useDispatch();

  const Notify = (text: string) => {
    dispatch(addNotification({ isOpen: true, text: text }));
    setTimeout(() => {
      dispatch(addNotification({ isOpen: false, text: "" }));
    }, 2000);
  };

  const handleSubscribe = (e: onClick) => {
    e.preventDefault();
    const isValidEmailId = validateEmailId(email);
    if (isValidEmailId.formIsValid) {
      SubscriptionServices.NewsLetter({ email: email })
        .then((res: any) => {
          Notify("Successfully Added");
        })
        .catch((error: any) => {
          Notify("Something Went Wrong");
        });
    } else {
      Notify(isValidEmailId.error);
    }
  };

  return {
    email,
    handleOnChange,
    handleSubscribe,
  };
}

export default useSubscribe;
