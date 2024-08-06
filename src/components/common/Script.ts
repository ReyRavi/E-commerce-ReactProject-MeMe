import { ERROR404, ERROR500 } from "../../constant/routes";

export const getOfferPrice = (price: number = 0, offer: number = 0) => {
  return price - (price * offer) / 100;
};

export const LoggedInUser = localStorage.getItem("user-login");

export default function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const handleErrorResponse = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 500: {
        window.location.href = ERROR500;
        break;
      }
      case 404: {
        window.location.href = ERROR404;
        break;
      }
      default:
        window.location.href = ERROR500;
    }
  }
};

export const removeChar = (item: string) => {
  return item.replace(/[^a-zA-Z ]/g, "").replace(/ /g, "");
};
