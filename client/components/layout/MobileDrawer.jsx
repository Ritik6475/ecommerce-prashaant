"use client";

import Link from "next/link";
import { ChevronDown, User, Heart, Truck, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/slices/authSlice";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { categories } from "@/app/constants/headerdata";

export default function MobileNav({
  mobileExpand,
  setMobileExpand,
  setMenuOpen,
  isAuthenticated,
  user,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const userLinks = [
    { id: "profile", label: "My Profile", href: "/profile", icon: User },
    { id: "wishlist", label: "Wishlist", href: "/wishlist", icon: Heart },
    { id: "orders", label: "Orders", href: "/orders", icon: Truck },
    { id: "wallet", label: "Wallet / Offers", href: "/wallet", icon: RotateCcw },
  ];

  const menuSections = [
    {
      key: "men",
      title: "MEN",
      items: categories.men.flatMap((c) => c.items),
    },
    {
      key: "women",
      title: "WOMEN",
      items: categories.women.flatMap((c) => c.items),
    },
  ];

  const handleLogout = async () => {
    await axios.post("/auth/logout", {}, { withCredentials: true });
    dispatch(logoutUser());
    router.push("/login");
    setMenuOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      <>
        {/* BACKDROP */}
        <motion.div
          key="drawer-backdrop"
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* DRAWER */}
        <motion.div
          key="drawer-panel"
          className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white z-50 shadow-xl overflow-y-auto"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
        >
          {/* PROFILE */}
          <div className="p-4 border-b">
            {isAuthenticated ? (
              <>
                <p className="font-semibold text-gray-900">
                  {user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email || ""}
                </p>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-black"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* ACCOUNT LINKS */}
          {isAuthenticated && (
            <div className="p-4 space-y-3">
              {userLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-gray-700 hover:text-black"
                >
                  <link.icon size={18} />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* CATEGORIES */}
          <div className="p-4 border-t">
            {menuSections.map((section) => (
              <div key={section.key}>
                <button
                  onClick={() =>
                    setMobileExpand(
                      mobileExpand === section.key ? null : section.key
                    )
                  }
                  className="flex justify-between w-full py-2 font-semibold"
                >
                  {section.title}
                  <ChevronDown
                    className={`transition-transform ${
                      mobileExpand === section.key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileExpand === section.key && (
                  <div className="ml-3 space-y-2">
                    {section.items.map((item) => (
                      <Link
                        key={`${section.key}-${item}`}
                        href={`/products?category=${encodeURIComponent(
                          item.toLowerCase()
                        )}&gender=${section.title}`}
                        onClick={() => setMenuOpen(false)}
                        className="block text-sm text-gray-600 hover:text-black"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* LOGOUT */}
          {isAuthenticated && (
            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="w-full bg-black text-white py-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
  
          {/* FOOTER */}
          <div className="p-4 text-xs text-center text-gray-500 border-t">
            © {new Date().getFullYear()} VOGUE
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
