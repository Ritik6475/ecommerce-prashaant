"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  X,
  Heart,
  ShoppingCart,
  ChevronDown,
  Truck,
  RotateCcw,
} from "lucide-react";
import { loadUser } from "@/store/slices/authSlice";
import { fetchCart, selectCartItemsCount } from "@/store/slices/cartSlice";
import { fetchWishlist, selectWishlistItems } from "@/store/slices/wishlistSlice";
import MiniCart from "../cart/minicart";
import SearchBar from "../search/searchBar";
import UserMenu from "./Usermenu";
import MobileNav from "./MobileDrawer";

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const cartCount = useSelector(selectCartItemsCount);
  const wishlist = useSelector(selectWishlistItems);

  const [openMiniCart, setOpenMiniCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(null);
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

  const categories = {
    men: [
      {
        title: "Topwear",
        items: ["T-Shirts", "Shirts", "Hoodies", "Jacket", "Blazers", "Sweaters"],
      },
      {
        title: "Bottomwear",
        items: ["Jeans", "Trousers", "Shorts", "Track Pants", "Joggers"],
      },
      {
        title: "Footwear",
        items: [
          "Sneakers",
          "Sports Shoes",
          "Sandals",
          "Formal Shoes",
          "Boots",
        ],
      },
      {
        title: "Accessories",
        items: ["Watches", "Belts", "Bags", "Sunglasses", "Caps"],
      },
    ],
    women: [
      {
        title: "Topwear",
        items: ["Tops", "Kurtis", "Sweaters", "Jackets", "Dresses", "Blazers"],
      },
      {
        title: "Bottomwear",
        items: ["Jeans", "Skirts", "Leggings", "Trousers", "Shorts"],
      },
      {
        title: "Footwear",
        items: ["Heels", "Flats", "Sports Shoes", "Sandals", "Boots"],
      },
      {
        title: "Accessories",
        items: ["Bags", "Belts", "Watches", "Jewelry", "Scarves"],
      },
    ],
  };

  const MegaMenu = (gender) => (
    <div
      className="absolute left-0 top-full mt-0 w-screen max-w-5xl bg-white shadow-2xl border-0 p-8 z-[999] pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-300"
      onMouseEnter={() => setHoverMenu(gender)}
      onMouseLeave={() => setHoverMenu(null)}
    >
      <div className="grid grid-cols-4 gap-8">
        {categories[gender].map((block, i) => (
          <div key={i}>
            <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {block.title}
            </h3>
            <ul className="space-y-3">
              {block.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/products?category=${encodeURIComponent(
                      item.toLowerCase()
                    )}&gender=${
                      gender.charAt(0).toUpperCase() + gender.slice(1)
                    }`}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Shop by Brand
        </h4>
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="h-16 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <Image
                src="/brand-logo.png"
                alt="brand"
                width={100}
                height={40}
                className="object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const WishlistIcon = () => (
    <Link href="/wishlist" className="relative group">
      <Heart
        size={36}
        className="hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-100"
      />
      {wishlist.length > 0 && (
        <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-5 text-center animate-pulse">
          {wishlist.length}
        </span>
      )}
    </Link>
  );

  const CartIcon = () => (
    <div className="relative group">
      <button
        onClick={() => setOpenMiniCart(true)}
        className="hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
      >
        <ShoppingCart size={22} />
      </button>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-5 text-center">
          {cartCount}
        </span>
      )}
    </div>
  );

  const DesktopNav = () => (
    <nav className="flex items-center gap-12 text-sm font-medium text-gray-700 relative">
      <Link href="/" className="hover:text-gray-900 transition relative group">
        <span>Home</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
      </Link>

      <div
        className="relative"
        onMouseEnter={() => setHoverMenu("men")}
        onMouseLeave={() => setHoverMenu(null)}
      >
        <Link
          href={`/products?gender=Men`}
          className="flex items-center gap-2 hover:text-gray-900 transition group"
        >
          <span>Men</span>
          <ChevronDown
            size={14}
            className="group-hover:rotate-180 transition-transform duration-300"
          />
        </Link>
        {hoverMenu === "men" && MegaMenu("men")}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setHoverMenu("women")}
        onMouseLeave={() => setHoverMenu(null)}
      >
        <Link
          href={`/products?gender=Women`}
          className="flex items-center gap-2 hover:text-gray-900 transition group"
        >
          <span>Women</span>
          <ChevronDown
            size={14}
            className="group-hover:rotate-180 transition-transform duration-300"
          />
        </Link>
        {hoverMenu === "women" && MegaMenu("women")}
      </div>

      <Link
        href="/sale"
        className="hover:text-red-600 transition font-semibold text-red-600"
      >
        Sale
      </Link>
    </nav>
  );

 
  return (
  
  <header className="fixed top-0  left-0 w-full z-50 bg-white shadow-md">

      {/* Top Banner */}
      <div className="hidden md:flex items-center justify-between px-10 h-10 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100 text-xs text-gray-600">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 hover:text-gray-900 transition cursor-pointer">
            <Truck size={14} />
            <span>Free shipping on orders above ₹500</span>
          </div>
          <div className="flex items-center gap-2 hover:text-gray-900 transition cursor-pointer">
            <RotateCcw size={14} />
            <span>Easy returns & exchange</span>
          </div>
        </div>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Customer Support
        </Link>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between px-10 h-20 border-b border-gray-100">
        <Link
          href="/"
          className="text-2xl font-light uppercase tracking-wider text-gray-900 hover:text-gray-600 transition"
        >
          VOGUE
        </Link>

        <DesktopNav />

        <div className="flex-shrink-0 w-96">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <UserMenu isAuthenticated={isAuthenticated} user={user} /> {/* ✅ imported */}
          <WishlistIcon />
          <CartIcon />
          <MiniCart isOpen={openMiniCart} onClose={() => setOpenMiniCart(false)} />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 h-16 border-b border-gray-100">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link
          href="/"
          className="text-lg font-light uppercase tracking-wide text-gray-900"
        >
          VOGUE
        </Link>

        <div className="flex items-center gap-3">
          <UserMenu isAuthenticated={isAuthenticated} user={user} /> {/* ✅ also mobile */}
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="md:hidden px-4 py-3 border-b border-gray-100 bg-gray-50">
        <SearchBar />
      </div>

      {menuOpen && (
  <MobileNav
    mobileExpand={mobileExpand}
    setMobileExpand={setMobileExpand}
    setMenuOpen={setMenuOpen}
    categories={categories}
    isAuthenticated={isAuthenticated}
    user={user}
  />
)}


    </header>
  );
}
