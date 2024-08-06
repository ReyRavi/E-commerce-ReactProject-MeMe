import React from "react";
import { view1, view2 } from "../../../../constant/Variables";
import { DualView, MultiView, SingleView } from "../../../common/Icons";
import useProductList from "../useProductList.hook";

const MobileView = () => {
  const { handleGridView, getActiveGridView } = useProductList();
  return (
    <div className="grid-Layout__mobile">
      <button
        aria-label="one * one view"
        className={getActiveGridView(view1)}
        onClick={() => handleGridView(view1)}
      >
        <SingleView />
      </button>
      <button
        aria-label="two * two view"
        className={getActiveGridView(view2)}
        onClick={() => handleGridView(view2)}
      >
        <DualView />
      </button>
    </div>
  );
};

const DesktopView = () => {
  const { handleGridView, getActiveGridView } = useProductList();

  return (
    <div className="grid-Layout__desktop">
      <button
        aria-label="two * two view"
        className={getActiveGridView(view1)}
        onClick={() => handleGridView(view1)}
      >
        <DualView />
      </button>
      <button
        aria-label="four * four view"
        className={getActiveGridView(view2)}
        onClick={() => handleGridView(view2)}
      >
        <MultiView />
      </button>
    </div>
  );
};

export const GridController = () => {
  return (
    <div className="toolbar__item  grid-layout">
      <MobileView />
      <DesktopView />
    </div>
  );
};
