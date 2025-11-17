'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, Shield, Truck, RotateCcw, Tag, Gift, CreditCard, ShoppingCart } from 'lucide-react';
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  selectCartTotal,
} from '@/store/slices/cartSlice';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const total = useSelector(selectCartTotal);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchCart());
  }, [dispatch, isAuthenticated]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ itemId, quantity: newQuantity }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.success('Removed from cart');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Your Cart</h1>
          <p className="text-gray-600 mb-6">Please login to view your cart</p>
          <Link href="/login" className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="bg-gray-200 w-24 h-32 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add products to get started</p>
          <Link href="/products" className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const savings = items.reduce((a, i) => a + (i.product.price - i.product.offerprice) * i.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container-custom py-6 px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Shopping Bag</h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
            <span className="mx-2">•</span>
            <span className="text-green-600 font-medium">You're saving ₹{savings}</span>
          </div>
        </div>

        {/* Savings Banner */}
        <div className="bg-black text-white rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            <span className="font-medium">You are saving ₹{savings} on this order!</span>
          </div>
          <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
            {Math.round((savings / (savings + total)) * 100)}% OFF
          </span>
        </div>

        {/* Offer Highlight Box */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-start">
          <Gift className="w-5 h-5 mr-3 mt-0.5 text-yellow-600" />
          <div>
            <p className="font-semibold text-sm">Buy 2 for 1099 offer applied!</p>
            <p className="text-xs text-gray-600 mt-1">Add 1 more item to save more.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                   
                  </div>

                  <div className="flex-1 min-w-0">
                    <div>
                      <p className="font-medium text-gray-900 ">{item.product.brand}</p>
                      <p className="text-sm text-gray-500 truncate">{item.product.name}</p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Size: {item.size}</span>
                        {item.color && <span className="text-xs bg-gray-100 px-2 py-1 rounded">Color: {item.color}</span>}
                      </div>

                      <div className="flex items-center mt-2 text-xs text-green-600">
                        <Truck className="w-3 h-3 mr-1" />
                        <p className="text-xs text-green-600 mt-1">Ships within a few days!</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Price */}
                        <div>
                          <p className="font-bold text-gray-900 mr-3">₹{item.product.offerprice}</p>
                         </div>

                        {/* QTY Control */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button 
                            className="px-2 py-1 hover:bg-gray-100" 
                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-sm font-medium min-w-[1.5rem] text-center">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 hover:bg-gray-100" 
                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button 
                          onClick={() => handleRemove(item._id)} 
                          className="p-1.5 rounded hover:bg-red-50 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm sticky top-6">
              <h2 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{(total + savings).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-₹{savings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {/* Coupon / Offers Section */}
              <div className="mt-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center mb-1">
                  <CreditCard className="w-4 h-4 mr-2 text-gray-700" />
                  <p className="font-semibold text-sm">Best Offer Unlocked</p>
                </div>
                <p className="text-xs text-gray-700">Use <span className="font-bold bg-gray-200 px-1.5 py-0.5 rounded text-xs">GETCASH10</span> for extra 10% cashback.</p>
              </div>

              {/* Security Badge */}
              <div className="mt-4 flex items-center text-xs text-gray-600">
                <Shield className="w-3 h-3 mr-1.5 text-green-600" />
                <span>Secure checkout • Money back guarantee</span>
              </div>

              <Link 
                href="/checkout" 
                className="block w-full bg-black text-white mt-5 py-3 rounded-lg text-center font-medium hover:bg-gray-800 transition-colors"
              >
                PROCEED TO CHECKOUT
              </Link>

              <p className="text-xs text-gray-500 text-center mt-3">
                By proceeding, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Checkout (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 lg:hidden z-10">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-bold">₹{total.toFixed(2)}</p>
          </div>
          <Link 
            href="/checkout" 
            className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center"
          >
            Checkout
            <span className="ml-2 bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}