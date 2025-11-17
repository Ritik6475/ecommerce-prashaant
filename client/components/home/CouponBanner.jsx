'use client';

export default function CouponBanner() {
  return (
    <div className="w-full px-4 mt-4">
      <div className="w-full bg-gradient-to-r from-[#ffecd2] to-[#fcb69f] rounded-2xl py-4 px-5 flex items-center justify-between shadow-md">

        {/* Left Section */}
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text">
            Get 25% Off
          </h2>

          <p className="text-sm text-gray-700 font-medium mt-1">
            Up To ₹200 Off*
          </p>
        </div>

        {/* Divider / Center coupon */}
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-300 shadow-sm flex flex-col items-center">
          <span className="text-[10px] font-semibold text-gray-500 tracking-wide">
            COUPON CODE
          </span>
          <span className="text-sm md:text-base font-extrabold tracking-wide text-gray-900">
            SAVE25
          </span>
        </div>

        {/* Percentage icon */}
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          %
        </div>
      </div>

      <p className="text-[11px] text-gray-500 mt-1 ml-1">
        On Your First Order | T&C Apply
      </p>
    </div>
  );
}
