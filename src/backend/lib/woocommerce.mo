import Debug "mo:core/Debug";
import Types "../types/woocommerce";
import CommonTypes "../types/common";

module {
  public type Result<T, E> = CommonTypes.Result<T, E>;

  // Build WooCommerce API base URL with auth params
  public func buildUrl(path : Text, consumerKey : Text, consumerSecret : Text) : Text {
    Debug.todo()
  };

  // Build URL with additional query params
  public func buildUrlWithParams(
    path : Text,
    consumerKey : Text,
    consumerSecret : Text,
    params : [(Text, Text)],
  ) : Text {
    Debug.todo()
  };

  // Parse raw JSON text response for products list
  public func parseProductsJson(json : Text) : Result<[Types.Product], Text> {
    Debug.todo()
  };

  // Parse raw JSON text response for a single product
  public func parseProductJson(json : Text) : Result<Types.Product, Text> {
    Debug.todo()
  };

  // Parse raw JSON text response for categories list
  public func parseCategoriesJson(json : Text) : Result<[Types.Category], Text> {
    Debug.todo()
  };

  // Parse raw JSON text response for a single customer
  public func parseCustomerJson(json : Text) : Result<Types.WooCustomer, Text> {
    Debug.todo()
  };

  // Parse raw JSON text response for a single order
  public func parseOrderJson(json : Text) : Result<Types.WooOrder, Text> {
    Debug.todo()
  };

  // Parse raw JSON text response for orders list
  public func parseOrdersJson(json : Text) : Result<[Types.WooOrder], Text> {
    Debug.todo()
  };

  // Parse raw JSON text response for a coupon
  public func parseCouponJson(json : Text) : Result<Types.Coupon, Text> {
    Debug.todo()
  };

  // Serialize OrderData to JSON body for WooCommerce API
  public func orderDataToJson(orderData : Types.OrderData) : Text {
    Debug.todo()
  };

  // Serialize CustomerUpdateData to JSON body for WooCommerce API
  public func customerUpdateDataToJson(data : Types.CustomerUpdateData) : Text {
    Debug.todo()
  };

  // Serialize new customer registration to JSON body
  public func newCustomerToJson(
    email : Text,
    firstName : Text,
    lastName : Text,
    password : Text,
  ) : Text {
    Debug.todo()
  };
};
