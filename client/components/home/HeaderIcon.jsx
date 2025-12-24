"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "@/store/slices/cartSlice";

export default function HeaderIcons({ onCartClick }) {
  const cartCount = useSelector(selectCartItemsCount);
  const wishlistCount = useSelector(
    (state) => state.wishlist?.items?.length || 0
  );

  return (
    <div className="flex items-center gap-4 pl-1">
  {/* Wishlist */}
      <Link href="/wishlist" className="relative group">
        <Heart
          size={22}
          className="text-gray-700 group-hover:text-red-600 transition"
        />

        {wishlistCount > 0 && (
          <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-[5px]
            flex items-center justify-center rounded-full bg-red-600
            text-white text-[10px] font-semibold">
            {wishlistCount}
          </span>
        )}
      </Link>

      {/* Cart */}
      <button
        type="button"
        onClick={onCartClick}
        className="relative group"
      >
        <ShoppingCart
          size={22}
          className="text-gray-700 group-hover:text-black transition"
        />

        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-[5px]
            flex items-center justify-center rounded-full bg-red-600
            text-white text-[10px] font-semibold">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}
