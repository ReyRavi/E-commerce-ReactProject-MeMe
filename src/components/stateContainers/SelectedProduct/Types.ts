import { IProduct } from "../../../model/IProductType";

export interface ISelectedProduct {
  from: string;
  productDetails: IProduct;
}

export interface IUpdatedProduct {
  productId: number;
  qty: number;
  cusId: string;
  size: string | any;
}

export interface IInitialState {
  selectedProduct: ISelectedProduct;
  updatedProduct: IUpdatedProduct;
}
