"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axios"

export default function ProductDetails() {
  const [product, setProduct] = useState(null);

  const params = useParams();
const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  useEffect(() => {
    axios.get(`/products/${slug}`).then(res => {
      setProduct(res.data.product);
    });
  }, [slug]);

  if (!product) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-10">
      
      <div className="flex-1">
        <img src={product.images[0]} className="w-full rounded-lg object-cover"/>
      </div>

      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.brand}</p>
        <p className="text-3xl font-semibold text-indigo-600">₹{product.offerprice}</p>

        {product.sizes?.length > 0 && (
          <div>
            <p className="font-medium">Sizes</p>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((s) => (
                <button key={s} className="px-3 py-1 border rounded hover:bg-black hover:text-white">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
