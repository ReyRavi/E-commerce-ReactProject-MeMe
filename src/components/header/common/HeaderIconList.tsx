import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useNavInfoContext } from "../../../react-context/NavContext";
import { LoggedInUser } from "../../common/Script";
import { useCart } from "../../containers/Cart/useCart.hook";
import { useWishList } from "../../containers/WishList/useWishList.hook";
import {
  CartDesktop,
  CartMobile,
  ProfileIcon,
  SearchDeskptop,
  SearchIconMobile,
  WishListDesktop,
  WishListMobile,
} from "./Icons";

function HeaderIconList() {
  const { searchToggleClick, useOutsideAlerter } = useNavInfoContext();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const history = useHistory();

  const ProfileIconClick = () => {
    if (LoggedInUser !== null) {
      history.push("/myprofile");
    } else {
      history.push("/login");
    }
  };

  const { viewCart } = useCart();
  const { favItems } = useWishList();

  return (
    <div className="Header__FlexItem Header__FlexItem--fill">
      <span
        className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable hidden-phone"
        onClick={ProfileIconClick}
        ref={wrapperRef}
      >
        <ProfileIcon />
      </span>
      <span
        className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable "
        data-action="toggle-search"
        aria-label="Search"
        onClick={searchToggleClick}
      >
        <span className="hidden-tablet-and-up">
          <SearchIconMobile />
        </span>

        <span className="hidden-phone">
          <SearchDeskptop />
        </span>
      </span>

      <a
        href="/wishlist"
        className="swym-wishlist Header__Icon Icon-Wrapper Icon-Wrapper--clickable "
      >
        <span className="hidden-tablet-and-up">
          <WishListMobile />
        </span>
        <span className="hidden-phone">
          <WishListDesktop />
        </span>
        {favItems.length > 0 && (
          <span className="Header__CartDot is-visible"></span>
        )}
      </a>

      <a
        href="/cart"
        className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable "
        data-action="open-drawer"
        data-drawer-id="sidebar-cart"
        aria-expanded="false"
        aria-label="Open cart"
      >
        <span className="hidden-tablet-and-up">
          <CartMobile />
        </span>
        <span className="hidden-phone">
          <CartDesktop />
        </span>
        {viewCart.cartItem?.length > 0 && (
          <span className="Header__CartDot is-visible"></span>
        )}
      </a>
    </div>
  );
}

export default HeaderIconList;
