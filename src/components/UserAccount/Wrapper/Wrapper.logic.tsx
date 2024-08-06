import React from "react";
import { WrapperView } from "./Wrapper.view";
import "./Wrapper.scss";

interface IProps {
  childComp?: React.ReactNode;
  name: string;
}

export const Wrapper = (props: IProps) => {
  const { childComp, name } = props;

  return <WrapperView name={name} childComp={childComp} />;
};

export default Wrapper;
