module {
  public type Result<T, E> = { #ok : T; #err : E };

  public type Address = {
    firstName : Text;
    lastName : Text;
    company : Text;
    address1 : Text;
    address2 : Text;
    city : Text;
    state : Text;
    postcode : Text;
    country : Text;
    email : Text;
    phone : Text;
  };
};
