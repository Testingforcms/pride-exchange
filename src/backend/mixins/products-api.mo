import Debug "mo:core/Debug";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import WooTypes "../types/woocommerce";
import CommonTypes "../types/common";

mixin (consumerKey : Text, consumerSecret : Text) {
  public func getProducts(
    page : Nat,
    perPage : Nat,
    categoryId : ?Nat,
    search : ?Text,
    orderby : Text,
    order : Text,
  ) : async CommonTypes.Result<[WooTypes.Product], Text> {
    Debug.todo()
  };

  public func getProduct(productId : Nat) : async CommonTypes.Result<WooTypes.Product, Text> {
    Debug.todo()
  };

  public func getCategories() : async CommonTypes.Result<[WooTypes.Category], Text> {
    Debug.todo()
  };
};
