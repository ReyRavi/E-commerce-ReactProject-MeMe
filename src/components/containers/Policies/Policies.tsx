import React from "react";
import { useSelector } from "react-redux";
import { Footer } from "../../FooterContainer/Footer";
import Header from "../../header/Header.logic";
import { serviceList } from "../../../constant/Variables";
import { IRootState } from "../../../redux/reducer/CombineReducer";

import { PrivacyPolicy } from "./PrivacyPolicy";
import { TermsAndConditions } from "./TermsAndConditions";
import "./Policies.scss";
import { AboutUs } from "./AboutUs";
import TermsOfService from "./TermsOfService";
import { ReturnsAndExchanges } from "./ReturnsAndExchanges";
import { ShippingPolicy } from "./ShippingPolicy";

export const Policies = () => {
  const { footerData } = useSelector((state: IRootState) => state);
  const selectedLink = footerData && footerData.selectedLink;

  const getComponent = (viewName: string) => {
    switch (viewName) {
      case serviceList[0].policy:
        return <AboutUs />;
      case serviceList[1].policy:
        return <PrivacyPolicy />;
      case serviceList[2].policy:
        return <ReturnsAndExchanges />;
      case serviceList[3].policy:
        return <TermsAndConditions />;
      case serviceList[4].policy:
        return <ShippingPolicy />;
      case serviceList[5].policy:
        return <TermsOfService />;
      default:
        return <ReturnsAndExchanges />;
    }
  };

  return (
    <section>
      <Header />
      <div className="policy">{getComponent(selectedLink)}</div>
      <Footer />
    </section>
  );
};
