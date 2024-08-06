import React from "react";
import { DesktopView } from "./Desktop/DesktopView";
import { TabView } from "./Tab/TabView";
import { MobileView } from "./Mobile/MobileView";
import "./Carousel.scss";
import { useWindowSize } from "../../../../../hook/useWindowSize.hook";
import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";
import { IProduct } from "../../../../../model/IProductType";

interface IProps {
  Sliderimages: IProduct[];
  header: string;
  buttonName: string;
  hanleViewAllProducts: () => void;
}

export const Carousel: React.FC<IProps> = (props: IProps) => {
  const [width] = useWindowSize();

  const { Sliderimages, header, buttonName, hanleViewAllProducts } = props;

  const Header = () => {
    return (
      <header className="SectionHeader SectionHeader--center">
        <div className="Container">
          <h4 className="SectionHeader__Heading Carousel__Header u-h3">
            {header}
          </h4>
        </div>
      </header>
    );
  };

  const FooterButton = () => {
    return (
      // <div className="Container">
      <div className="CarouselFooter">
        <TextButton
          items={buttonName}
          isprimary={true}
          className="slider--button"
          onClick={hanleViewAllProducts}
        />
      </div>
      // </div>
    );
  };

  return (
    <div className="shopify-section shopify-section--bordered __web-inspector-hide-shortcut__">
      <section className="Section Section--spacingNormal">
        <Header />
        <div
          className="TabPanel"
          id="block-1592059005705-0"
          aria-hidden="false"
          role="tabpanel"
        >
          <div className="ProductListWrapper">
            {width > 1240 ? (
              <DesktopView Sliderimages={Sliderimages} />
            ) : width > 1023 ? (
              <TabView Sliderimages={Sliderimages} />
            ) : (
              <MobileView Sliderimages={Sliderimages} />
            )}
          </div>
          <FooterButton />
        </div>
      </section>
    </div>
  );
};
