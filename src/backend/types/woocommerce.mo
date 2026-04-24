import CommonTypes "common";

module {
  public type Address = CommonTypes.Address;

  // Product types
  public type ProductImage = {
    id : Nat;
    src : Text;
    alt : Text;
  };

  public type ProductCategory = {
    id : Nat;
    name : Text;
    slug : Text;
  };

  public type ProductAttribute = {
    id : Nat;
    name : Text;
    options : [Text];
  };

  public type Product = {
    id : Nat;
    name : Text;
    slug : Text;
    price : Text;
    regularPrice : Text;
    salePrice : Text;
    images : [ProductImage];
    categories : [ProductCategory];
    description : Text;
    shortDescription : Text;
    stockStatus : Text;
    variations : [Nat];
    attributes : [ProductAttribute];
  };

  // Category types
  public type CategoryImage = {
    src : Text;
    alt : Text;
  };

  public type Category = {
    id : Nat;
    name : Text;
    slug : Text;
    description : Text;
    image : ?CategoryImage;
    count : Nat;
    parentId : Nat;
  };

  // Customer types
  public type WooCustomer = {
    id : Nat;
    email : Text;
    firstName : Text;
    lastName : Text;
    billing : Address;
    shipping : Address;
  };

  public type CustomerUpdateData = {
    firstName : ?Text;
    lastName : ?Text;
    email : ?Text;
    billing : ?Address;
    shipping : ?Address;
  };

  // Order types
  public type LineItem = {
    productId : Nat;
    quantity : Nat;
    variationId : ?Nat;
  };

  public type LineItemResult = {
    id : Nat;
    productId : Nat;
    name : Text;
    quantity : Nat;
    price : Text;
    total : Text;
  };

  public type CouponLine = {
    code : Text;
  };

  public type OrderData = {
    customerId : ?Nat;
    lineItems : [LineItem];
    billing : Address;
    shipping : Address;
    paymentMethod : Text;
    couponLines : [CouponLine];
    customerNote : Text;
  };

  public type WooOrder = {
    id : Nat;
    status : Text;
    total : Text;
    lineItems : [LineItemResult];
    billing : Address;
    shipping : Address;
    dateCreated : Text;
    paymentMethod : Text;
    customerNote : Text;
  };

  // Coupon types
  public type Coupon = {
    code : Text;
    discountType : Text;
    amount : Text;
    minimumAmount : Text;
  };
};
