export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface CategoryImage {
  id: number;
  src: string;
  alt: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regularPrice: string;
  salePrice: string;
  images: ProductImage[];
  categories: ProductCategory[];
  description: string;
  shortDescription: string;
  stockStatus: string;
  variations: number[];
  attributes: ProductAttribute[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: CategoryImage | null;
  count: number;
  parentId: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface WooCustomer {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  billing: Address;
  shipping: Address;
}

export interface LineItem {
  productId: number;
  quantity: number;
  variationId?: number;
}

export interface LineItemResult {
  productId: number;
  name: string;
  quantity: number;
  price: string;
  total: string;
}

export interface CouponLine {
  code: string;
}

export interface OrderData {
  customerId: number | null;
  lineItems: LineItem[];
  billing: Address;
  shipping: Address;
  paymentMethod: string;
  couponLines: CouponLine[];
  customerNote: string;
}

export interface WooOrder {
  id: number;
  status: string;
  total: string;
  lineItems: LineItemResult[];
  billing: Address;
  shipping: Address;
  dateCreated: string;
  paymentMethod: string;
  customerNote?: string;
}

export interface Coupon {
  code: string;
  discountType: string;
  amount: string;
  minimumAmount: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variationId?: number;
  selectedAttributes?: Record<string, string>;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: "popularity" | "date" | "price" | "price-desc";
  page?: number;
  perPage?: number;
}
