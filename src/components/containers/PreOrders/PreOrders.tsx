import EmptyProducts from "../../common/EmptyProducts/EmptyProducts";
import Spinner from "../../common/Spinner/Spinner";
import Header from "../../header/Header.logic";
import { PreOrderContainer } from "./PreOrderContainer/PreOrderContainer";
import { usePreOrder } from "./usePreOrder.hook";
import "./PreOrders.scss";
import React from "react";
import { fetchPreOrderList } from "../../stateContainers/NavState/ThunkActions";
import { useDispatch } from "react-redux";

function PreOrders() {
  const { preoders, isLoading } = usePreOrder();

  const cName = preoders.length === 0 && "empty-preorder";
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (preoders.length < 1 || !preoders) {
      dispatch(fetchPreOrderList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <section id="preorder" className={`preorder-area ${cName}`}>
          {preoders.length > 0 ? <PreOrderContainer /> : <EmptyProducts />}
        </section>
      )}
    </section>
  );
}

export default PreOrders;
