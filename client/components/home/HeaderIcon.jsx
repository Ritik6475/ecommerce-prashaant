"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "@/store/slices/cartSlice";

// Reusable wrapper to keep code DRY (Don't Repeat Yourself)
const NavIcon = ({ icon: Icon, label, count, href, onClick }) => {
  const content = (
    <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
      {/* Icon Container with subtle hover background */}
      <div className="relative p-2 -m-2 rounded-full group-hover:bg-gray-50 transition-colors duration-300">
        <Icon
          size={22}
          className="text-gray-700 group-hover:text-black transition-transform duration-300 group-hover:-translate-y-0.5"
        />
        
        {/* Modern Badge with "Halo" effect */}
        {count > 0 && (
          <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in duration-200">
            {count}
          </span>
        )}
      </div>
      
      {/* Text Label Below Icon */}
      <span className="text-[10px] font-bold uppercase tracking-wider text-black-800 group-hover:text-black transition-colors">
        {label}
      </span>
    </div>
  );

  // Return Link if href exists, otherwise Button
  return href ? <Link href={href}>{content}</Link> : <button onClick={onClick}>{content}</button>;
};

export default function HeaderIcons({ onCartClick }) {
  const cartCount = useSelector(selectCartItemsCount);
  const wishlistCount = useSelector(
    (state) => state.wishlist?.items?.length || 0
  );

  return (
    <div className="flex items-center gap-6 pl-1">
      <NavIcon
        icon={Heart}
        label="Wishlist"
        count={wishlistCount}
        href="/wishlist"
      />
      
      <NavIcon
        icon={ShoppingCart}
        label="Cart"
        count={cartCount}
        onClick={onCartClick}
      />
    </div>
  );
}