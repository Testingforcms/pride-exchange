import Debug "mo:core/Debug";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import WooTypes "../types/woocommerce";
import CommonTypes "../types/common";
import AccessControl "mo:caffeineai-authorization/access-control";

mixin (
  consumerKey : Text,
  consumerSecret : Text,
  accessControlState : AccessControl.AccessControlState,
) {
  public shared ({ caller }) func createOrder(
    orderData : WooTypes.OrderData
  ) : async CommonTypes.Result<WooTypes.WooOrder, Text> {
    Debug.todo()
  };

  public shared ({ caller }) func getOrders(
    customerId : Nat,
    page : Nat,
    perPage : Nat,
  ) : async CommonTypes.Result<[WooTypes.WooOrder], Text> {
    Debug.todo()
  };

  public shared ({ caller }) func getOrder(orderId : Nat) : async CommonTypes.Result<WooTypes.WooOrder, Text> {
    Debug.todo()
  };

  public shared ({ caller }) func cancelOrder(orderId : Nat) : async CommonTypes.Result<WooTypes.WooOrder, Text> {
    Debug.todo()
  };
};
