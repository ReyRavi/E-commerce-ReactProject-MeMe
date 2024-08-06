import { ShowSingLeProduct } from "../../../utils/API";

export const showProductService = async (item: any): Promise<any> => {
  return ShowSingLeProduct.showSingleProduct(item)
    .then((res: any) => res.data)
    .catch((error: any) => error);
};
