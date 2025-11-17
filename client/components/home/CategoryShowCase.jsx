'use client';

import Image from 'next/image';

export default function CategoryShowcase() {
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

  return (
    <div className="w-full px-4 mt-10">
      {/* ------------------ TOPWEAR ------------------ */}
      <h2 className="text-3xl font-extrabold">TOPWEAR</h2>
      <p className="text-sm text-gray-600 mb-4">
        Explore our latest premium topwear collection.
      </p>

      {/* VERY THIN GAP */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px">
        {topwear.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative w-full h-48 sm:h-56 md:h-64 bg-white rounded-lg">
              <Image 
                src={item.img} 
                alt={item.name} 
                fill 
                className="object-contain"
              />
            </div>
            <p className="mt-1 text-sm font-medium">{item.name}</p>
          </div>
        ))}
      </div>

      {/* ------------------ BOTTOMWEAR ------------------ */}
      <h2 className="text-3xl font-extrabold mt-10">BOTTOMWEAR</h2>
      <p className="text-sm text-gray-600 mb-4">
        Comfortable & stylish bottomwear for all-day wear.
      </p>

      {/* VERY THIN GAP */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px">
        {bottomwear.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative w-full h-48 sm:h-56 md:h-64 bg-white rounded-lg">
              <Image 
                src={item.img} 
                alt={item.name} 
                fill 
                className="object-contain"
              />
            </div>
            <p className="mt-1 text-sm font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}