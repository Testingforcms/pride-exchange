import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import ProductsApi "mixins/products-api";
import CustomersApi "mixins/customers-api";
import OrdersApi "mixins/orders-api";
import CouponsApi "mixins/coupons-api";
import WishlistApi "mixins/wishlist-api";

actor {
  // WooCommerce API credentials — set via admin or environment
  let wooConsumerKey : Text = "";
  let wooConsumerSecret : Text = "";

  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Wishlist state: per-user set of product IDs
  let wishlistStore = Map.empty<Principal, Set.Set<Nat>>();

  // Mixin inclusions
  include ProductsApi(wooConsumerKey, wooConsumerSecret);
  include CustomersApi(wooConsumerKey, wooConsumerSecret);
  include OrdersApi(wooConsumerKey, wooConsumerSecret, accessControlState);
  include CouponsApi(wooConsumerKey, wooConsumerSecret);
  include WishlistApi(accessControlState, wishlistStore);

  // HTTP outcall transform — required at actor level
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Stripe configuration
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    let config = switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };
};
