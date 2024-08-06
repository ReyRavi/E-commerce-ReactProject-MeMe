import React from "react";
import logo from "../../../assets/image/nav/logo.png";

function HeaderLogo() {
  return (
    <div className="Header__FlexItem Header__FlexItem--logo">
      <div className="Header__Logo">
        <a href="/" className="Header__LogoLink">
          <img
            className="Header__LogoImage Header__LogoImage--primary hidden-phone"
            src={logo}
            width="110"
            alt="opheliamoon"
          />
          <img
            className="Header__LogoImage Header__LogoImage--primary hidden-tablet-and-up"
            src={logo}
            width="70"
            alt="opheliamoon"
          />
        </a>
      </div>
    </div>
  );
}

export default HeaderLogo;
