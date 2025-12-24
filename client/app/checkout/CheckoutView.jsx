'use client';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { selectCartTotal, clearCart } from '@/store/slices/cartSlice';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { items } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const total = useSelector(selectCartTotal);
const [promoCode, setPromoCode] = useState('');

  const [processing, setProcessing] = useState(false);

  const razorpayLoaded = useRef(false);

  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: user?.phone || '',
    confirmPhone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [orderNotes, setOrderNotes] = useState('');

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
    if (items.length === 0) router.push('/cart');
  }, [isAuthenticated, items, router]);

  /** -------------------------
   * Load Razorpay Script ONCE
   * ------------------------*/
  useEffect(() => {
    if (razorpayLoaded.current) return;

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => (razorpayLoaded.current = true);
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /** -------------------------
   * MAIN PAYMENT HANDLER
   * ------------------------*/
  const handlePayment = async (e) => {
    e.preventDefault();
    if (processing) return;

    setProcessing(true);

    try {
      // Basic validation
      if (formData.phone !== formData.confirmPhone) {
        throw new Error('Phone numbers do not match');
      }

      if (formData.phone.length !== 10) {
        throw new Error('Phone number must be 10 digits');
      }

      // Prepare order items
      const orderItems = items.map((item) => ({
        product: item.product._id,
        size: item.size,
        quantity: item.quantity,
        price: item.product.offerprice,
        color: item.color ?? item.selectedColor ?? item.variant?.color ?? null
      }));

      /** -------------------------
       * 1️⃣ CREATE ORDER (DB)
       * ------------------------*/
      const { data: orderRes } = await axios.post('/orders', {
        items: orderItems,
        address: formData,
        deliveryOption,
        orderNotes
      });

      const orderId = orderRes.order._id;

      /** -------------------------
       * COD FLOW (NO RAZORPAY)
       * ------------------------*/
      if (paymentMethod === 'cod') {
        toast.success('Order placed successfully!');
        dispatch(clearCart());
        router.push(`/order/${orderId}`);
        return;
      }

      /** -------------------------
       * 2️⃣ CREATE RAZORPAY ORDER
       * (NO amount sent)
       * ------------------------*/
      const { data: paymentRes } = await axios.post('/payment/create-order', {
        orderId
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: paymentRes.order.id,
        currency: 'INR',
        name: 'Elegant Vogue',
        description: 'Order Payment',

        handler: async (response) => {
          try {
            /** -------------------------
             * 3️⃣ VERIFY PAYMENT
             * ------------------------*/
            await axios.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId
            });

            dispatch(clearCart());
            toast.success('Payment successful!');
            router.push(`/order/${orderId}`);
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },

        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },

        theme: { color: '#000000' }
      };

      if (!window.Razorpay) {
  toast.error('Payment gateway not loaded. Please try again.');
  return;
}

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', () => {
        toast.error('Payment failed. Please try again.');
      });

      razorpay.open();
    } catch (error) {
      toast.error(error.message || 'Checkout failed');
    } 
    
    finally {
      setProcessing(false);
    }
  
  
  };


  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="py-6">
          <h1 className="text-2xl font-normal text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-1 text-sm">Complete your purchase in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
          <div className="absolute top-3 left-0 w-2/3 h-0.5 bg-gray-900 z-0"></div>
          {['Cart', 'Details', 'Payment', 'Review'].map((step, i) => (
            <div key={i} className="flex flex-col items-center relative z-10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${i < 3 ? 'bg-gray-900 text-white' : 'bg-white border border-gray-900 text-gray-900'}`}>
                {i < 3 ? '✓' : i + 1}
              </div>
              <span className={`mt-1 text-xs ${i < 3 ? 'text-gray-900' : 'text-gray-500'}`}>{step}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Form */}
          <div className="lg:w-2/3 space-y-4">
            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-900 text-white px-4 py-3">
                <h2 className="text-base font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Contact Information
                </h2>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['firstName', 'lastName', 'email', 'phone', 'confirmPhone'].map((field) => (
                    <div key={field}>
                      <label className="block text-xs text-gray-600 mb-1 capitalize">
                        {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <input
                        type={field.includes('email') ? 'email' : field.includes('phone') ? 'tel' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-900 text-white px-4 py-3">
                <h2 className="text-base font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Shipping Address
                </h2>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['street', 'city', 'state', 'postalCode'].map((field) => (
                    <div key={field} className={field === 'street' ? 'md:col-span-2' : ''}>
                      <label className="block text-xs text-gray-600 mb-1 capitalize">
                        {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-900 text-white px-4 py-3">
                <h2 className="text-base font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                  Delivery Options
                </h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {[
                    { id: 'standard', name: 'Standard Delivery', time: '3-5 business days', price: 'FREE' },
                    { id: 'express', name: 'Express Delivery', time: '1-2 business days', price: '₹99' },
                    { id: 'overnight', name: 'Overnight Delivery', time: 'Next business day', price: '₹199' }
                  ].map((option) => (
                    <div 
                      key={option.id} 
                      className={`p-3 border rounded-md cursor-pointer text-sm ${deliveryOption === option.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}
                      onClick={() => setDeliveryOption(option.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${deliveryOption === option.id ? 'border-gray-900' : 'border-gray-300'}`}>
                            {deliveryOption === option.id && (
                              <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{option.name}</div>
                            <div className="text-xs text-gray-500">{option.time}</div>
                          </div>
                        </div>
                        <div className="font-medium">{option.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-900 text-white px-4 py-3">
                <h2 className="text-base font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                  Payment Method
                </h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <div className="p-3 border border-gray-900 rounded-md bg-gray-50">
                    <div className="flex items-center">
                 
                 <input
  type="radio"
  name="payment-method"
  checked={paymentMethod === 'razorpay'}
  onChange={() => setPaymentMethod('razorpay')}
/>

                      <label htmlFor="razorpay" className="ml-2 text-sm text-gray-900">Pay with Razorpay</label>
                      <span className="ml-auto px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">RECOMMENDED</span>
                 
                    </div>
                    <div className="flex items-center mt-2 ml-6">
                      <div className="flex -space-x-1">
                        <div className="w-6 h-4 bg-gray-800 rounded-sm flex items-center justify-center">
                          <span className="text-white text-xs">VISA</span>
                        </div>
                        <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                          <span className="text-white text-xs">MC</span>
                        </div>
                        <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                          <span className="text-white text-xs">UPI</span>
                        </div>
                        <div className="w-6 h-4 bg-gray-200 rounded-sm flex items-center justify-center">
                          <span className="text-gray-800 text-xs">NB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                    <input
  type="radio"
  name="payment-method"
  checked={paymentMethod === 'cod'}
  onChange={() => setPaymentMethod('cod')}
/>
                      <label htmlFor="cod" className="ml-2 text-sm text-gray-900">Cash on Delivery</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-900 text-white px-4 py-3">
                <h2 className="text-base font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                  </svg>
                  Promo Code
                </h2>
              </div>
              
              <div className="p-4">
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-r-md">
                    Apply
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <p>Available offers:</p>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>FLAT10 - Get 10% off on orders above ₹1000</li>
                    <li>WELCOME20 - 20% off for first time users</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-900 text-white px-4 py-3">
                <h2 className="text-base font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Order Notes
                </h2>
              </div>
              
              <div className="p-4">
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Special instructions for delivery"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg border border-gray-200 sticky top-4">
              <div className="bg-gray-900 text-white px-4 py-3">
                <h2 className="text-base font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  Order Summary
                </h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-start p-2 bg-gray-50 rounded-md">
                      <img src={item.product?.images[0]} alt={item.product?.name} className="w-12 h-12 object-cover rounded-md" />
                      <div className="ml-3 flex-1">
                        <h3 className="text-xs font-medium text-gray-900 line-clamp-2">{item.product?.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs font-medium text-gray-900">₹{(item.product?.offerprice * item.quantity).toFixed(2)}</span>
                          <span className="text-xs bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹0.00</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-red-600">-₹0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Total</span>
                      <span className="text-sm font-medium text-gray-900">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Button */}
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="hidden md:block w-full mt-4 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded-md transition-colors disabled:opacity-50"
                >
                  {processing ? 'Processing...' : `Place Order • ₹${total.toFixed(2)}`}
                </button>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-xs font-medium text-gray-900 mb-2">Security & Privacy</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-gray-600">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      Secure checkout with SSL encryption
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                      Your payment information is secure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200">
          <div className="bg-gray-900 text-white px-4 py-3">
            <h2 className="text-base font-medium flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Additional Information
            </h2>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-md p-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Payment Security</h3>
                <p className="text-xs text-gray-600">All transactions are secure and encrypted.</p>
              </div>
              
              <div className="border border-gray-200 rounded-md p-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Easy Returns</h3>
                <p className="text-xs text-gray-600">Return within 30 days for a full refund.</p>
              </div>
              
              <div className="border border-gray-200 rounded-md p-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">24/7 Support</h3>
                <p className="text-xs text-gray-600">Customer support available around the clock.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-600">Total</div>
            <div className="text-lg font-medium text-gray-900">₹{total.toFixed(2)}</div>
          </div>
          <button
            onClick={handlePayment}
            disabled={processing}
            className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded-md transition-colors disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}