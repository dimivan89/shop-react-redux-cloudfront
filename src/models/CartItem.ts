import { Product } from "~/models/Product";

export type CartStatus = "OPEN" | "ORDERED";

export type CartItem = {
  product: Product;
  count: number;
};

export interface Cart {
  id: string;
  user_id: string;
  status: CartStatus;
  items: CartItem[];
}
