'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (!isAuthenticated) return toast.error("Please login");
    dispatch(toggleWishlist(product._id));
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const discount =
    product.price > product.offerprice
      ? Math.round(((product.price - product.offerprice) / product.price) * 100)
      : 0;

  return (
    <div className="group bg-white border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">

      <Link href={`/products/${product._id}`}>

        {/* IMAGE AREA (larger) */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 ">
          <Image
            src={product.images?.[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* MOBILE ❤️ SMALL ICON */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 md:hidden p-1 bg-white/90 rounded-full shadow"
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist ? "fill-red-500 text-red-500" : "text-neutral-600"
              }`}
            />
          </button>

          {/* SMALLER RATING BOX */}
          {product.rating > 0 && (
            <div className="absolute bottom-2 left-2 bg-white px-1.5 py-0.5 rounded shadow flex items-center">
              <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-[9px] font-semibold">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* TEXT AREA (reduced padding & cleaner) */}
        <div className="px-3 py-1">

          <p className="text-[10px] font-medium text-neutral-500 line-clamp-1">
            {product.brand || product.category}
          </p>

          <h3 className="text-[11px] text-neutral-700 font-normal mt-0.5 leading-tight line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-[13px] font-bold text-black">₹{product.offerprice}</span>

            {product.price > product.offerprice && (
              <span className="text-[10px] line-through text-neutral-400">
                ₹{product.price}
              </span>
            )}

            {discount > 0 && (
              <span className="text-[9px] text-green-600 font-semibold">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* DESKTOP WISHLIST BUTTON */}
      <div className="p-3 hidden md:block">
        <button
          onClick={handleWishlistToggle}
          className="w-full flex items-center justify-center gap-2 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-all"
        >
          <Heart
            className={`w-5 h-5 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-neutral-700"
            }`}
          />
          <span className="text-sm font-medium">
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </span>
        </button>
      </div>
    </div>
  );
}
