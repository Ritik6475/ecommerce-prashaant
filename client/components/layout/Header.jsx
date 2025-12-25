"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, X, ChevronDown, Truck, RotateCcw } from "lucide-react";
import SearchBar from "../search/searchBar";
import UserMenu from "./Usermenu";
import HeaderIcons from "../home/HeaderIcon";
import MegaMenu from "../home/megamenu";
import { useHeaderLogic } from "@/hooks/useHeaderlogic";
import { AnimatePresence } from "framer-motion";
import AnnouncementBar from "../home/AnnouncementBar";
import MobileCategoryStrip from "../home/MobileCategoryStrip";

/* Lazy load heavy mobile/cart UI */
const MobileNav = dynamic(() => import("./MobileDrawer"), { ssr: false });
const MiniCart = dynamic(() => import("../cart/minicart"), { ssr: false });

export default function Header() {
  const {
    user,
    isAuthenticated,
    menuOpen,
    setMenuOpen,
    hoverMenu,
    setHoverMenu,
    openMiniCart,
    setOpenMiniCart,
    mobileExpand,
    setMobileExpand,
  } = useHeaderLogic();

  /* ───────── FILLED NAV (STYLE SAME) ───────── */
  const NAV_ITEMS = [
    { label: "Home", href: "/", mega: false },
    { label: "New Collection", href: "/products", mega: false },
    { label: "Men", href: "/products?gender=men", mega: true },
    { label: "Women", href: "/products?gender=women", mega: true },
    { label: "Oversized", href: "/products?fit=oversized", mega: false },
    { label: "Accessories", href: "/products?category=accessories", mega: false },
    { label: "Brands", href: "/brands", mega: false },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">

      {/* ───────── TOP BAR (UNCHANGED) ───────── */}
      <div className="hidden md:flex items-center justify-between px-8 h-9 bg-gray-50 border-b border-gray-200 text-[11px] text-gray-500">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 transition-colors">
            <Truck size={10} className="text-gray-400" />
            Free shipping above ₹999
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 transition-colors">
            <RotateCcw size={10} className="text-gray-400" />
            Easy returns
          </span>
        </div>

        <Link
          href="/contact"
          className="hover:text-gray-800 transition-colors font-normal"
        >
          Customer Support
        </Link>
      </div>

      {/* ───────── DESKTOP HEADER (LAYOUT FIX ONLY) ───────── */}
      <div className="hidden md:grid grid-cols-3 items-center px-6 h-14 border-b border-gray-100">

        {/* LEFT – SEARCH */}
        <div className="flex items-center max-w-md">
          <SearchBar />
        </div>

        {/* CENTER – LOGO (STYLE SAME) */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="text-[20px] uppercase tracking-[0.3em] font-light text-gray-900 hover:text-gray-600 transition"
          >
            VOGUE
          </Link>
        </div>

        {/* RIGHT – ICONS */}
        <div className="flex items-center justify-end gap-3">
          <UserMenu isAuthenticated={isAuthenticated} user={user} />
      
         {!isAuthenticated && (
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              <span className="border-2 border-spacing-1 border-gray-700">Login</span>
            </Link>
          )}
          
          <HeaderIcons onCartClick={() => setOpenMiniCart(true)} />
      
        </div>
      </div>

      {/* ───────── DESKTOP NAV (FILLED, STYLE SAME) ───────── */}
      <div className="hidden md:flex justify-center gap-6 h-12 bg-white border-b border-gray-100 text-[13px]">

        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className="relative flex items-center"
            onMouseEnter={() => item.mega && setHoverMenu(item.label)}
            onMouseLeave={() => setHoverMenu(null)}
          >
            <Link
              href={item.href}
              className="flex items-center gap-1 py-3 font-normal text-black-600 hover:text-gray-900 transition border-b border-transparent hover:border-gray-900"
            >
              <span className="uppercase tracking-wide text-xs font-semibold">
                {item.label}
              </span>

              {item.mega && (
                <ChevronDown size={13} className="opacity-60" />
              )}
            </Link>

            {item.mega && hoverMenu === item.label && (
              <MegaMenu
                gender={item.label.toLowerCase()}
                onClose={() => setHoverMenu(null)}
              />
            )}
          </div>
        ))}

        {/* SALE (UNCHANGED STYLE) */}
        <Link
          href="/sale"
          className="flex items-center py-3 uppercase tracking-wide text-xs font-medium text-red-500 hover:text-red-600 transition border-b border-transparent hover:border-red-500"
        >
          Sale
        </Link>

      </div>

      {/* ───────── MOBILE HEADER (UNCHANGED) ───────── */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 border-b border-gray-100">
        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-0 rounded-lg hover:bg-gray-100 transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link
          href="/"
          className="text-lg uppercase tracking-[0.3em] font-light text-gray-900"
        >
          VOGUE
        </Link>


      </div>



        <div className="md:hidden bg-[#eaf6ff] px-4 pt-3 pb-2">
  <div className="flex items-center gap-3">
    
    {/* SEARCH BAR */}
    <div className="flex-1">
      <SearchBar />
    </div>

    {/* ICONS */}
    <HeaderIcons onCartClick={() => setOpenMiniCart(true)} />
  </div>
</div>

      {/* MOBILE SEARCH (UNCHANGED) */}
  


      {/* ───────── DRAWERS ───────── */}
      {menuOpen && (
        <MobileNav
          mobileExpand={mobileExpand}
          setMobileExpand={setMobileExpand}
          setMenuOpen={setMenuOpen}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      )}
      
    <AnnouncementBar/>
         

      <AnimatePresence>
        {openMiniCart && (
          <MiniCart
            isOpen={openMiniCart}
            onClose={() => setOpenMiniCart(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
