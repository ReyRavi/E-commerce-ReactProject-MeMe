import React from "react";
import { AboutUs } from "./AboutUs/AboutUs";
import FollowUs from "./FollowUs/FollowUs";
import { Subscribe } from "./Subscribe/Subscribe";
import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="site-footer u-h5">
      <div className="footer-container">
        <div className="footer-grid">
          <FollowUs />
          <AboutUs />
          <Subscribe />
        </div>
      </div>
    </footer>
  );
};
