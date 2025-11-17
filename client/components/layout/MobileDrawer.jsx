import Link from "next/link";
import { ChevronDown, User, Heart, Truck, RotateCcw, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MobileNav = ({
  mobileExpand,
  setMobileExpand,
  setMenuOpen,
  categories,
  isAuthenticated,
  user,
}) => {
  const userLinks = [
    { icon: User, label: "Manage Address", href: "/profile" },
    { icon: Heart, label: "Payment", href: "/wishlist" },
    { icon: Truck, label: "Orders", href: "/order" },
    { icon: RotateCcw, label: "Offer", href: "/wallet" },
    { icon: User, label: "Help Center", href: "/help" },
  ];

  const menuSections = [
    {
      title: "MEN",
      key: "men",
      categories: categories.men.flatMap((c) => c.items),
    },
    {
      title: "WOMEN",
      key: "women",
      categories: categories.women.flatMap((c) => c.items),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Profile</h2>
              {isAuthenticated ? (
                <>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {user?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {user?.email || "@username"}
                  </p>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-900 mt-2 inline-block"
                  onClick={() => setMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 hover:text-gray-900 text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* My Account Section */}
        {isAuthenticated && (
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Account</h3>
            <div className="space-y-4">
              {userLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <link.icon size={20} className="text-gray-500" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories Section */}
        <div className="p-5 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop</h3>
          <div className="space-y-5">
            {menuSections.map((section) => (
              <div key={section.key}>
                <button
                  onClick={() => setMobileExpand(mobileExpand === section.key ? null : section.key)}
                  className="flex items-center justify-between w-full py-2 font-medium text-gray-900"
                >
                  {section.title}
                  <ChevronDown
                    className={`transition-transform ${mobileExpand === section.key ? "rotate-180" : ""}`}
                    size={18}
                  />
                </button>

                {mobileExpand === section.key && (
                  <div className="mt-3 ml-2 pl-3 border-l border-gray-300 space-y-3">
                    <Link
                      href={`/products?gender=${section.title}`}
                      onClick={() => setMenuOpen(false)}
                      className="block py-1 font-medium text-gray-900"
                    >
                      View all {section.title}
                    </Link>
                    {section.categories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/products?category=${encodeURIComponent(category.toLowerCase())}&gender=${section.title}`}
                        onClick={() => setMenuOpen(false)}
                        className="block py-1 text-gray-600 hover:text-gray-900"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/sale"
              onClick={() => setMenuOpen(false)}
              className="block py-2 font-medium text-gray-900"
            >
              Sale
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        {isAuthenticated && (
          <div className="p-5 border-t border-gray-100">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="w-full py-3 px-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="p-5 text-center text-xs text-gray-500 border-t border-gray-100">
          © {new Date().getFullYear()} VOGUE. All rights reserved.
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileNav;