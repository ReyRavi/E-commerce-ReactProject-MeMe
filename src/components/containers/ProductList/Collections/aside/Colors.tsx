import React from "react";
import { IColor } from "../../../../stateContainers/ProductListState/Types";
import useProductList from "../../useProductList.hook";

function Colors() {
  const { colors, selectedColor, handleSelectedColorClick } = useProductList();
  return (
    <div className="fs-rdo-inner u-h5">
      {colors?.map((item: IColor) => {
        const activeRdo =
          selectedColor === item.color ? "fs-radio-checked" : "";
        return (
          <React.Fragment key={item.id}>
            <div
              className="fs-rdo-wrapper"
              onClick={() => handleSelectedColorClick(item.color)}
            >
              <div className="fs-rdo-name">{item.color}</div>
              <div className={`fs-radio ${activeRdo} `}></div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Colors;
