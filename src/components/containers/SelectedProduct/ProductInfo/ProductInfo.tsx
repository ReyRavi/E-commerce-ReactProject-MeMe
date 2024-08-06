import { monthNames } from "../../../../constant/Variables";
import { DeliveryBusIcon } from "../../../common/Icons";
import { useSelProduct } from "../useSelProduct.hook";
import { Accordion } from "./Accordian/Accordian";
import DeliveryDetails from "./Accordian/DeliveryDetails";
import DescriptionDetails from "./Accordian/DescriptionDetails";
import SpecificationDetails from "./Accordian/SpecificationDetails";
import { ProductMeta } from "./ProductMeta";
import ProductVarients from "./ProductVarients";

function ProductInfo() {
  const { productDetails, selectedProduct } = useSelProduct();

  const { pName, price, offer, endDate, minqty, deliveryTime, productcode } =
    productDetails;

  const currentDate = new Date();

  var someDate = new Date();
  var numberOfDaysToAdd = parseInt(deliveryTime);
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

  const minExpectedDate = `${
    monthNames[currentDate.getMonth()]
  } ${currentDate.getDate()}`;

  const maxExpectedDate = `${
    monthNames[someDate.getMonth()]
  } ${someDate.getDate()}`;

  return (
    <div className="Product__InfoWrapper">
      <div className="Product__Info " style={{ top: "-100px" }}>
        <div className="Container">
          <ProductMeta
            name={pName}
            price={price}
            offer={offer}
            endDate={endDate}
            minqty={minqty}
            productcode={productcode}
          />
          <ProductVarients />
          {selectedProduct.from !== "preorder" && (
            <div className="accordian-group">
              <Accordion
                title="Description"
                childComp={<DescriptionDetails />}
              />
              <Accordion
                title="Dimensions"
                childComp={<SpecificationDetails />}
              />
              <Accordion
                title="Check Delivery"
                childComp={<DeliveryDetails />}
              />
            </div>
          )}

          <div className="Product__Delivery u-h41">
            <span className="Product__Delivery__Bus">
              <DeliveryBusIcon />
            </span>
            Delivered between {minExpectedDate} - {maxExpectedDate}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
