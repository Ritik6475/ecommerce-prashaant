'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchWishlist, selectWishlistItems } from '@/store/slices/wishlistSlice';
import ProductCard from '@/components/products/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector(selectWishlistItems);
  const { loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchWishlist());
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center x">
        <div className="max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Wishlist</h1>
          <p className="text-gray-600 mb-8">Please login to view your wishlist</p>
          <Link href="/login" className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">Save your favorite items for later</p>
          <Link href="/products" className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 mt-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Heart className="w-6 h-6 text-red-500 mr-2" />
          My Wishlist ({wishlistItems.length})
        </h1>
        <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {wishlistItems.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}