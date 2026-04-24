var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as Actor } from "./actor-Bhp-OfYg.js";
import { Z as Variant, $ as Text, a0 as Null, a1 as Record, a2 as Nat, a3 as Vec, a4 as Opt, a5 as Nat8, a6 as Service, a7 as Func, a8 as Bool, a9 as Principal, aa as HttpAgent } from "./index-H678KSt5.js";
const Result_2 = Variant({ "ok": Null, "err": Text });
const UserRole$1 = Variant({
  "admin": Null,
  "user": Null,
  "guest": Null
});
const LineItemResult = Record({
  "id": Nat,
  "total": Text,
  "name": Text,
  "productId": Nat,
  "quantity": Nat,
  "price": Text
});
const Address = Record({
  "postcode": Text,
  "country": Text,
  "city": Text,
  "email": Text,
  "company": Text,
  "state": Text,
  "phone": Text,
  "address1": Text,
  "address2": Text,
  "lastName": Text,
  "firstName": Text
});
const WooOrder = Record({
  "id": Nat,
  "customerNote": Text,
  "status": Text,
  "lineItems": Vec(LineItemResult),
  "total": Text,
  "paymentMethod": Text,
  "dateCreated": Text,
  "shipping": Address,
  "billing": Address
});
const Result_7 = Variant({ "ok": WooOrder, "err": Text });
const ShoppingItem = Record({
  "productName": Text,
  "currency": Text,
  "quantity": Nat,
  "priceInCents": Nat,
  "productDescription": Text
});
const LineItem = Record({
  "productId": Nat,
  "variationId": Opt(Nat),
  "quantity": Nat
});
const CouponLine = Record({ "code": Text });
const OrderData = Record({
  "customerNote": Text,
  "lineItems": Vec(LineItem),
  "paymentMethod": Text,
  "shipping": Address,
  "billing": Address,
  "couponLines": Vec(CouponLine),
  "customerId": Opt(Nat)
});
const WooCustomer = Record({
  "id": Nat,
  "shipping": Address,
  "billing": Address,
  "email": Text,
  "lastName": Text,
  "firstName": Text
});
const Result_1 = Variant({ "ok": WooCustomer, "err": Text });
const CategoryImage = Record({ "alt": Text, "src": Text });
const Category = Record({
  "id": Nat,
  "name": Text,
  "count": Nat,
  "slug": Text,
  "description": Text,
  "image": Opt(CategoryImage),
  "parentId": Nat
});
const Result_8 = Variant({
  "ok": Vec(Category),
  "err": Text
});
const Result_6 = Variant({
  "ok": Vec(WooOrder),
  "err": Text
});
const ProductCategory = Record({
  "id": Nat,
  "name": Text,
  "slug": Text
});
const ProductAttribute = Record({
  "id": Nat,
  "name": Text,
  "options": Vec(Text)
});
const ProductImage = Record({
  "id": Nat,
  "alt": Text,
  "src": Text
});
const Product = Record({
  "id": Nat,
  "categories": Vec(ProductCategory),
  "stockStatus": Text,
  "name": Text,
  "slug": Text,
  "description": Text,
  "shortDescription": Text,
  "attributes": Vec(ProductAttribute),
  "salePrice": Text,
  "regularPrice": Text,
  "price": Text,
  "variations": Vec(Nat),
  "images": Vec(ProductImage)
});
const Result_5 = Variant({ "ok": Product, "err": Text });
const Result_4 = Variant({
  "ok": Vec(Product),
  "err": Text
});
const StripeSessionStatus = Variant({
  "completed": Record({
    "userPrincipal": Opt(Text),
    "response": Text
  }),
  "failed": Record({ "error": Text })
});
const Result_3 = Variant({
  "ok": Vec(Nat),
  "err": Text
});
const StripeConfiguration = Record({
  "allowedCountries": Vec(Text),
  "secretKey": Text
});
const http_header = Record({
  "value": Text,
  "name": Text
});
const http_request_result = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const TransformationInput = Record({
  "context": Vec(Nat8),
  "response": http_request_result
});
const TransformationOutput = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const CustomerUpdateData = Record({
  "shipping": Opt(Address),
  "billing": Opt(Address),
  "email": Opt(Text),
  "lastName": Opt(Text),
  "firstName": Opt(Text)
});
const Coupon = Record({
  "code": Text,
  "discountType": Text,
  "minimumAmount": Text,
  "amount": Text
});
const Result = Variant({ "ok": Coupon, "err": Text });
Service({
  "_initializeAccessControl": Func([], [], []),
  "addToWishlist": Func([Nat], [Result_2], []),
  "assignCallerUserRole": Func([Principal, UserRole$1], [], []),
  "cancelOrder": Func([Nat], [Result_7], []),
  "createCheckoutSession": Func(
    [Vec(ShoppingItem), Text, Text],
    [Text],
    []
  ),
  "createOrder": Func([OrderData], [Result_7], []),
  "createWooCustomer": Func(
    [Text, Text, Text, Text],
    [Result_1],
    []
  ),
  "getCallerUserRole": Func([], [UserRole$1], ["query"]),
  "getCategories": Func([], [Result_8], []),
  "getOrder": Func([Nat], [Result_7], []),
  "getOrders": Func([Nat, Nat, Nat], [Result_6], []),
  "getProduct": Func([Nat], [Result_5], []),
  "getProducts": Func(
    [
      Nat,
      Nat,
      Opt(Nat),
      Opt(Text),
      Text,
      Text
    ],
    [Result_4],
    []
  ),
  "getStripeSessionStatus": Func([Text], [StripeSessionStatus], []),
  "getWishlist": Func([], [Result_3], ["query"]),
  "getWooCustomer": Func([Nat], [Result_1], []),
  "isCallerAdmin": Func([], [Bool], ["query"]),
  "isStripeConfigured": Func([], [Bool], ["query"]),
  "removeFromWishlist": Func([Nat], [Result_2], []),
  "setStripeConfiguration": Func([StripeConfiguration], [], []),
  "transform": Func(
    [TransformationInput],
    [TransformationOutput],
    ["query"]
  ),
  "updateWooCustomer": Func([Nat, CustomerUpdateData], [Result_1], []),
  "validateCoupon": Func([Text], [Result], [])
});
const idlFactory = ({ IDL }) => {
  const Result_22 = IDL.Variant({ "ok": IDL.Null, "err": IDL.Text });
  const UserRole2 = IDL.Variant({
    "admin": IDL.Null,
    "user": IDL.Null,
    "guest": IDL.Null
  });
  const LineItemResult2 = IDL.Record({
    "id": IDL.Nat,
    "total": IDL.Text,
    "name": IDL.Text,
    "productId": IDL.Nat,
    "quantity": IDL.Nat,
    "price": IDL.Text
  });
  const Address2 = IDL.Record({
    "postcode": IDL.Text,
    "country": IDL.Text,
    "city": IDL.Text,
    "email": IDL.Text,
    "company": IDL.Text,
    "state": IDL.Text,
    "phone": IDL.Text,
    "address1": IDL.Text,
    "address2": IDL.Text,
    "lastName": IDL.Text,
    "firstName": IDL.Text
  });
  const WooOrder2 = IDL.Record({
    "id": IDL.Nat,
    "customerNote": IDL.Text,
    "status": IDL.Text,
    "lineItems": IDL.Vec(LineItemResult2),
    "total": IDL.Text,
    "paymentMethod": IDL.Text,
    "dateCreated": IDL.Text,
    "shipping": Address2,
    "billing": Address2
  });
  const Result_72 = IDL.Variant({ "ok": WooOrder2, "err": IDL.Text });
  const ShoppingItem2 = IDL.Record({
    "productName": IDL.Text,
    "currency": IDL.Text,
    "quantity": IDL.Nat,
    "priceInCents": IDL.Nat,
    "productDescription": IDL.Text
  });
  const LineItem2 = IDL.Record({
    "productId": IDL.Nat,
    "variationId": IDL.Opt(IDL.Nat),
    "quantity": IDL.Nat
  });
  const CouponLine2 = IDL.Record({ "code": IDL.Text });
  const OrderData2 = IDL.Record({
    "customerNote": IDL.Text,
    "lineItems": IDL.Vec(LineItem2),
    "paymentMethod": IDL.Text,
    "shipping": Address2,
    "billing": Address2,
    "couponLines": IDL.Vec(CouponLine2),
    "customerId": IDL.Opt(IDL.Nat)
  });
  const WooCustomer2 = IDL.Record({
    "id": IDL.Nat,
    "shipping": Address2,
    "billing": Address2,
    "email": IDL.Text,
    "lastName": IDL.Text,
    "firstName": IDL.Text
  });
  const Result_12 = IDL.Variant({ "ok": WooCustomer2, "err": IDL.Text });
  const CategoryImage2 = IDL.Record({ "alt": IDL.Text, "src": IDL.Text });
  const Category2 = IDL.Record({
    "id": IDL.Nat,
    "name": IDL.Text,
    "count": IDL.Nat,
    "slug": IDL.Text,
    "description": IDL.Text,
    "image": IDL.Opt(CategoryImage2),
    "parentId": IDL.Nat
  });
  const Result_82 = IDL.Variant({ "ok": IDL.Vec(Category2), "err": IDL.Text });
  const Result_62 = IDL.Variant({ "ok": IDL.Vec(WooOrder2), "err": IDL.Text });
  const ProductCategory2 = IDL.Record({
    "id": IDL.Nat,
    "name": IDL.Text,
    "slug": IDL.Text
  });
  const ProductAttribute2 = IDL.Record({
    "id": IDL.Nat,
    "name": IDL.Text,
    "options": IDL.Vec(IDL.Text)
  });
  const ProductImage2 = IDL.Record({
    "id": IDL.Nat,
    "alt": IDL.Text,
    "src": IDL.Text
  });
  const Product2 = IDL.Record({
    "id": IDL.Nat,
    "categories": IDL.Vec(ProductCategory2),
    "stockStatus": IDL.Text,
    "name": IDL.Text,
    "slug": IDL.Text,
    "description": IDL.Text,
    "shortDescription": IDL.Text,
    "attributes": IDL.Vec(ProductAttribute2),
    "salePrice": IDL.Text,
    "regularPrice": IDL.Text,
    "price": IDL.Text,
    "variations": IDL.Vec(IDL.Nat),
    "images": IDL.Vec(ProductImage2)
  });
  const Result_52 = IDL.Variant({ "ok": Product2, "err": IDL.Text });
  const Result_42 = IDL.Variant({ "ok": IDL.Vec(Product2), "err": IDL.Text });
  const StripeSessionStatus2 = IDL.Variant({
    "completed": IDL.Record({
      "userPrincipal": IDL.Opt(IDL.Text),
      "response": IDL.Text
    }),
    "failed": IDL.Record({ "error": IDL.Text })
  });
  const Result_32 = IDL.Variant({ "ok": IDL.Vec(IDL.Nat), "err": IDL.Text });
  const StripeConfiguration2 = IDL.Record({
    "allowedCountries": IDL.Vec(IDL.Text),
    "secretKey": IDL.Text
  });
  const http_header2 = IDL.Record({ "value": IDL.Text, "name": IDL.Text });
  const http_request_result2 = IDL.Record({
    "status": IDL.Nat,
    "body": IDL.Vec(IDL.Nat8),
    "headers": IDL.Vec(http_header2)
  });
  const TransformationInput2 = IDL.Record({
    "context": IDL.Vec(IDL.Nat8),
    "response": http_request_result2
  });
  const TransformationOutput2 = IDL.Record({
    "status": IDL.Nat,
    "body": IDL.Vec(IDL.Nat8),
    "headers": IDL.Vec(http_header2)
  });
  const CustomerUpdateData2 = IDL.Record({
    "shipping": IDL.Opt(Address2),
    "billing": IDL.Opt(Address2),
    "email": IDL.Opt(IDL.Text),
    "lastName": IDL.Opt(IDL.Text),
    "firstName": IDL.Opt(IDL.Text)
  });
  const Coupon2 = IDL.Record({
    "code": IDL.Text,
    "discountType": IDL.Text,
    "minimumAmount": IDL.Text,
    "amount": IDL.Text
  });
  const Result2 = IDL.Variant({ "ok": Coupon2, "err": IDL.Text });
  return IDL.Service({
    "_initializeAccessControl": IDL.Func([], [], []),
    "addToWishlist": IDL.Func([IDL.Nat], [Result_22], []),
    "assignCallerUserRole": IDL.Func([IDL.Principal, UserRole2], [], []),
    "cancelOrder": IDL.Func([IDL.Nat], [Result_72], []),
    "createCheckoutSession": IDL.Func(
      [IDL.Vec(ShoppingItem2), IDL.Text, IDL.Text],
      [IDL.Text],
      []
    ),
    "createOrder": IDL.Func([OrderData2], [Result_72], []),
    "createWooCustomer": IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
      [Result_12],
      []
    ),
    "getCallerUserRole": IDL.Func([], [UserRole2], ["query"]),
    "getCategories": IDL.Func([], [Result_82], []),
    "getOrder": IDL.Func([IDL.Nat], [Result_72], []),
    "getOrders": IDL.Func([IDL.Nat, IDL.Nat, IDL.Nat], [Result_62], []),
    "getProduct": IDL.Func([IDL.Nat], [Result_52], []),
    "getProducts": IDL.Func(
      [
        IDL.Nat,
        IDL.Nat,
        IDL.Opt(IDL.Nat),
        IDL.Opt(IDL.Text),
        IDL.Text,
        IDL.Text
      ],
      [Result_42],
      []
    ),
    "getStripeSessionStatus": IDL.Func([IDL.Text], [StripeSessionStatus2], []),
    "getWishlist": IDL.Func([], [Result_32], ["query"]),
    "getWooCustomer": IDL.Func([IDL.Nat], [Result_12], []),
    "isCallerAdmin": IDL.Func([], [IDL.Bool], ["query"]),
    "isStripeConfigured": IDL.Func([], [IDL.Bool], ["query"]),
    "removeFromWishlist": IDL.Func([IDL.Nat], [Result_22], []),
    "setStripeConfiguration": IDL.Func([StripeConfiguration2], [], []),
    "transform": IDL.Func(
      [TransformationInput2],
      [TransformationOutput2],
      ["query"]
    ),
    "updateWooCustomer": IDL.Func(
      [IDL.Nat, CustomerUpdateData2],
      [Result_12],
      []
    ),
    "validateCoupon": IDL.Func([IDL.Text], [Result2], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
class ExternalBlob {
  constructor(directURL, blob) {
    __publicField(this, "_blob");
    __publicField(this, "directURL");
    __publicField(this, "onProgress");
    if (blob) {
      this._blob = blob;
    }
    this.directURL = directURL;
  }
  static fromURL(url) {
    return new ExternalBlob(url, null);
  }
  static fromBytes(blob) {
    const url = URL.createObjectURL(new Blob([
      new Uint8Array(blob)
    ], {
      type: "application/octet-stream"
    }));
    return new ExternalBlob(url, blob);
  }
  async getBytes() {
    if (this._blob) {
      return this._blob;
    }
    const response = await fetch(this.directURL);
    const blob = await response.blob();
    this._blob = new Uint8Array(await blob.arrayBuffer());
    return this._blob;
  }
  getDirectURL() {
    return this.directURL;
  }
  withUploadProgress(onProgress) {
    this.onProgress = onProgress;
    return this;
  }
}
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["admin"] = "admin";
  UserRole2["user"] = "user";
  UserRole2["guest"] = "guest";
  return UserRole2;
})(UserRole || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async _initializeAccessControl() {
    if (this.processError) {
      try {
        const result = await this.actor._initializeAccessControl();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._initializeAccessControl();
      return result;
    }
  }
  async addToWishlist(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addToWishlist(arg0);
        return from_candid_Result_2_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addToWishlist(arg0);
      return from_candid_Result_2_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async assignCallerUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n3(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n3(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async cancelOrder(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.cancelOrder(arg0);
        return from_candid_Result_7_n5(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.cancelOrder(arg0);
      return from_candid_Result_7_n5(this._uploadFile, this._downloadFile, result);
    }
  }
  async createCheckoutSession(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.createCheckoutSession(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createCheckoutSession(arg0, arg1, arg2);
      return result;
    }
  }
  async createOrder(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createOrder(to_candid_OrderData_n7(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Result_7_n5(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createOrder(to_candid_OrderData_n7(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Result_7_n5(this._uploadFile, this._downloadFile, result);
    }
  }
  async createWooCustomer(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.createWooCustomer(arg0, arg1, arg2, arg3);
        return from_candid_Result_1_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createWooCustomer(arg0, arg1, arg2, arg3);
      return from_candid_Result_1_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCallerUserRole() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserRole();
        return from_candid_UserRole_n14(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserRole();
      return from_candid_UserRole_n14(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCategories() {
    if (this.processError) {
      try {
        const result = await this.actor.getCategories();
        return from_candid_Result_8_n16(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCategories();
      return from_candid_Result_8_n16(this._uploadFile, this._downloadFile, result);
    }
  }
  async getOrder(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getOrder(arg0);
        return from_candid_Result_7_n5(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getOrder(arg0);
      return from_candid_Result_7_n5(this._uploadFile, this._downloadFile, result);
    }
  }
  async getOrders(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.getOrders(arg0, arg1, arg2);
        return from_candid_Result_6_n22(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getOrders(arg0, arg1, arg2);
      return from_candid_Result_6_n22(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProduct(arg0);
        return from_candid_Result_5_n24(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProduct(arg0);
      return from_candid_Result_5_n24(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProducts(arg0, arg1, arg2, arg3, arg4, arg5) {
    if (this.processError) {
      try {
        const result = await this.actor.getProducts(arg0, arg1, to_candid_opt_n26(this._uploadFile, this._downloadFile, arg2), to_candid_opt_n27(this._uploadFile, this._downloadFile, arg3), arg4, arg5);
        return from_candid_Result_4_n28(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProducts(arg0, arg1, to_candid_opt_n26(this._uploadFile, this._downloadFile, arg2), to_candid_opt_n27(this._uploadFile, this._downloadFile, arg3), arg4, arg5);
      return from_candid_Result_4_n28(this._uploadFile, this._downloadFile, result);
    }
  }
  async getStripeSessionStatus(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getStripeSessionStatus(arg0);
        return from_candid_StripeSessionStatus_n30(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getStripeSessionStatus(arg0);
      return from_candid_StripeSessionStatus_n30(this._uploadFile, this._downloadFile, result);
    }
  }
  async getWishlist() {
    if (this.processError) {
      try {
        const result = await this.actor.getWishlist();
        return from_candid_Result_3_n34(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getWishlist();
      return from_candid_Result_3_n34(this._uploadFile, this._downloadFile, result);
    }
  }
  async getWooCustomer(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getWooCustomer(arg0);
        return from_candid_Result_1_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getWooCustomer(arg0);
      return from_candid_Result_1_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async isCallerAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerAdmin();
      return result;
    }
  }
  async isStripeConfigured() {
    if (this.processError) {
      try {
        const result = await this.actor.isStripeConfigured();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isStripeConfigured();
      return result;
    }
  }
  async removeFromWishlist(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.removeFromWishlist(arg0);
        return from_candid_Result_2_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.removeFromWishlist(arg0);
      return from_candid_Result_2_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async setStripeConfiguration(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setStripeConfiguration(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setStripeConfiguration(arg0);
      return result;
    }
  }
  async transform(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.transform(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.transform(arg0);
      return result;
    }
  }
  async updateWooCustomer(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateWooCustomer(arg0, to_candid_CustomerUpdateData_n36(this._uploadFile, this._downloadFile, arg1));
        return from_candid_Result_1_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateWooCustomer(arg0, to_candid_CustomerUpdateData_n36(this._uploadFile, this._downloadFile, arg1));
      return from_candid_Result_1_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async validateCoupon(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.validateCoupon(arg0);
        return from_candid_Result_n38(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.validateCoupon(arg0);
      return from_candid_Result_n38(this._uploadFile, this._downloadFile, result);
    }
  }
}
function from_candid_Category_n19(_uploadFile, _downloadFile, value) {
  return from_candid_record_n20(_uploadFile, _downloadFile, value);
}
function from_candid_Result_1_n12(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n13(_uploadFile, _downloadFile, value);
}
function from_candid_Result_2_n1(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n2(_uploadFile, _downloadFile, value);
}
function from_candid_Result_3_n34(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n35(_uploadFile, _downloadFile, value);
}
function from_candid_Result_4_n28(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n29(_uploadFile, _downloadFile, value);
}
function from_candid_Result_5_n24(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n25(_uploadFile, _downloadFile, value);
}
function from_candid_Result_6_n22(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n23(_uploadFile, _downloadFile, value);
}
function from_candid_Result_7_n5(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n6(_uploadFile, _downloadFile, value);
}
function from_candid_Result_8_n16(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n17(_uploadFile, _downloadFile, value);
}
function from_candid_Result_n38(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n39(_uploadFile, _downloadFile, value);
}
function from_candid_StripeSessionStatus_n30(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n31(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n14(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n15(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n21(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n33(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n20(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    name: value.name,
    count: value.count,
    slug: value.slug,
    description: value.description,
    image: record_opt_to_undefined(from_candid_opt_n21(_uploadFile, _downloadFile, value.image)),
    parentId: value.parentId
  };
}
function from_candid_record_n32(_uploadFile, _downloadFile, value) {
  return {
    userPrincipal: record_opt_to_undefined(from_candid_opt_n33(_uploadFile, _downloadFile, value.userPrincipal)),
    response: value.response
  };
}
function from_candid_variant_n13(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n15(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
function from_candid_variant_n17(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: from_candid_vec_n18(_uploadFile, _downloadFile, value.ok)
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n2(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n23(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n25(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n29(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n31(_uploadFile, _downloadFile, value) {
  return "completed" in value ? {
    __kind__: "completed",
    completed: from_candid_record_n32(_uploadFile, _downloadFile, value.completed)
  } : "failed" in value ? {
    __kind__: "failed",
    failed: value.failed
  } : value;
}
function from_candid_variant_n35(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n39(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n6(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_vec_n18(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Category_n19(_uploadFile, _downloadFile, x));
}
function to_candid_CustomerUpdateData_n36(_uploadFile, _downloadFile, value) {
  return to_candid_record_n37(_uploadFile, _downloadFile, value);
}
function to_candid_LineItem_n10(_uploadFile, _downloadFile, value) {
  return to_candid_record_n11(_uploadFile, _downloadFile, value);
}
function to_candid_OrderData_n7(_uploadFile, _downloadFile, value) {
  return to_candid_record_n8(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n3(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n4(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n26(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function to_candid_opt_n27(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function to_candid_record_n11(_uploadFile, _downloadFile, value) {
  return {
    productId: value.productId,
    variationId: value.variationId ? candid_some(value.variationId) : candid_none(),
    quantity: value.quantity
  };
}
function to_candid_record_n37(_uploadFile, _downloadFile, value) {
  return {
    shipping: value.shipping ? candid_some(value.shipping) : candid_none(),
    billing: value.billing ? candid_some(value.billing) : candid_none(),
    email: value.email ? candid_some(value.email) : candid_none(),
    lastName: value.lastName ? candid_some(value.lastName) : candid_none(),
    firstName: value.firstName ? candid_some(value.firstName) : candid_none()
  };
}
function to_candid_record_n8(_uploadFile, _downloadFile, value) {
  return {
    customerNote: value.customerNote,
    lineItems: to_candid_vec_n9(_uploadFile, _downloadFile, value.lineItems),
    paymentMethod: value.paymentMethod,
    shipping: value.shipping,
    billing: value.billing,
    couponLines: value.couponLines,
    customerId: value.customerId ? candid_some(value.customerId) : candid_none()
  };
}
function to_candid_variant_n4(_uploadFile, _downloadFile, value) {
  return value == "admin" ? {
    admin: null
  } : value == "user" ? {
    user: null
  } : value == "guest" ? {
    guest: null
  } : value;
}
function to_candid_vec_n9(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_LineItem_n10(_uploadFile, _downloadFile, x));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
export {
  Backend,
  ExternalBlob,
  UserRole,
  createActor
};
