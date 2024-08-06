import React from "react";
import { IAddress } from "../../../../model/IProductType";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import { useAddress } from "../useAddress.hook";

interface IProps {
  item: IAddress;
  toggleUpdateView: () => void;
}

export const AddressWidget: React.FC<IProps> = (props: IProps) => {
  const { item, toggleUpdateView } = props;
  const { addressList, RemoveAddreses, onClickEdit } = useAddress();

  const editedItem = {
    name: item.name,
    phone: item.phone,
    uPhone: addressList.uPhone,
    flatNo: item.flatNo,
    street: item.street,
    landMark: item.landMark,
    city: item.city,
    pin: item.pin,
    addId: item.id,
  };

  return (
    <React.Fragment>
      <span className="font-bold">{item.name}</span>
      <br />
      {item.flatNo}, {item.street}
      <br />
      {item.landMark}
      <br />
      {item.city} - {item.pin}
      <br />
      <span className="font-bold">Phone : {addressList.uPhone}</span>
      <br />
      <div>
        <TextButton
          items="Edit"
          isprimary={true}
          className="action edit-address-link"
          onClick={() => {
            onClickEdit(editedItem, toggleUpdateView);
          }}
        />
        <TextButton
          items="Remove"
          isSecondary={true}
          className="action edit-address-link"
          onClick={() => {
            RemoveAddreses(item.id);
          }}
        />
      </div>
    </React.Fragment>
  );
};
