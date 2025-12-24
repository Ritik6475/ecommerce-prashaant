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
  const [mainImage, setMainImage] = useState(colorVariants[0].images[0]);
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

  const thumbnails = useMemo(
    () =>
      selectedVariant.images.map((img) => (
        <button
          key={img}
          onClick={() => setMainImage(img)}
          className={`w-24 h-24 border rounded ${
            mainImage === img ? "border-black" : "border-gray-300"
          }`}
        >
          <Image src={img} alt="thumb" width={90} height={90} loading="lazy" />
        </button>
      )),
    [selectedVariant.images, mainImage]
  );

  const ImageWrapper = MotionDiv ?? "div";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4 mt-4">
        <div className="flex gap-4">
          <div className="hidden lg:flex flex-col gap-3 pt-4">
            {thumbnails}
          </div>

          <ImageWrapper className="flex-1 border bg-white p-3 rounded-xl">
            <div className="relative aspect-square">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain rounded-xl"
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs rounded-full flex items-center">
                  <Tag className="w-3 h-3 mr-1" />-{discountPercent}%
                </span>
              )}
            </div>
          </ImageWrapper>
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
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <p className="text-sm text-gray-700">{product.description}</p>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="flex justify-between">
                <span>Fit</span>
                <span>{product.fit}</span>
              </div>
              <div className="flex justify-between">
                <span>Sleeve</span>
                <span>{product.sleeve}</span>
              </div>
              <div className="flex justify-between">
                <span>Neck</span>
                <span>{product.neck}</span>
              </div>
              <div className="flex justify-between">
                <span>Material</span>
                <span>{product.materials.join(", ")}</span>
              </div>
            </div>
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
