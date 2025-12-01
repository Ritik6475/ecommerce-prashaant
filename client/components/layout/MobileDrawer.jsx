import Link from "next/link";
import { ChevronDown, User, Heart, Truck, RotateCcw, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/slices/authSlice";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";



const MobileNav = ({
  mobileExpand,
  setMobileExpand,
  setMenuOpen,
  categories,
  isAuthenticated,
  user,
}) => {
  const userLinks = [
    { id: "manage-address", icon: User, label: "Manage Address", href: "/profile" },
    { id: "payment", icon: Heart, label: "Payment", href: "/wishlist" },
    { id: "orders", icon: Truck, label: "Orders", href: "/order" },
    { id: "offer", icon: RotateCcw, label: "Offer", href: "/wallet" },
    { id: "help-center", icon: User, label: "Help Center", href: "/help" },
  ];

  const menuSections = [
    {
      id: "men-section",
      title: "MEN",
      key: "men",
      categories: categories.men.flatMap((c) => c.items),
    },
    {
      id: "women-section",
      title: "WOMEN",
      key: "women",
      categories: categories.women.flatMap((c) => c.items),
    },
  ];


const dispatch = useDispatch();    // ✅ FIX
const router = useRouter();        // ✅ FIX


const handleLogout = async () => {
  try {
    await axios.post("/auth/logout", {}, { withCredentials: true });
    dispatch(logoutUser());
    router.push("/login");
    setMenuOpen(false);
  } catch (err) {
    console.error(err);
  }
};



  return (
    <AnimatePresence mode="wait">
      {/* Backdrop overlay - always show when menu is open */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setMenuOpen(false)}
      />
      
      <motion.div
        key="mobile-nav"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white z-50 overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the menu from closing it
      >
        {/* Header */}
        <div key="header" className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Profile</h2>
              {isAuthenticated ? (
                <>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {user?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {user?.email || "@username"}
                  </p>
                </>
              ) : (
                <Link
                  key="login-link"
                  href="/login"
                  className="text-sm font-medium text-gray-900 mt-2 inline-block"
                  onClick={() => setMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
            <button
              key="close-button"
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 hover:text-gray-900 text-xl p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* My Account Section */}
        {isAuthenticated && (
          <div key="account-section" className="p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">My Account</h3>
            <div className="space-y-3">
              {userLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 py-2 px-2 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <link.icon size={18} className="text-gray-500" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories Section */}
        <div key="categories-section" className="p-4 border-t border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Shop</h3>
          <div className="space-y-4">
            {menuSections.map((section) => (
              <div key={section.id}>
                <button
                  key={`${section.id}-button`}
                  onClick={() => setMobileExpand(mobileExpand === section.key ? null : section.key)}
                  className="flex items-center justify-between w-full py-2 px-2 font-medium text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm">{section.title}</span>
                  <ChevronDown
                    className={`transition-transform ${mobileExpand === section.key ? "rotate-180" : ""}`}
                    size={16}
                  />
                </button>

                {mobileExpand === section.key && (
                  <div key={`${section.id}-categories`} className="mt-2 ml-2 pl-3 border-l border-gray-300 space-y-2">
                    <Link
                      key={`${section.id}-view-all`}
                      href={`/products?gender=${section.title}`}
                      onClick={() => setMenuOpen(false)}
                      className="block py-1 px-2 font-medium text-gray-900 text-sm rounded-md hover:bg-gray-50 transition-colors"
                    >
                      View all {section.title}
                    </Link>
                    {section.categories.map((category, index) => (
                      <Link
                        key={`${section.id}-${category}-${index}`}
                        href={`/products?category=${encodeURIComponent(category.toLowerCase())}&gender=${section.title}`}
                        onClick={() => setMenuOpen(false)}
                        className="block py-1 px-2 text-gray-600 hover:text-gray-900 text-sm rounded-md hover:bg-gray-50 transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              key="sale-link"
              href="/sale"
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-2 font-medium text-gray-900 text-sm rounded-md hover:bg-gray-50 transition-colors"
            >
              Sale
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        {isAuthenticated && (
          <div key="logout-section" className="p-4 border-t border-gray-100">
            <button
              key="logout-button"
                onClick={handleLogout}

              className="w-full py-2.5 px-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        )}

        {/* Footer */}
        <div key="footer" className="p-4 text-center text-xs text-gray-500 border-t border-gray-100">
          © {new Date().getFullYear()} VOGUE. All rights reserved.
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default MobileNav;
