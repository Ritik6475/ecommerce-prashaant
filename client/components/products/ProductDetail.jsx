"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ShoppingCart,
  Heart,
  Star,
  Tag,
  Minus,
  Plus,
} from "lucide-react";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import ProductImageGallery from "./ProductImageSlider";
import ProductReviews from "./ProductReviews";


import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  AlertCircle,
  ChevronDown,
} from "lucide-react";


const MiniCart = dynamic(() => import("../cart/minicart"), { ssr: false });
const CategoryHeadingRow = dynamic(
  () => import("../home/CategoryHeadingRow"),
  { ssr: false }
);
const MotionDiv = dynamic(
  () => import("framer-motion").then((m) => m.motion.div),
  { ssr: false }
);

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, wishlistItems } = useSelector(
    (state) => ({
      isAuthenticated: state.auth.isAuthenticated,
      wishlistItems: state.wishlist.items,
    }),
    shallowEqual
  );

  const colorVariants = useMemo(
    () =>
      product.colorVariants?.length
        ? product.colorVariants
        : [{ color: product.colors?.[0], images: product.images }],
    [product]
  );

  const discountPercent = useMemo(() => {
    if (!product.price || !product.offerprice) return 0;
    return Math.round(
      ((product.price - product.offerprice) / product.price) * 100
    );
  }, [product.price, product.offerprice]);

  const isInWishlist = useMemo(
    () => wishlistItems.some((i) => i._id === product._id),
    [wishlistItems, product._id]
  );

  const [selectedVariant, setSelectedVariant] = useState(colorVariants[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [openMiniCart, setOpenMiniCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const handleVariantChange = useCallback((v) => {
    setSelectedVariant(v);
    setMainImage(v.images[0]);
  }, []);

  const handleAddToCart = useCallback(() => {
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
  }, [
    isAuthenticated,
    selectedSize,
    quantity,
    selectedVariant.color,
    product._id,
    dispatch,
  ]);

  const handleBuyNow = useCallback(() => {
    if (!isAuthenticated) return toast.error("Please login");
    if (!selectedSize) return toast.error("Select a size");

    router.push(
      `/checkout-one/${product._id}?size=${selectedSize}&quantity=${quantity}&color=${selectedVariant.color}`
    );
  }, [
    isAuthenticated,
    selectedSize,
    quantity,
    selectedVariant.color,
    product._id,
    router,
  ]);

  const handleWishlistToggle = useCallback(() => {
    if (!isAuthenticated) return toast.error("Please login");
    dispatch(toggleWishlist(product._id));
    toast.success(
      isInWishlist ? "Removed from wishlist" : "Added to wishlist"
    );
  }, [dispatch, isAuthenticated, isInWishlist, product._id]);


  const ImageWrapper = MotionDiv ?? "div";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 pb-24">
    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4 mt-4">
        <div className="flex gap-4">
          
      
{/* ---------- IMAGE SECTION ---------- */}

<ProductImageGallery
  images={selectedVariant.images}
  productName={product.name}
  discountPercent={discountPercent}
/>


        </div>


        <div className="space-y-3">

          {/* Breadcrumb */}
<nav className="text-sm text-gray-500 mb-4 mt-4">
  <ol className="flex items-center gap-1 flex-wrap">
    <li
      className="cursor-pointer hover:text-black text-sm"
      onClick={() => router.push("/")}
    >
      Home
    </li>
    <span>/</span>

    <li className="text-black font-medium">
      {product.category}
    </li>
  </ol>
</nav>

          <h1 className="text-3xl font-semibold mt-4">{product.name}</h1>
          <p className="uppercase text-gray-500 text-sm">{product.brand}</p>

          <div className="flex items-center gap-3 text-2xl">
            <span className="font-bold">₹{product.offerprice}</span>
            <span className="line-through text-gray-500">₹{product.price}</span>
            {discountPercent > 0 && (
              <span className="text-green-600 text-base">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center border px-2 py-1 rounded">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="ml-1">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-600">
              {product.reviewCount} Reviews
            </span>
          </div>

          <div>
            <p className="text-sm mb-1">
              Color: <strong>{selectedVariant.color}</strong>
            </p>
            <div className="flex gap-3">
              {colorVariants.map((v) => (
                <button
                  key={v.color}
                  onClick={() => handleVariantChange(v)}
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

          <div>
            <div className="flex justify-between mb-1">
              <p className="text-sm">Select Size</p>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="underline text-xs text-gray-600"
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

          <div className="flex gap-3">
            <button
              onClick={handleWishlistToggle}
              className="w-1/2 border rounded-md py-2 flex justify-center gap-2"
            >
              <Heart
                className={
                  isInWishlist
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                }
              />
              Wishlist
            </button>
            <button
              onClick={handleBuyNow}
              className="w-1/2 bg-black text-white rounded-md"
            >
              Buy Now
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-2 rounded-md flex justify-center gap-2"
          >
            <ShoppingCart size={16} /> ADD TO CART
          </button>

<div className="grid grid-cols-3 gap-4 pt-6 border-t">
  <div className="text-center">
    <Truck className="mx-auto w-6 h-6 text-gray-600 mb-1" />
    <p className="text-xs font-semibold">Free Shipping</p>
    <p className="text-xs text-gray-500">Above ₹500</p>
  </div>

  <div className="text-center">
    <ShieldCheck className="mx-auto w-6 h-6 text-gray-600 mb-1" />
    <p className="text-xs font-semibold">Secure Payment</p>
    <p className="text-xs text-gray-500">100% safe</p>
  </div>

  <div className="text-center">
    <RotateCcw className="mx-auto w-6 h-6 text-gray-600 mb-1" />
    <p className="text-xs font-semibold">Easy Returns</p>
    <p className="text-xs text-gray-500">30 days</p>
  </div>
</div>

          <div className="pt-6 pb-4 border-t">
           
            <div className="pt-8 pb-6">
  {/* Aesthetic Header with Gradient Text */}
  <div className="mb-6">
    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Product Details</h3>
    <div className="h-1 w-12 bg-indigo-600 mt-2 rounded-full"></div>
  </div>

  {/* Styled Description */}
  <p className="text-slate-600 leading-relaxed text-lg mb-8 font-light">
    {product.description}
  </p>

  {/* Bento Grid Layout */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
    {/* Fit Card */}
    <div className="group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-500 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fit</p>
          <p className="text-slate-800 font-medium">{product.fit}</p>
        </div>
      </div>
    </div>

    {/* Sleeve Card */}
    <div className="group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-500 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.4a1.6 1.6 0 00-1.12-.4L16 2a4 4 0 01-8 0L3.74 3a1.6 1.6 0 00-1.12.4 1.6 1.6 0 00-.4 1.12l.58 3.48a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.48a1.6 1.6 0 00-.4-1.12z"/></svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sleeve</p>
          <p className="text-slate-800 font-medium">{product.sleeve}</p>
        </div>
      </div>
    </div>

    {/* Neck Card */}
    <div className="group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-500 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2"/></svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Neck</p>
          <p className="text-slate-800 font-medium">{product.neck}</p>
        </div>
      </div>
    </div>

    {/* Material Card */}
    <div className="group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-500 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Material</p>
          <p className="text-slate-800 font-medium">{product.materials.join(", ")}</p>
        </div>
      </div>
    </div>

  </div>
</div>
        
        <ProductReviews />


        

          </div>


    {openMiniCart && (
            <MiniCart
              isOpen={openMiniCart}
              onClose={() => setOpenMiniCart(false)}
            />
          )}
        </div>
      </div>

      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-3">Size Guide</h2>
            <Image
              src="/size-guide.jpg"
              width={500}
              height={500}
              loading="lazy"
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

      <CategoryHeadingRow />
    </div>  
  );
}




