"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Tag } from "lucide-react";

export default function ProductImageGallery({
  images,
  productName,
  discountPercent,
}) {
  const [mainImage, setMainImage] = useState(images[0]);

  // Reset image when variant changes
  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  return (
    <div className="flex gap-4 w-full">

      {/* ---------- DESKTOP THUMBNAILS (LEFT) ---------- */}
      <div className="hidden lg:flex flex-col gap-3 pt-4">
        {images.map((img) => (
          <button
            key={img}
            onClick={() => setMainImage(img)}
            className={`w-24 h-24 border rounded ${
              mainImage === img ? "border-black" : "border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt="thumbnail"
              width={90}
              height={90}
              className="object-contain"
            />
          </button>
        ))}
      </div>

      {/* ---------- MAIN IMAGE ---------- */}
      <div className="relative w-full flex flex-col items-center">

        {/* MOBILE MAIN IMAGE */}
        <div className="lg:hidden relative w-full aspect-[4/5] bg-gray-100">
          <Image
            src={mainImage}
            alt={productName}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* DESKTOP MAIN IMAGE */}
        <div className="hidden lg:block relative aspect-square w-full bg-white border rounded-xl p-3">
          <Image
            src={mainImage}
            alt={productName}
            fill
            priority
            sizes="50vw"
            className="object-contain rounded-xl"
          />
        </div>

        {/* DISCOUNT TAG */}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs rounded-full flex items-center z-10">
            <Tag className="w-3 h-3 mr-1" />-{discountPercent}%
          </span>
        )}

        {/* ---------- MOBILE THUMBNAILS (CENTERED) ---------- */}
        <div className="lg:hidden flex justify-center w-full mt-3">
          <div className="flex gap-2 overflow-x-auto px-2">
            {images.map((img) => (
              <button
                key={img}
                onClick={() => setMainImage(img)}
                className={`min-w-[72px] h-[72px] border rounded ${
                  mainImage === img ? "border-black" : "border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt="thumbnail"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
