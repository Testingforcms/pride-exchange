import Debug "mo:core/Debug";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import WooTypes "../types/woocommerce";
import CommonTypes "../types/common";

mixin (consumerKey : Text, consumerSecret : Text) {
  public func createWooCustomer(
    email : Text,
    firstName : Text,
    lastName : Text,
    password : Text,
  ) : async CommonTypes.Result<WooTypes.WooCustomer, Text> {
    Debug.todo()
  };

  public func getWooCustomer(customerId : Nat) : async CommonTypes.Result<WooTypes.WooCustomer, Text> {
    Debug.todo()
  };

  public func updateWooCustomer(
    customerId : Nat,
    data : WooTypes.CustomerUpdateData,
  ) : async CommonTypes.Result<WooTypes.WooCustomer, Text> {
    Debug.todo()
  };
};
