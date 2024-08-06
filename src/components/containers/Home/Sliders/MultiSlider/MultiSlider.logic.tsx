import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SLIDERSLIST } from "../../../../../constant/Variables";
import { IProduct } from "../../../../../model/IProductType";
import { IRootState } from "../../../../../redux/reducer/CombineReducer";
import { NavSLice } from "../../../../stateContainers/NavState/Slice";
import { Carousel } from "../../helpers/Carousel/Carousel";

interface IProps {
  name: string;
  header: string;
}

export const MultiSlider: React.FC<IProps> = (props: IProps) => {
  const { sliderData } = useSelector((state: IRootState) => state);
  const Sliders = sliderData && sliderData.Sliders;

  const [slidersList, setSlidersList] = React.useState<IProduct[] | []>([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const { name, header } = props;

  const getList = (name: string) => {
    switch (name) {
      case SLIDERSLIST.FEATURE_LIST: {
        return Sliders.featuredSliders;
      }
      case SLIDERSLIST.ALL_ITEMS: {
        return Sliders.allItemSliders;
      }
      case SLIDERSLIST.NEW_LAUNCH: {
        return Sliders.newlyLaunchedSliders;
      }
      case SLIDERSLIST.TRENDING: {
        return Sliders.trendingSliders;
      }
      default:
        return [];
    }
  };

  React.useEffect(() => {
    const sList = getList(name);
    setSlidersList(sList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Sliders]);

  const hanleViewAllProducts = () => {
    dispatch(NavSLice.actions.getAllProducts(slidersList as IProduct[]));
    history.push("/list");
  };

  return (
    <React.Fragment>
      {slidersList && (
        <Carousel
          header={header}
          Sliderimages={slidersList as IProduct[]}
          buttonName="View all products"
          hanleViewAllProducts={hanleViewAllProducts}
        />
      )}
    </React.Fragment>
  );
};
