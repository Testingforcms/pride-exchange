import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CouponLine {
    code: string;
}
export type Result_2 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface LineItem {
    productId: bigint;
    variationId?: bigint;
    quantity: bigint;
}
export interface ProductAttribute {
    id: bigint;
    name: string;
    options: Array<string>;
}
export type Result_5 = {
    __kind__: "ok";
    ok: Product;
} | {
    __kind__: "err";
    err: string;
};
export interface CustomerUpdateData {
    shipping?: Address;
    billing?: Address;
    email?: string;
    lastName?: string;
    firstName?: string;
}
export type Result_1 = {
    __kind__: "ok";
    ok: WooCustomer;
} | {
    __kind__: "err";
    err: string;
};
export interface OrderData {
    customerNote: string;
    lineItems: Array<LineItem>;
    paymentMethod: string;
    shipping: Address;
    billing: Address;
    couponLines: Array<CouponLine>;
    customerId?: bigint;
}
export type Result_4 = {
    __kind__: "ok";
    ok: Array<Product>;
} | {
    __kind__: "err";
    err: string;
};
export interface LineItemResult {
    id: bigint;
    total: string;
    name: string;
    productId: bigint;
    quantity: bigint;
    price: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type Result_7 = {
    __kind__: "ok";
    ok: WooOrder;
} | {
    __kind__: "err";
    err: string;
};
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface ProductCategory {
    id: bigint;
    name: string;
    slug: string;
}
export interface Category {
    id: bigint;
    name: string;
    count: bigint;
    slug: string;
    description: string;
    image?: CategoryImage;
    parentId: bigint;
}
export interface WooOrder {
    id: bigint;
    customerNote: string;
    status: string;
    lineItems: Array<LineItemResult>;
    total: string;
    paymentMethod: string;
    dateCreated: string;
    shipping: Address;
    billing: Address;
}
export type Result_6 = {
    __kind__: "ok";
    ok: Array<WooOrder>;
} | {
    __kind__: "err";
    err: string;
};
export interface ProductImage {
    id: bigint;
    alt: string;
    src: string;
}
export interface Coupon {
    code: string;
    discountType: string;
    minimumAmount: string;
    amount: string;
}
export interface WooCustomer {
    id: bigint;
    shipping: Address;
    billing: Address;
    email: string;
    lastName: string;
    firstName: string;
}
export interface CategoryImage {
    alt: string;
    src: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export type Result_3 = {
    __kind__: "ok";
    ok: Array<bigint>;
} | {
    __kind__: "err";
    err: string;
};
export type Result = {
    __kind__: "ok";
    ok: Coupon;
} | {
    __kind__: "err";
    err: string;
};
export type Result_8 = {
    __kind__: "ok";
    ok: Array<Category>;
} | {
    __kind__: "err";
    err: string;
};
export interface Product {
    id: bigint;
    categories: Array<ProductCategory>;
    stockStatus: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    attributes: Array<ProductAttribute>;
    salePrice: string;
    regularPrice: string;
    price: string;
    variations: Array<bigint>;
    images: Array<ProductImage>;
}
export interface Address {
    postcode: string;
    country: string;
    city: string;
    email: string;
    company: string;
    state: string;
    phone: string;
    address1: string;
    address2: string;
    lastName: string;
    firstName: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToWishlist(productId: bigint): Promise<Result_2>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelOrder(orderId: bigint): Promise<Result_7>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(orderData: OrderData): Promise<Result_7>;
    createWooCustomer(email: string, firstName: string, lastName: string, password: string): Promise<Result_1>;
    getCallerUserRole(): Promise<UserRole>;
    getCategories(): Promise<Result_8>;
    getOrder(orderId: bigint): Promise<Result_7>;
    getOrders(customerId: bigint, page: bigint, perPage: bigint): Promise<Result_6>;
    getProduct(productId: bigint): Promise<Result_5>;
    getProducts(page: bigint, perPage: bigint, categoryId: bigint | null, search: string | null, orderby: string, order: string): Promise<Result_4>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getWishlist(): Promise<Result_3>;
    getWooCustomer(customerId: bigint): Promise<Result_1>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    removeFromWishlist(productId: bigint): Promise<Result_2>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateWooCustomer(customerId: bigint, data: CustomerUpdateData): Promise<Result_1>;
    validateCoupon(code: string): Promise<Result>;
}
