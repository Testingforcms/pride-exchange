import Debug "mo:core/Debug";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  wishlistStore : Map.Map<Principal, Set.Set<Nat>>,
) {
  public shared ({ caller }) func addToWishlist(
    productId : Nat
  ) : async CommonTypes.Result<(), Text> {
    Debug.todo()
  };

  public shared ({ caller }) func removeFromWishlist(
    productId : Nat
  ) : async CommonTypes.Result<(), Text> {
    Debug.todo()
  };

  public query ({ caller }) func getWishlist() : async CommonTypes.Result<[Nat], Text> {
    Debug.todo()
  };
};
