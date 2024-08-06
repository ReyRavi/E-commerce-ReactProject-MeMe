import React from "react";
import { ShowMore } from "../common/Icons";

interface IProps {
  name: string;
  onClick: () => void;
}

export const ItemHeader: React.FC<IProps> = (props: IProps) => {
  const { name, onClick } = props;

  return (
    <button
      type="button"
      className="footer__title  medium-up--hide is-open"
      aria-controls="Footer-1601472511727"
      aria-expanded="true"
    >
      <span style={{ fontSize: "12px" }}>{name}</span>
      <span
        className="collapsible-trigger__icon"
        role="presentation"
        onClick={onClick}
      >
        <ShowMore classname="footer-show-icon" />
      </span>
    </button>
  );
};

export default ItemHeader;
