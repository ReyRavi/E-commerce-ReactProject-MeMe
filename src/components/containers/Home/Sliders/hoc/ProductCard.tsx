import React from "react";
import { SLIDERSLIST } from "../../../../../constant/Variables";
import { MultiSlider } from "../MultiSlider/MultiSlider.logic";

const withProductContainer = (WrappedComponent: any, props: any) => {
  return class extends React.Component {
    render() {
      return <WrappedComponent name={props.name} header={props.header} />;
    }
  };
};

export const TBanner = withProductContainer(MultiSlider, {
  header: "Trending At Ophelia Moon",
  name: SLIDERSLIST.TRENDING,
});

export const FCBanner = withProductContainer(MultiSlider, {
  header: "Featured Collection",
  name: SLIDERSLIST.FEATURE_LIST,
});

export const NLBanner = withProductContainer(MultiSlider, {
  header: "Newly Launched",
  name: SLIDERSLIST.NEW_LAUNCH,
});

export const AIBanner = withProductContainer(MultiSlider, {
  header: "All Items",
  name: SLIDERSLIST.ALL_ITEMS,
});
