export default function ProductInfo({ product, discount }) {
  return (
    <div className="px-4 pt-4 space-y-2 lg:px-0">
      <h1 className="text-lg lg:text-3xl font-semibold leading-snug">
        {product.name}
      </h1>

      <p className="uppercase text-xs lg:text-sm text-gray-500">
        {product.brand}
      </p>

      <div className="flex items-center gap-2">
        <span className="text-xl lg:text-2xl font-bold">
          ₹{product.offerprice}
        </span>
        <span className="line-through text-gray-400 text-sm">
          ₹{product.price}
        </span>
        <span className="text-red-600 text-sm font-medium">
          {discount}% OFF
        </span>
      </div>

      <p className="text-orange-500 text-xs font-medium">
        Only Few Left!
      </p>
    </div>
  );
}
