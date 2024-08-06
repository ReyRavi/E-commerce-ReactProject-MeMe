import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import Spinner from "../../common/Spinner/Spinner";
import { Footer } from "../../FooterContainer/Footer";

import Header from "../../header/Header.logic";
import Modal from "../../ui-kit/modal/modal";
import { Banner } from "./Banner/Banner";
import {
  AIBanner,
  FCBanner,
  NLBanner,
  TBanner,
} from "./Sliders/hoc/ProductCard";
import SubscribeBanner from "./SubscribeBanner/SubscribeBanner";

export const HomeView = () => {
  const { spinnerData } = useSelector((state: IRootState) => state);
  const isLoading = spinnerData && spinnerData.isLoading;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClose = () => {
    setOpenModal(!openModal);
  };

  let lastShown = parseInt(localStorage.getItem("lastShown") as any);

  let maxTime = 1000 * 30;

  console.log(Date.now(), lastShown);

  React.useEffect(() => {
    if (!lastShown || lastShown + maxTime < Date.now()) {
      handleClose();
      //store the time to check next time the page is loaded
      localStorage.setItem("lastShown", Date.now() as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <Banner />
          <TBanner />
          <FCBanner />
          <NLBanner />
          <AIBanner />
          <Footer />
          <Modal onClose={handleClose} visibilty={openModal}>
            <SubscribeBanner />
          </Modal>
        </>
      )}
    </React.Fragment>
  );
};

export default HomeView;
