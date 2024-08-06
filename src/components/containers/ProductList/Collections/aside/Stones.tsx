import React from "react";
import { IStone } from "../../../../stateContainers/ProductListState/Types";
import useProductList from "../../useProductList.hook";

function Stones() {
  const { stones, handleSelectedStoneClick, selectedStone } = useProductList();

  return (
    <div className="fs-rdo-inner u-h5">
      {stones?.map((item: IStone, index) => {
        const activeRdo =
          selectedStone === item.stones ? "fs-radio-checked" : "";

        return (
          <div
            className="fs-rdo-wrapper"
            onClick={() => handleSelectedStoneClick(item.stones)}
            key={index}
          >
            <div className="fs-rdo-name">{item.stones}</div>
            <div className={`fs-radio ${activeRdo} `}></div>
          </div>
        );
      })}
    </div>
  );
}

export default Stones;
