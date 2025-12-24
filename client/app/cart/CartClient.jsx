"use client";

import { useCart } from "./useCart";
import CartView from "./CartView";

export default function CartClient() {
  const cart = useCart();
  return <CartView {...cart} />;
}
