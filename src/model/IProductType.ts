export interface IProductImage {
  imId: number;
  imageUrl: string;
  id: number;
  mcId: number;
}

export interface IProductSize {
  dimention: any;
  id: number;
  mcId: number;
  psize: string;
  qty: number;
  sid: number;
}

export interface IProduct {
  deliveryTime: string;
  descpription: string;
  descpription1: string;
  endDate: string;
  fabric: string;
  imageurl: string;
  mcId: number;
  metal: string;
  minqty: number;
  mtown: string;
  offer: number;
  pName: string;
  pWeight: string;
  pattern: string;
  pcolor: string;
  price: number;
  proSize: string;
  productHeight: string;
  productImages: IProductImage[];
  productLength: string;
  productSize: IProductSize[];
  productcode: string;
  psize: string;
  quantity: string;
  sPhone: string;
  stone: string;
  subtown: string;
  tax: number;
}

export interface ICartItemResponse {
  productInfo: {
    productCode: number;
    productName: string;
    price: number;
    offer: number;
    imageurl: string;
    sPhone: string;
    enddate: string;
    size: string;
    color: string | null;
    descpription: string;
    cartId: number;
    qty: number;
    minqty: number;
  };
  quantity: number;
  subTotal: number;
  deduction: number;
  tax: number;
}

export interface IViewCartResponse {
  orderNumber: number;
  cartItem: ICartItemResponse[];
  totalPrice: number;
  addId: number;
  tax: number;
}

export interface IAddress {
  city: string;
  flatNo: string;
  id: number;
  landMark: string;
  name: string;
  phone: string;
  pin: string;
  street: string;
}

export interface IProfile {
  userid: number;
  uPhone: string;
  fname: string;
  lname: string;
  iUmg: string;
  email: string;
  userReferral: string;
  affiliateCode: string;
  password: string;
  address: IAddress[] | any;
  enabled: boolean;
}

export interface IAddress {
  city: string;
  flatNo: string;
  id: number;
  landMark: string;
  name: string;
  phone: string;
  pin: string;
  street: string;
}
