import { IMetal } from "../../../../stateContainers/ProductListState/Types";
import useProductList from "../../useProductList.hook";

function Metals() {
  const { metals, handleSelectedMetalClick, selectedMetal } = useProductList();

  return (
    <div className="fs-rdo-inner u-h5">
      {metals?.map((item: IMetal, index) => {
        const activeRdo =
          selectedMetal === item.metals ? "fs-radio-checked" : "";

        return (
          <div
            className="fs-rdo-wrapper"
            onClick={() => handleSelectedMetalClick(item.metals)}
            key={index}
          >
            <div className="fs-rdo-name">{item.metals}</div>
            <div className={`fs-radio ${activeRdo} `}></div>
          </div>
        );
      })}
    </div>
  );
}

export default Metals;
