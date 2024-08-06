import React from "react";
import { Facebook, Instagram, Twitter } from "../../common/Icons";
import ItemHeader from "../ItemHeader";
import "./FollowUs.scss";

function FollowUs() {
  const [open, setOpen] = React.useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const cName = open ? "about-open" : "about-hide";

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
      <li className="footer__icons--item" key={item.name}>
        <a
          href={item.href}
          className="icon-link"
          target="_blank"
          rel="noreferrer"
          aria-label={item.name}
        >
          {item.icon}
        </a>
      </li>
    ));
  };

  return (
    <div className="footer-grid-item footer__item--01" data-type="menu">
      <p className="footer__title small--hide">Follow Us</p>
      <ItemHeader name="Follow Us" onClick={onClick} />

      <div
        style={{ height: "auto" }}
        className={`collapsible-content is-open ${cName}`}
      >
        <div className="Rte footer-text-lRte">
          <p>
            For any queries or order updates get in touch <br /> with our team
            at:
          </p>
          <p className="footer-text font-bold">
            Email: contact@ophelia-moon.com
          </p>
          <p className="footer-text">Customer Care Number: 9150041898</p>
        </div>

        <ul className="footer__icons">{getSocialIcons()}</ul>
      </div>
    </div>
  );
}

export default FollowUs;
