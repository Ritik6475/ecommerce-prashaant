"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/store/slices/authSlice";
import { fetchCart } from "@/store/slices/cartSlice";
import { fetchWishlist } from "@/store/slices/wishlistSlice";

export function useHeaderLogic() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((s) => s.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(null);
  const [openMiniCart, setOpenMiniCart] = useState(false);

  // ✅ ADD THIS
  const [mobileExpand, setMobileExpand] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) dispatch(loadUser());
  }, [dispatch, user]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  return {
    user,
    isAuthenticated,
    menuOpen,
    setMenuOpen,
    hoverMenu,
    setHoverMenu,
    openMiniCart,
    setOpenMiniCart,

    // ✅ RETURN THESE
    mobileExpand,
    setMobileExpand,
  };
}
