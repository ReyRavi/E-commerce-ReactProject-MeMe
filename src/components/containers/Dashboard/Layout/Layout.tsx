import React from "react";
import { useSelector } from "react-redux";
import { ProfileMenu } from "../../../../constant/Variables";
import { IRootState } from "../../../../redux/reducer/CombineReducer";
import Header from "../../../header/Header.logic";
import MyProfile from "../MyProfile/MyProfile";
import MyAddress from "../MyAddress/MyAddress";
import MyOrders from "../MyOrders/MyOrders";
import ReferandEarn from "../ReferAndEarn/ReferandEarn";
import Subscription from "../Subscription/Subscription";
import "./Layout.scss";

export const Layout = () => {
  const { navData } = useSelector((state: IRootState) => state);
  const selectedView = navData && navData.selectedAccountView;

  const getComponent = (viewName: string) => {
    switch (viewName) {
      case ProfileMenu.MyProfile:
        return <MyProfile />;
      case ProfileMenu.SavedAddress:
        return <MyAddress />;
      case ProfileMenu.Orders:
        return <MyOrders />;
      case ProfileMenu.ReferAndEarn:
        return <ReferandEarn />;
      case ProfileMenu.SubsCribe:
        return <Subscription />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main id="maincontent" className="page-main">
        <div className="columns">{getComponent(selectedView)}</div>
      </main>
    </React.Fragment>
  );
};

export default Layout;
