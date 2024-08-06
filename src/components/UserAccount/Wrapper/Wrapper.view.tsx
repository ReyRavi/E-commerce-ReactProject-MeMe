import React from "react";
import Header from "../../header/Header.logic";
import "./Wrapper.scss";

interface Iprops {
  name: string;
  childComp?: React.ReactNode;
}

export const WrapperView = (props: Iprops) => {
  const { name, childComp } = props;

  const containerName = `lcontainer ${name}`;

  return (
    <div>
      <Header />

      <div className={containerName}>
        <div className="lcontainer__leftview"></div>
        <div className="lcontainer__centerview"></div>
        <div className="lcontainer__rightview">{childComp}</div>
      </div>
    </div>
  );
};
