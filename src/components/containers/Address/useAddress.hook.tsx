import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { onChange, onClick } from "../../../constant/Types";
import { IAddress } from "../../../model/IProductType";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import { LoggedInUser } from "../../common/Script";
import { IAddAddress } from "../../stateContainers/Address/Service";
import {
  SetEditedAddress,
  SetSelecteddAddress,
} from "../../stateContainers/Address/Slice";
import {
  addUserAddress,
  deleteUserAddress,
  getUserAddressList,
  updateUserAddress,
} from "../../stateContainers/Address/ThunkAction";
import { addNotification } from "../../stateContainers/Toast/Slice";
import { validateEmailId, validateName } from "../../UserAccount/Script";

export const useAddress = () => {
  const { addressData } = useSelector((state: IRootState) => state);
  const addressList = addressData && addressData.addressList;
  const editedAddress = addressData && addressData.EditedAddress;

  const dispatch = useDispatch();
  const history = useHistory();

  const { profileData } = useSelector((state: IRootState) => state);
  const userId = profileData && profileData.profileDetails.Profile.userid;

  const [openUpdateView, setOpenUpdateView] = React.useState(false);

  const toggleUpdateView = () => {
    setOpenUpdateView(!openUpdateView);
  };

  const [selected, setSelected] = React.useState(0);

  const handleClick = (no: number) => {
    setSelected(no);
  };

  const item = {
    phone: LoggedInUser as string,
  };

  // Form Validation

  const initialState = {
    name: "",
    phone: "",
    flatNo: "",
    street: "",
    landMark: "",
    city: "",
    pin: "",
  };

  const initialValues = editedAddress ? editedAddress : initialState;

  const [state, setState] = React.useState<any>(initialValues);
  const [error, setError] = React.useState<string | null>();
  const [visible, setVisible] = React.useState(false);

  // API Calls

  const fetchAddreses = () => {
    dispatch(getUserAddressList(item));
  };

  const RemoveAddreses = (num: number) => {
    dispatch(deleteUserAddress({ id: num }));
  };

  const addAddress = () => {
    let updatedResult = {
      ...state,
      userid: userId,
    };
    dispatch(addUserAddress(updatedResult));
  };

  const updateAddress = () => {
    let updatedResult = {
      ...state,
      userid: userId,
    };
    dispatch(updateUserAddress(updatedResult));
  };

  const handleOnChange = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
    setVisible(false);
    setError(null);
  };

  React.useEffect(() => {
    if (!error) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [error]);

  const validate = () => {
    let fields = state;
    let errors = "";
    let formIsValid = true;

    const isValidName = validateName(fields.name, "name");
    const isValidEmail = validateEmailId(fields.phone);

    if (
      fields.flatNo === "" ||
      fields.street === "" ||
      fields.city === "" ||
      fields.landMark === "" ||
      fields.pin === ""
    ) {
      errors = "Please enter all the fields";
      formIsValid = false;
    } else if (formIsValid && !isValidName.formIsValid) {
      errors = isValidName.error;
      formIsValid = false;
    } else if (formIsValid && !isValidEmail.formIsValid) {
      errors = isValidEmail.error;
      formIsValid = false;
    } else {
      errors = "";
      formIsValid = true;
    }
    setError(errors);
    return formIsValid;
  };

  const handleOnSubmit = (e: onClick) => {
    e.preventDefault();

    if (validate()) {
      if (editedAddress.addId) {
        updateAddress();
      } else {
        addAddress();
      }
    } else {
      setVisible(true);
    }
  };

  const onClickEdit = (item: any, toggleUpdateView: any) => {
    dispatch(SetEditedAddress(item));
    toggleUpdateView();
  };

  const onClickCancel = (toggleUpdateView: any) => {
    dispatch(SetEditedAddress({} as IAddAddress));
    toggleUpdateView();
  };

  const onAddNewCancel = (toggleUpdateView: any) => {
    dispatch(SetEditedAddress({} as IAddAddress));
    toggleUpdateView();
  };

  const onAddNewAdd = (e: onClick, toggleUpdateView: any) => {
    e.preventDefault();
    dispatch(SetEditedAddress({} as IAddAddress));
    toggleUpdateView();
  };

  const continuePaymentClick = () => {
    const selectedAddress = addressList.address.find(
      (item: IAddress, index: number) => index === selected
    );
    const AddressItem = {
      address: selectedAddress as IAddress,
      uName: addressList.uName,
      uPhone: addressList.uPhone,
      userid: addressList.userid,
    };

    if (AddressItem.address) {
      dispatch(SetSelecteddAddress(AddressItem));
      history.push("/pay");
    } else {
      dispatch(addNotification({ isOpen: true, text: "Add your Address" }));

      setTimeout(() => {
        dispatch(addNotification({ isOpen: false, text: "" }));
      }, 3000);
    }
  };

  return {
    fetchAddreses,
    addressList,
    selected,
    handleClick,
    RemoveAddreses,
    openUpdateView,
    toggleUpdateView,
    state,
    error,
    visible,
    handleOnChange,
    handleOnSubmit,
    onClickEdit,
    onClickCancel,
    onAddNewCancel,
    continuePaymentClick,
    onAddNewAdd,
  };
};
