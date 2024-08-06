import React from "react";
import "./App.scss";
import { NavContextProvider } from "./react-context/NavContext";
import { ValidationContextProvider } from "./react-context/ValidationContext";
import { Layout } from "./Layout/Layout";
import { getStore } from "./redux/store/AppStore";
import { StateAndRouterProvider } from "./StateAndRouterProvider";


export const App: React.FC = () => {
  const store = getStore();
  return (
    <StateAndRouterProvider store={store}>
      <ValidationContextProvider>
        <NavContextProvider>
          <Layout />
        </NavContextProvider>
      </ValidationContextProvider>
    </StateAndRouterProvider>
  );
};
