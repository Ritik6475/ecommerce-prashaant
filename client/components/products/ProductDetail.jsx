"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import {
  ShoppingCart,
  Heart,
  Star,
  Tag,
  Minus,
  Plus,
  Package,
} from "lucide-react";

import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import MiniCart from "../cart/minicart";

import toast from "react-hot-toast";
import CategoryHeadingRow from "../home/CategoryHeadingRow";

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const colorVariants = product.colorVariants?.length
    ? product.colorVariants
    : [{ color: product.colors?.[0], images: product.images }];

  const [selectedVariant, setSelectedVariant] = useState(colorVariants[0]);
  const [mainImage, setMainImage] = useState(selectedVariant.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [openMiniCart, setOpenMiniCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const discountPercent = Math.round(
    ((product.price - product.offerprice) / product.price) * 100
  );

  useEffect(() => {
    setMainImage(selectedVariant.images[0]);
  }, [selectedVariant]);

  // -------------------------
  // ADD TO CART
  // -------------------------
  const handleAddToCart = () => {
    if (!isAuthenticated) return toast.error("Please login");
    if (!selectedSize) return toast.error("Please select a size");

    dispatch(
      addToCart({
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedVariant.color,
      })
    );

    setOpenMiniCart(true);
    toast.success("Added to Bag");
  };

  // -------------------------
  // BUY NOW
  // -------------------------
  const handleBuyNow = () => {
    if (!isAuthenticated) return toast.error("Please login");
    if (!selectedSize) return toast.error("Select a size");

  window.location.href = `/checkout-one/${product._id}?size=${selectedSize}&quantity=${quantity}&color=${selectedVariant.color}`;
  
  };

  // -------------------------
  // TOGGLE WISHLIST
  // -------------------------
  
  const toggleWishlistItem = () => {
    if (!isAuthenticated) return toast.error("Please login");
    dispatch(toggleWishlist(product._id));
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 pb-24">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4">

        {/* LEFT — IMAGE SECTION */}
        <div className="flex gap-4">

          {/* Vertical Thumbnails */}
          <div className="hidden lg:flex flex-col gap-3 pt-4">
            {selectedVariant.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setMainImage(img)}
                className={`w-24 h-24 border cursor-pointer overflow-hidden rounded 
                  ${
                    mainImage === img
                      ? "border-black"
                      : "border-gray-300 hover:border-black"
                  }`}
              >
                <Image
                  src={img}
                  alt="thumb"
                  width={90}
                  height={90}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* MAIN IMAGE */}
          <motion.div
            key={mainImage}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            className="flex-1 border bg-white p-3 rounded-xl shadow-sm"
          >
            <div className="relative w-full aspect-square rounded-xl">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-contain rounded-xl"
              />

              {/* Discount */}
              {discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs rounded-full flex items-center">
                  <Tag className="w-3 h-3 mr-1" /> -{discountPercent}%
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* MOBILE THUMBNAILS */}
        <div className="lg:hidden flex gap-2 mt-4 overflow-x-auto">
          {selectedVariant.images.map((img, i) => (
            <div
              key={i}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 border flex-shrink-0 rounded cursor-pointer ${
                mainImage === img
                  ? "border-black"
                  : "border-gray-300 hover:border-gray-500"
              }`}
            >
              <Image
                src={img}
                alt="thumb"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* RIGHT — PRODUCT DETAILS */}
        <div className="space-y-6">

          {/* TITLE */}
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="uppercase text-gray-500 text-sm">{product.brand}</p>

          {/* PRICE */}
          <div className="flex items-center gap-3 text-2xl">
            <span className="font-bold text-black">₹{product.offerprice}</span>
            <span className="line-through text-gray-500 text-lg">
              ₹{product.price}
            </span>
            {discountPercent > 0 && (
              <span className="text-green-600 text-base font-medium">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* RATING */}
          <div className="flex items-center text-sm gap-2">
            <div className="flex items-center border px-2 py-1 rounded">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="ml-1">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-600">
              {product.reviewCount} Reviews
            </span>
          </div>

          {/* COLORS */}
          <div>
            <p className="text-sm mb-1">
              Color: <span className="font-semibold">{selectedVariant.color}</span>
            </p>
            <div className="flex gap-3">
              {colorVariants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVariant(v)}
                  className="w-8 h-8 rounded-full border-2"
                  style={{
                    backgroundColor: v.hex,
                    borderColor:
                      selectedVariant.color === v.color ? "black" : "#bbb",
                  }}
                />
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm">Select Size</p>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="underline text-gray-600 text-xs"
              >
                Size Guide
              </button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2 text-sm rounded border ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-gray-200 border-gray-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div>
            <p className="text-sm mb-2">Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="border p-2 rounded"
              >
                <Minus size={18} />
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="border p-2 rounded"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3 mt-4">
      <button
  onClick={toggleWishlistItem}
  className="w-1/2 flex justify-center items-center py-1.5 border rounded-md text-sm"
>
  <Heart className={`w-4 h-4 ${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
  <span className="ml-1">Wishlist</span>
</button>

<button
  onClick={handleBuyNow}
  className="w-1/2 py-1.5 rounded-md bg-black text-white text-sm"
>
  Buy Now
</button>


          </div>

          {/* ADD TO BAG */}
     <button
  onClick={handleAddToCart}
  className="w-full bg-black text-white py-1.5 mt-3 rounded-md flex items-center justify-center gap-2 text-sm"
>
  <ShoppingCart size={15} />
  ADD TO CART
</button>

          {/* PRODUCT DETAILS SECTION */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>

            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-600">Fit</span>
                <span>{product.fit}</span>
              </div>

              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-600">Sleeve</span>
                <span>{product.sleeve}</span>
              </div>

              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-600">Neck</span>
                <span>{product.neck}</span>
              </div>

              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-600">Material</span>
                <span>{product.materials.join(", ")}</span>
              </div>
            </div>
          </div>

          <MiniCart isOpen={openMiniCart} onClose={() => setOpenMiniCart(false)} />
        </div>
      </div>

      {/* -----------------------------
          SIZE GUIDE POPUP
      ----------------------------- */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-3">Size Guide</h2>

            <Image
              src="/size-guide.jpg"
              width={500}
              height={500}
              alt="Size Guide"
              className="rounded w-full"
            />

            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full mt-4 py-2 bg-black text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

     
      <CategoryHeadingRow/>
      
    </div>
  );
}
    