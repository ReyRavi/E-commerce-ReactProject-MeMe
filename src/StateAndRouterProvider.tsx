import * as React from "react";
import { ReactChild, ReactPortal } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Store } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./components/common/Spinner/Spinner";

type Children = ReactChild | Array<Children> | ReactPortal;

export interface IChildrenProp {
  children: Children;
}

export interface IElementProps {
  className: string;
}

interface IProps extends IChildrenProp {
  store: Store;
}

/**
 * Responsible for rendering the IntlProvider component
 */
const StateAndRouterProvider: React.FC<IProps> = (props: IProps) => {
  let persistor = persistStore(props.store);

  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          {props.children}
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
};

export { StateAndRouterProvider };
