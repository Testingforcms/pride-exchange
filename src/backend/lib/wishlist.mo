import Debug "mo:core/Debug";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";

module {
  public type WishlistStore = Map.Map<Principal, Set.Set<Nat>>;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  public func addToWishlist(
    store : WishlistStore,
    caller : Principal,
    productId : Nat,
  ) : Result<(), Text> {
    Debug.todo()
  };

  public func removeFromWishlist(
    store : WishlistStore,
    caller : Principal,
    productId : Nat,
  ) : Result<(), Text> {
    Debug.todo()
  };

  public func getWishlist(store : WishlistStore, caller : Principal) : Result<[Nat], Text> {
    Debug.todo()
  };
};
