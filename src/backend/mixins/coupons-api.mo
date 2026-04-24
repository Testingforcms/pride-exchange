import Debug "mo:core/Debug";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import WooTypes "../types/woocommerce";
import CommonTypes "../types/common";

mixin (consumerKey : Text, consumerSecret : Text) {
  public func validateCoupon(code : Text) : async CommonTypes.Result<WooTypes.Coupon, Text> {
    Debug.todo()
  };
};
