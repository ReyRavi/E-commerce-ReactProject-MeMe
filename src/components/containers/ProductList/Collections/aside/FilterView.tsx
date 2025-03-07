import React from "react";
import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";
import useProductList from "../../useProductList.hook";
import { FilterBody } from "./FilterBody";
import "./FilterView.scss";

export const FilterView = () => {
  const { resetButtonOnClick, selectedId, MenuApplyHandleClick } =
    useProductList();
  return (
    <div
      className="CollectionInner__Sidebar  hidden-pocket"
      style={{ top: "50px" }}
    >
      <FilterBody />
      {selectedId !== null && (
        <div className="inlineBox">
          <TextButton
            type="button"
            data-action="apply"
            items="Apply"
            isprimary={true}
            className="u-h6"
            onClick={MenuApplyHandleClick}
          />
          <TextButton
            type="button"
            data-action="reset"
            onClick={resetButtonOnClick}
            items="Reset"
            isSecondary={true}
            className="u-h6"
          />
        </div>
      )}
    </div>
  );
};