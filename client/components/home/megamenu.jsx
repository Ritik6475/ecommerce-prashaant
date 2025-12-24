"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, brands } from "@/app/constants/headerdata";

export default function MegaMenu({ gender, onClose }) {
  if (!categories[gender]) return null;

  return (
    <div
      className="absolute left-1/2 top-full w-screen max-w-5xl bg-white shadow-2xl p-8 z-[999] -translate-x-1/2"
      onMouseLeave={onClose}
    >
      {/* Categories */}
      <div className="grid grid-cols-4 gap-8">
        {categories[gender].map((block) => (
          <div key={block.title}>
            <h3 className="text-sm font-bold mb-4 border-b pb-2">
              {block.title}
            </h3>

            <ul className="space-y-3">
              {block.items.map((item) => (
                <li key={item}>
                  <Link
                    href={`/products?category=${encodeURIComponent(
                      item.toLowerCase()
                    )}&gender=${gender}`}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Brands */}
      <div className="mt-8 pt-8 border-t">
        <h4 className="text-xs font-semibold uppercase text-gray-500 mb-4">
          Shop by Brand
        </h4>

        <div className="grid grid-cols-7 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="h-16 flex items-center justify-center bg-gray-50 rounded hover:shadow transition"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={30}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
