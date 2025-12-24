"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

const MEN = {
  categories: [
    { name: "T-Shirts", img: "/Images/Topwear/Tshirts.png.png" },
    { name: "Hoodies", img: "/Images/Topwear/Hoodies.png.png" },
    { name: "Jackets", img: "/Images/Topwear/jacket.png.png" },
    { name: "Shirts", img: "/Images/Topwear/Shirts.png.png" },
    { name: "Jeans", img: "/Images/Bottomwear/Jeans.png.png" },
    { name: "Joggers", img: "/Images/Bottomwear/Joggers.png.png" },
  ],
};

const WOMEN = {
  categories: [
    { name: "Tops", img: "https://charmgal.in/cdn/shop/files/blacktop.jpg?v=1698903127&width=533" },
    { name: "T-Shirts", img: "https://images.bewakoof.com/t640/women-s-blue-cute-but-crazy-tjl-graphic-printed-boyfriend-t-shirt-296362-1744807319-1.jpg" },
    { name: "Kurtas", img: "https://assets.ajio.com/medias/sys_master/root/20231027/ddVs/653b927bafa4cf41f563d164/-473Wx593H-466750798-olive-MODEL.jpg" },
    { name: "Jeans", img: "https://mediahub.debenhams.com/gzz56240_acid%20wash%20light%20blue_xl_2?qlt=70&w=549&ssz=true&dpr=1" },
    { name: "Skirts", img: "https://i.pinimg.com/736x/35/c0/0a/35c00a74a93acfd5aaa2f705f60ed493.jpg" },
    { name: "Shorts", img: "https://images.bewakoof.com/web/denim-shorts-12-types-of-shorts-for-women-and-girls-bewakoof-blog-1-1631022364.jpg" },
  ],
};

export default function MobileGenderCategoryStrip() {
  const [gender, setGender] = useState("All");

  const categories = useMemo(() => {
    if (gender === "Men") return MEN.categories.map(c => ({ ...c, gender: "Men" }));
    if (gender === "Women") return WOMEN.categories.map(c => ({ ...c, gender: "Women" }));
    return [
      ...MEN.categories.map(c => ({ ...c, gender: "Men" })),
      ...WOMEN.categories.map(c => ({ ...c, gender: "Women" })),
    ];
  }, [gender]);

  return (
    <div className="md:hidden bg-[#fdeee7] border-b border-black/5">

      {/* Gender Tabs */}
      <div className="flex justify-around px-5 pt-3 text-xs font-normal">
        {["All", "Men", "Women"].map((tab) => (
          <button
            key={tab}
            onClick={() => setGender(tab)}
            className={`relative pb-2 ${
              gender === tab ? "text-black" : "text-black/60"
            }`}
          >
            {tab}
            {gender === tab && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[1.5px] bg-black" />
            )}
          </button>
        ))}
      </div>

      {/* Category Strip */}
      <div className="px-4 py-3 overflow-x-scroll scroll-smooth no-scrollbar">
        <div className="flex gap-3 w-max">
          {categories.map((item, i) => (
            <Link
              key={i}
              href={`/products?category=${item.name.toLowerCase()}&gender=${item.gender}`}
              className="shrink-0"
            >
              <div className="w-[58px] flex flex-col items-center">
                {/* IMAGE ONLY */}
                <div className="relative w-[58px] h-[58px]">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* TEXT */}
                <p className="mt-1 text-[11px] font-light text-black leading-tight text-center">
                  {item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
