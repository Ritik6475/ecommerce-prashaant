"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function BuyNowClient({ productId }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const selectedSize = searchParams.get("size");
  const quantity = Number(searchParams.get("quantity") || 1);

  const [product, setProduct] = useState(null);
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  // ❗ FIXED: handleChange was missing and crashing the entire page
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Load product
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!selectedSize) {
      router.push(`/products/${productId}`);
      return;
    }

    const load = async () => {
      try {
        const { data } = await axios.get(`/products/${productId}`);
        setProduct(data);
      } catch (err) {
        console.log(err);
        toast.error("Product not found");
      }
    };

    load();
  }, [productId, isAuthenticated]);

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const totalAmount = product.offerprice * quantity;

      const orderRes = await axios.post("/orders", {
        items: [
          {
            product: product._id,
            size: selectedSize,
            quantity,
            price: product.offerprice,
          },
        ],
        totalAmount,
        address: formData,
      });

      const paymentRes = await axios.post("/payment/create-order", {
        amount: totalAmount,
        orderId: orderRes.data.order._id,
      });

      const ok = await loadRazorpay();
      if (!ok) return toast.error("Payment gateway failed");

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: paymentRes.data.order.id,
        amount: paymentRes.data.order.amount,
        currency: paymentRes.data.order.currency,
        handler: async (response) => {
          await axios.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: orderRes.data.order._id,
          });

          toast.success("Payment Successful!");
          router.push(`/orders/${orderRes.data.order._id}`);
        },
      });

      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment Failed");
    }

    setProcessing(false);
  };

  if (!product) {
    return (
      <div className="py-24 text-center text-xl font-medium">
        Loading…
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Buy Now</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* FORM SECTION */}
        <form
          onSubmit={handlePayment}
          className="lg:col-span-2 border p-6 rounded-xl shadow space-y-6"
        >
          <h2 className="text-xl font-semibold">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input-field" name="firstName" placeholder="First Name" required onChange={handleChange} value={formData.firstName}/>
            <input className="input-field" name="lastName" placeholder="Last Name" required onChange={handleChange} value={formData.lastName}/>
            <input className="input-field" name="email" placeholder="Email" type="email" required onChange={handleChange} value={formData.email}/>
            <input className="input-field" name="phone" placeholder="Phone" required onChange={handleChange} value={formData.phone}/>
          </div>

          <h2 className="text-xl font-semibold">Shipping Address</h2>

          <input className="input-field" name="street" placeholder="Street Address" required onChange={handleChange} value={formData.street}/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input className="input-field" name="city" placeholder="City" required onChange={handleChange} value={formData.city}/>
            <input className="input-field" name="state" placeholder="State" required onChange={handleChange} value={formData.state}/>
            <input className="input-field" name="postalCode" placeholder="Postal Code" required onChange={handleChange} value={formData.postalCode}/>
            <input className="input-field bg-gray-100" value="India" readOnly />
          </div>

          <button
            disabled={processing}
            className="w-full bg-black text-white font-semibold text-lg py-3 rounded-lg"
          >
            {processing
              ? "Processing…"
              : `Pay ₹${(product.offerprice * quantity).toFixed(2)}`}
          </button>
        </form>

        {/* ORDER SUMMARY */}
        <div className="border p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm mb-3">
            <span>{product.name}</span>
            <span>₹{product.offerprice} × {quantity}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{(product.offerprice * quantity).toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
