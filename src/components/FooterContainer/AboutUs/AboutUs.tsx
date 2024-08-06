import React from "react";
import ItemHeader from "../ItemHeader";
import { serviceList } from "../../../constant/Variables";
import "./AboutUs.scss";
import { setSelectedLink } from "../../stateContainers/Footer/Slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { onClick } from "../../../constant/Types";

export const AboutUs = () => {
  const [open, setOpen] = React.useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const getPolicy = (e: onClick, policy: string) => {
    e.preventDefault();
    dispatch(setSelectedLink(policy));
    history.push("/Policy");
  };

  const cName = open ? "about-open" : "about-hide";
  const getServices = () => {
    return serviceList.map((item: any, index: number) => (
      <li
        className="footer-linklist__item"
        key={item.id}
        onClick={(e: any) => getPolicy(e, item.policy)}
      >
        <a href="/Policy" className="footer-link">
          {item.policy}
        </a>
      </li>
    ));
  };

  const NavList = () => {
    return (
      <div
        style={{ height: "auto" }}
        className={`collapsible-content is-open ${cName}`}
      >
        <div className="collapsible-content__inner">
          <div className="footer__collapsible">
            <ul className="site-footer__linklist">{getServices()}</ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="footer-grid-item footer__item--01" data-type="menu">
      <p className="h4 footer__title small--hide">CUSTOMER SERVICE</p>
      <ItemHeader name="CUSTOMER SERVICE" onClick={onClick} />
      <NavList />
    </div>
  );
};
