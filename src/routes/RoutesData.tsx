import React from "react";
import { RouteComponentProps } from "react-router";
import { Page404 } from "../components/common/page/Page404";
import { Page500 } from "../components/common/page/Page500";
import Address from "../components/containers/Address/Address";
import Cart from "../components/containers/Cart/Cart";
import Layout from "../components/containers/Dashboard/Layout/Layout";
import HomeView from "../components/containers/Home/HomeView";
import OrderConfirmation from "../components/containers/OrderConfirmation/OrderConfirmation";
import PaymentContainer from "../components/containers/PaymentContainer/PaymentContainer";
import { Policies } from "../components/containers/Policies/Policies";
import PreOrders from "../components/containers/PreOrders/PreOrders";
import ProductList from "../components/containers/ProductList/ProductList";
import SearchContainer from "../components/containers/SearchContainer/SearchContainer";
import SelectedProduct from "../components/containers/SelectedProduct/SelectedProduct";
import WishList from "../components/containers/WishList/WishList";
import Login from "../components/UserAccount/Login/Login";
import { Register } from "../components/UserAccount/Register/Register.logic";

export interface IRoutesData {
  /**
   * Should be displayed on the home page
   */
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  /**
   * Should be displayed on the home page
   */
  path: string;
}

const RoutesData: IRoutesData[] = [
  {
    component: HomeView,
    path: "/",
  },

  {
    component: WishList,
    path: "/wishlist",
  },
  {
    component: SearchContainer,
    path: "/search",
  },
  {
    component: Layout,
    path: "/myprofile",
  },
  {
    component: Address,
    path: "/address",
  },
  {
    component: Cart,
    path: "/cart",
  },
  {
    component: Login,
    path: "/login",
  },
  {
    component: Register,
    path: "/register",
  },
  {
    component: ProductList,
    path: "/list",
  },
  {
    component: PreOrders,
    path: "/preorder",
  },
  {
    component: SelectedProduct,
    path: "/info/:name/:id",
  },
  {
    component: PaymentContainer,
    path: "/pay",
  },
  {
    component: Policies,
    path: "/Policy",
  },
  {
    component: Page404,
    path: "/error/404",
  },
  {
    component: Page500,
    path: "/error/500",
  },
  {
    component: OrderConfirmation,
    path: "/orderconfirm",
  },
];

export default RoutesData;
