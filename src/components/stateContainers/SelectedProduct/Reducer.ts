import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, ISelectedProduct, IUpdatedProduct } from "./Types";

export const Reducer = {
  setSelectedProduct: (
    state: IInitialState,
    action: PayloadAction<ISelectedProduct>
  ): void => {
    state.selectedProduct = action.payload;
  },
  setUpdatedProduct: (
    state: IInitialState,
    action: PayloadAction<IUpdatedProduct>
  ): void => {
    state.updatedProduct = action.payload;
  },
};
