'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CategoryShowcase() {
  const gender = "Men"; // ❗ Change if needed

  const topwear = [
    { name: "T-Shirts", img: "/Images/Topwear/Tshirts.png.png" },
    { name: "Hoodies", img: "/Images/Topwear/Hoodies.png.png" },
    { name: "Jackets", img: "/Images/Topwear/jacket.png.png" },
    { name: "Shirts", img: "/Images/Topwear/Shirts.png.png" },
    { name: "Sweaters", img: "/Images/Topwear/Sweaters.png.png" },
    { name: "Winterwear", img: "/Images/Topwear/Winterwear.png.png" },
  ];

  const bottomwear = [
    { name: "Jeans", img: "/Images/Bottomwear/Jeans.png.png" },
    { name: "Joggers", img: "/Images/Bottomwear/Joggers.png.png" },
    { name: "Pants", img: "/Images/Bottomwear/Pants.png.png" },
    { name: "Shorts", img: "/Images/Bottomwear/Shorts.png.png" },
    { name: "Cargos", img: "/Images/Bottomwear/Cargos.png.png" },
    { name: "Pyjamas", img: "/Images/Bottomwear/Pyjamas.png.png" },
  ];

  const buildUrl = (name) => 
    `/products?category=${encodeURIComponent(name.toLowerCase())}&gender=${gender}`;

  return (
    <div className="w-full px-4 mt-10">

      {/* ------------------ TOPWEAR ------------------ */}
      <h2 className="text-3xl font-extrabold">TOPWEAR</h2>
      <p className="text-sm text-gray-600 mb-4">
        Explore our latest premium topwear collection.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 -mx-px">
        {topwear.map((item, i) => (
          <Link href={buildUrl(item.name)} key={i}>
                 <div className="flex flex-col items-center cursor-pointer px-px">
              <div className="relative w-full h-48 sm:h-56 md:h-64 bg-white rounded-lg">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                />
            </div>
              <p className="mt-1 text-sm font-medium">{item.name}</p>
            </div>
   
          </Link>
        ))}
      </div>

      {/* ------------------ BOTTOMWEAR ------------------ */}
      <h2 className="text-3xl font-extrabold mt-10">BOTTOMWEAR</h2>
      <p className="text-sm text-gray-600 mb-4">
        Comfortable & stylish bottomwear for all-day wear.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 -mx-px">
        {bottomwear.map((item, i) => (
          <Link href={buildUrl(item.name)} key={i}>
            <div className="flex flex-col items-center cursor-pointer px-px">
              <div className="relative w-full h-48 sm:h-56 md:h-64 bg-white rounded-lg">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                />
              </div>
              <p className="mt-1 text-sm font-medium">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}