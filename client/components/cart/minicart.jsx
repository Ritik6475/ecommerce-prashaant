'use client';

import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItem, removeFromCart, selectCartTotal } from "@/store/slices/cartSlice";

export default function MiniCart({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const total = useSelector(selectCartTotal);

  const handleUpdateQuantity = (id, qty) => {
    if (qty < 1) return;
    dispatch(updateCartItem({ itemId: id, quantity: qty }));
  };

  const handleRemove = (id) => dispatch(removeFromCart(id));

  return (
    <div className={`fixed inset-0 z-[999] ${isOpen ? "visible" : "invisible"}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-screen w-[380px] max-w-[90vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {items.length === 0 && (
            <p className="text-gray-500 text-sm text-center pt-20">Your cart is empty.</p>
          )}

          {items.map((item) => (
            <div key={item._id} className="flex items-start gap-4 border-b pb-4">
              {/* Image */}
              <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  fill 
                  className="object-cover" 
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight line-clamp-2 mb-1">
                  {item.product.name}
                </p>
                <p className="text-xs text-gray-600 mb-2">₹{item.product.offerprice}</p>

                {/* Quantity */}
                <div className="flex items-center border rounded-lg overflow-hidden h-8 w-28">
                  <button 
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <span className="flex-1 text-center text-sm font-medium">
                    {item.quantity}
                  </span>

                  <button 
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button 
                onClick={() => handleRemove(item._id)} 
                className="text-gray-400 hover:text-red-500 p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t bg-gray-50">
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-600">Total:</span>
            <span className="text-red-600 font-semibold">₹{total.toFixed(2)}</span>
          </div>

          <div className="flex gap-3">
            <Link 
              href="/cart" 
              onClick={onClose} 
              className="w-1/2 border border-gray-300 py-3 text-center text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Cart
            </Link>

            <Link 
              href="/checkout" 
              onClick={onClose} 
              className="w-1/2 bg-black text-white py-3 text-center text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}