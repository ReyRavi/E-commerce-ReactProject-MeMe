import React from "react";
import { productType, useNav } from "../useNav.hook";

interface IProps {
  productList: productType[];
}

export const HeaderNavList: React.FC<IProps> = (props: IProps) => {
  const { productList } = props;

  const { MenuItemHandleClick, handlePreOrderClick } = useNav();

  const [activeIndex, setActiveIndex] = React.useState<null | number>(null);
  const populateSubMenu = (index: number) => {
    setActiveIndex(index);
  };
  const onCloseSubMenu = () => {
    setActiveIndex(null);
  };

  return (
    <nav
      className="Header__MainNav hidden-pocket hidden-lap"
      aria-label="Main navigation"
    >
      <ul className="HorizontalList HorizontalList--spacingExtraLoose">
        {productList.map((item: productType, index: number) => {
          const activeMcatName =
            index === activeIndex
              ? "HorizontalList__Item"
              : "HorizontalList__Item is-expanded";
          return (
            <li
              key={index}
              className={activeMcatName}
              onMouseEnter={() => populateSubMenu(index)}
              onMouseLeave={onCloseSubMenu}
            >
              <span
                className="Nav__header u-h6"
                onClick={() => {
                  MenuItemHandleClick(item.mCategory);
                }}
              >
                {item.mCategory}
              </span>
            </li>
          );
        })}
        <li className="HorizontalList__Item" onClick={handlePreOrderClick}>
          <span className="Nav__preorder u-h6">PRE ORDER</span>
        </li>
      </ul>
    </nav>
  );
};
