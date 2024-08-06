import { IProduct } from "../../../model/IProductType";
import { ICarousel } from "../../../model/ISliderType";

export interface ISlidersList {
  carousel: ICarousel[];
  trendingSliders: IProduct[];
  newlyLaunchedSliders: IProduct[];
  allItemSliders: IProduct[];
  featuredSliders: IProduct[];
}

export interface IInitialState {
  Sliders: ISlidersList;
}
