import { Minus, Plus, Heart } from "lucide-react";

export default function ProductActions({
  product,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  onBuyNow,
  onWishlist,
  isInWishlist,
}) {
  return (
    <div className="px-4 pt-4 space-y-4 lg:px-0">

      {/* SIZE */}
      <div>
        <div className="flex justify-between mb-2">
          <p className="text-sm font-medium">Select Size</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-full border text-sm ${
                selectedSize === size
                  ? "border-pink-600 text-pink-600"
                  : "border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* QUANTITY */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="border p-2 rounded"
        >
          <Minus size={16} />
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity(q => q + 1)}
          className="border p-2 rounded"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* WISHLIST */}
      <button
        onClick={onWishlist}
        className="flex items-center gap-2 text-sm"
      >
        <Heart className={isInWishlist ? "fill-red-500 text-red-500" : ""} />
        Wishlist
      </button>

      {/* DESKTOP CTA */}
      <div className="hidden lg:flex gap-3">
        <button
          onClick={onBuyNow}
          className="flex-1 bg-black text-white py-3 rounded-md"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
