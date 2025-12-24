"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function BuyNowClient({ productId }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSize = searchParams.get("size");
  const quantity = Number(searchParams.get("quantity") || 1);
  const selectedColor = searchParams.get("color") || "As per image";

  const [product, setProduct] = useState(null);
  const [processing, setProcessing] = useState(false);
  const razorpayLoaded = useRef(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    confirmPhone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  /* ----------------------------
     LOAD PRODUCT
  ----------------------------- */
  useEffect(() => {
    if (!selectedSize) {
      router.push(`/products/${productId}`);
      return;
    }

    const loadProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${productId}`);
        setProduct(data);
      } catch {
        toast.error("Product not found");
      }
    };

    loadProduct();
  }, [productId, selectedSize, router]);

  /* ----------------------------
     LOAD RAZORPAY SCRIPT ONCE
  ----------------------------- */
  useEffect(() => {
    if (razorpayLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => (razorpayLoaded.current = true);
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ----------------------------
     PAYMENT HANDLER
  ----------------------------- */
  const handlePayment = async (e) => {
    e.preventDefault();
    if (processing) return;

    setProcessing(true);

    try {
      if (formData.phone !== formData.confirmPhone) {
        throw new Error("Phone numbers do not match");
      }

      if (formData.phone.length !== 10) {
        throw new Error("Phone number must be 10 digits");
      }

      /* 1️⃣ CREATE ORDER – NO AMOUNT SENT */
      const { data: orderRes } = await axios.post("/orders", {
        items: [
          {
            product: product._id,
            size: selectedSize,
            color: selectedColor,
            quantity,
            price: product.offerprice,
          },
        ],
        address: formData,
      });

      const orderId = orderRes.order._id;

      /* 2️⃣ CREATE RAZORPAY ORDER */
      const { data: paymentRes } = await axios.post("/payment/create-order", {
        orderId,
      });

      if (!window.Razorpay) {
        toast.error("Payment gateway not loaded");
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: paymentRes.order.id,
        currency: "INR",
        name: "Elegant Vogue",
        description: "Buy Now Payment",

        handler: async (response) => {
          try {
            /* 3️⃣ VERIFY PAYMENT */
            await axios.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            });

            toast.success("Payment Successful!");
            router.push(`/order/${orderId}`);
          } catch {
            toast.error("Payment verification failed");
          }
        },
      });

      rzp.on("payment.failed", () => {
        toast.error("Payment failed");
      });

      rzp.open();
    } catch (err) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setProcessing(false);
    }
  };

  /* ----------------------------
     LOADING STATE
  ----------------------------- */
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-gray-900 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading product details...</p>
        </div>
      </div>
    );
  }

  /* ----------------------------
     RENDER
  ----------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-2xl font-normal text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600 text-sm mb-6">
          Complete your purchase in just a few steps
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT SECTION */}
          <div className="lg:w-2/3 space-y-4">
            {/* Contact Info */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-900 text-white px-4 py-3">
                <h2 className="text-base font-medium">Contact Information</h2>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {["firstName", "lastName", "email", "phone", "confirmPhone"].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-xs text-gray-600 mb-1">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type={
                          field.includes("email")
                            ? "email"
                            : field.includes("phone")
                            ? "tel"
                            : "text"
                        }
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ADDRESS */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-900 text-white px-4 py-3">
                <h2 className="text-base font-medium">Shipping Address</h2>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {["street", "city", "state", "postalCode"].map((field) => (
                  <div
                    key={field}
                    className={field === "street" ? "md:col-span-2" : ""}
                  >
                    <label className="block text-xs text-gray-600 mb-1">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-900 text-white px-4 py-3">
                <h2 className="text-base font-medium">Payment Method</h2>
              </div>

              <div className="p-4">
                <div className="p-3 border border-gray-900 rounded-md bg-gray-50">
                  <div className="flex items-center">
                    <input type="radio" checked readOnly />
                    <label className="ml-2 text-sm">Pay with Razorpay</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg border border-gray-200 sticky top-4 p-4">
              <h2 className="text-base font-medium mb-3">Order Summary</h2>

              <div className="flex items-start bg-gray-50 p-3 rounded-md mb-4">
                <img
                  src={product.images[0]}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Size: {selectedSize}
                  </p>
                  <p className="text-xs text-gray-500">
                    Color: {selectedColor}
                  </p>

                  <div className="flex justify-between mt-2">
                    <span className="text-sm font-medium text-gray-900">
                      ₹{(product.offerprice * quantity).toFixed(2)}
                    </span>
                    <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded">
                      Qty: {quantity}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full py-3 bg-gray-900 text-white rounded-md disabled:opacity-50"
              >
                {processing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FOOTER BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 md:hidden border-t">
        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full py-3 bg-gray-900 text-white rounded-md disabled:opacity-50"
        >
          {processing ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
