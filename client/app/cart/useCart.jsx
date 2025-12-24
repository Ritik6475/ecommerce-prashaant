"use client";

import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  selectCartTotal,
} from "@/store/slices/cartSlice";

export function useCart() {
  const dispatch = useDispatch();

  const { items, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleUpdateQuantity = useCallback(
    (itemId, quantity) => {
      if (quantity < 1) return;
      dispatch(updateCartItem({ itemId, quantity }));
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (itemId) => {
      dispatch(removeFromCart(itemId));
      toast.success("Removed from cart");
    },
    [dispatch]
  );

  const savings = useMemo(() => {
    return items.reduce(
      (sum, i) =>
        sum + (i.product.price - i.product.offerprice) * i.quantity,
      0
    );
  }, [items]);

  return {
    items,
    loading,
    total,
    savings,
    isAuthenticated,
    handleUpdateQuantity,
    handleRemove,
  };
}
