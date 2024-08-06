import React from "react";
import { TextButton } from "../../ui-kit/TextButton/TextButton.view";
import ItemHeader from "../ItemHeader";
import "./Subscribe.scss";
import useSubscribe from "./useSubscribe";

export const Subscribe = () => {
  const [open, setOpen] = React.useState(false);

  const { email, handleOnChange, handleSubscribe } = useSubscribe();

  const onClick = () => {
    setOpen(!open);
  };

  const cName = open ? "about-open" : "about-hide";

  const CollapsibleContent = () => {
    return (
      <div
        style={{ height: "auto" }}
        className={`collapsible-content is-open ${cName}`}
      >
        <p className="Rte">
          Subscribe to receive updates, access to exclusive <br /> deals, and
          more.
        </p>

        <form className="footer-form">
          <input
            type="email"
            name="contact[email]"
            className="footer-form__input extra-narrow "
            placeholder="Enter your email address"
            required={true}
            value={email}
            onChange={handleOnChange}
          />
          <TextButton
            isprimary={true}
            items="Subscribe"
            className="button--full footer-form__button"
            onClick={handleSubscribe as any}
          />
        </form>
      </div>
    );
  };

  return (
    <div className="footer-grid-item footer__item--01" data-type="menu">
      <p className="footer__title small--hide u-h5">Newsletter</p>
      <ItemHeader name="Newsletter" onClick={onClick} />
      <CollapsibleContent />
    </div>
  );
};
