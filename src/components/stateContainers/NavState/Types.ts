import { IProduct } from "../../../model/IProductType";

export interface IFilter {
  id: number;
  filtypeId: number;
  filtertype: string;
  maincatId: number;
}

export interface ICategory {
  id: number;
  maincatId: number;
  mainCatName: string;
  categories: ISubCategory[];
  imageUrl: string;
  filteration: IFilter[];
}

export interface ISubCategory {
  id: number;
  catId: number;
  cName: string;
  maincatId: number;
}

export interface ISelectedCategory {
  mc: string;
  sc: string;
}

export interface IInitialState {
  categories: ICategory[];
  allProducts: IProduct[];
  PreOrderList: IProduct[];
  selectedAccountView: string;
  selectedCategory: ISelectedCategory;
  searchList: IProduct[];
  searchValue: string;
}
