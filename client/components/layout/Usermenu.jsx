"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { User, Heart, Truck, RotateCcw } from "lucide-react";
import { logoutUser } from "@/store/slices/authSlice";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function UserMenu({ isAuthenticated, user }) {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useDispatch();         // ✅ FIX
  const router = useRouter();             // ✅ FIX

  useEffect(() => {
    setIsClient(true);

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAuthClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setOpenUserMenu((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      dispatch(logoutUser());         // clears Redux
      router.push("/login");          // redirect
    } catch (err) {
      console.error(err);
    }
  };

  const menuItems = [
    { icon: User, label: "My Account", href: "/profile" },
    { icon: Heart, label: "My Wishlist", href: "/wishlist" },
    { icon: Truck, label: "My Orders", href: "/order" },
    { icon: RotateCcw, label: "My Wallet", href: "/wallet" },
  ];

  return (
    <div className="relative">
      <button
        onClick={handleAuthClick}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <User size={22} />
      </button>

      {isClient && openUserMenu && isAuthenticated && (
        <div
          ref={menuRef}
          className="absolute right-0 top-[120%] w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <div className="p-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              Hi, {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {user?.email || "Welcome back"}
            </p>
          </div>

          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <item.icon size={16} className="text-gray-500" />
              {item.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
