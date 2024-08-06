import { applyMiddleware, compose, createStore, Store } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import createRootReducer, { IRootState } from "../reducer/CombineReducer";

export const composeStore = (): any => compose(applyMiddleware(thunk));

const persistConfig = {
  key: "root",
  storage,
};

const reducers = createRootReducer();

const persistedReducer = persistReducer(persistConfig, reducers);

export const getStore = (): Store<IRootState> => {
  const store = createStore(persistedReducer, composeStore());
  return store;
};
