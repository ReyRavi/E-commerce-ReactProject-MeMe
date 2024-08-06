import React from "react";
import { useSelector } from "react-redux";
import { useNavInfoContext } from "../../../react-context/NavContext";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import { Facebook, Instagram, ShowMore, Twitter } from "../../common/Icons";
import { Drawer } from "../../ui-kit/Drawer/Drawer";
import { productType, useNav } from "../useNav.hook";
import "./LeftDrawer.scss";

interface IProps {
  productList: productType[];
}

export const LeftDrawer: React.FC<IProps> = (props: IProps) => {
  const { productList } = props;
  const { MenuIconClick } = useNavInfoContext();

  const { MenuItemHandleClick, SubMenuHandleClick, handlePreOrderClick } =
    useNav();

  const { profileData } = useSelector((state: IRootState) => state);
  const personDetails = profileData && profileData.profileDetails.Profile;
  const { fname, uPhone } = personDetails;

  const [activeIndex, setActiveIndex] = React.useState<null | number>(null);
  const [open, setOpen] = React.useState(false);

  const populateSubMenu = (index: number) => {
    setActiveIndex(index);
    setOpen(!open);
  };

  const getList = (product: productType, index: number) => {
    const getSubCategory = () => {
      return (
        <ul className="inner-submenu u-h6">
          {product.sCategory.map((item: any, index: number) => {
            return (
              <li
                onClick={() => {
                  SubMenuHandleClick(product.mCategory, item);
                }}
              >
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      );
    };

    return (
      <li>
        <div className="link-category u-h6">
          <span onClick={() => MenuItemHandleClick(product.mCategory)}>
            {product.mCategory}
          </span>
          <span onClick={() => populateSubMenu(index)}>
            <ShowMore classname="icon-arrow" />
          </span>
        </div>
        {index === activeIndex &&
          open &&
          product.sCategory.length > 0 &&
          getSubCategory()}
      </li>
    );
  };

  const RouteUrl = fname ? "/myProfile" : "/login";

  const GreetingText = fname ? `Hello ${fname}!` : `Hello there!`;

  const socialIcons = [
    {
      icon: <Facebook />,
      href: "https://facebook.com/opheliamoonofficial?utm_medium=copy_link",
      name: "Facebook",
    },
    {
      icon: <Twitter />,
      href: "https://twitter.com/opheliamoonofficial?utm_medium=copy_link",
      name: "Twitter",
    },
    {
      icon: <Instagram />,
      href: "https://instagram.com/opheliamoonofficial?utm_medium=copy_link",
      name: "Instagram",
    },
  ];

  const getSocialIcons = () => {
    return socialIcons.map((item: any, index) => (
      <li key={item.name}>
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.name}
        >
          {item.icon}
        </a>
      </li>
    ));
  };

  const Body = () => {
    return (
      <div className="menu-drawer-content">
        <div className="menu-drawer-main" data-scrollable="">
          <div className="user-account">
            <p className="user-account-name">{GreetingText}</p>
            {uPhone && <p className="user-account-no">9498422064</p>}
          </div>
          <ul className="menu-linklist">
            {productList.map((item: productType, index: number) => {
              return (
                <React.Fragment key={index}>
                  {getList(item, index)}
                </React.Fragment>
              );
            })}
          </ul>
          <span className="link-category" onClick={handlePreOrderClick}>
            Pre Order
          </span>
        </div>
        <div className="divider"></div>
        <div className="link-category">
          {fname ? "MyAccount" : "Sign in / Register"}
          <a href={RouteUrl}>
            <ShowMore classname="icon-arrow" />
          </a>
        </div>

        <div className="app_download_links">
          <p>Get our Apps</p>
          <p>
            <a href="/#" className="d-link">
              <img
                src="https://www.nykaafashion.com/pub/static/frontend/Nykaa/theme001/en_US/images/glplay.png"
                alt="Google Play"
                className="d-img"
              />
            </a>
            <a href="/#" className="d-link">
              <img
                src="https://www.nykaafashion.com/pub/static/frontend/Nykaa/theme001/en_US/images/appleStore.png"
                alt="Apple Store"
                className="d-img"
              />
            </a>
          </p>
        </div>
        <div className="menu-drawer-footer">
          <ul className="menu-social">{getSocialIcons()}</ul>
        </div>
      </div>
    );
  };

  return (
    <Drawer
      body={<Body />}
      name="Menu"
      visibility={true}
      position="left"
      onClose={MenuIconClick}
    />
  );
};

export default LeftDrawer;
