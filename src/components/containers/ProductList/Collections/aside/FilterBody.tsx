import React from "react";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Categories from "./Categories";
import Colors from "./Colors";
import Stones from "./Stones";
import Metals from "./Metals";
import useProductList from "../../useProductList.hook";
import { ICategory, IFilter } from "../../../../stateContainers/NavState/Types";

export const FilterBody = () => {
  const { selectedCategoryItems } = useProductList();
  const [Selectedindex, setSelectedindex] = React.useState<number | null>(null);

  const onExpandClick = (index: number) => {
    if (Selectedindex === index) {
      setSelectedindex(null);
    } else {
      setSelectedindex(index);
    }
  };

  const getSubCategoryValue = (viewName: string) => {
    let name = viewName.toUpperCase();
    switch (name) {
      case "CATEGORIES":
        return <Categories />;
      case "COLORS":
        return <Colors />;
      case "STONE":
        return <Stones />;
      case "METAL":
        return <Metals />;
      default:
        return <h6>No Filters Available</h6>;
    }
  };

  const selectedCategoryValues: ICategory =
    selectedCategoryItems() as ICategory;

  let selectedCategoryFilters = selectedCategoryValues.filteration?.map(
    (item: IFilter) => item.filtertype.toLocaleUpperCase()
  );

  selectedCategoryFilters.unshift("CATEGORIES", "COLORS");

  return (
    <div className="Filter-List">
      {selectedCategoryFilters.map((item: any, index: number) => {
        return (
          <div key={item}>
            <div
              className="Filter-List-title u-h5"
              onClick={() => onExpandClick(index)}
            >
              <span className="fs-name">{item}</span>
              <ExpandMore />
            </div>
            {Selectedindex === index && getSubCategoryValue(item)}
          </div>
        );
      })}
    </div>
  );
};
