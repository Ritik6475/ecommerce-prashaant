'use client';

import HeroBannerSlider from '@/components/home/HeroBannerSlider';
import Image from 'next/image';

export default function CategoryHeadingRow() {

  const topwear = [
    { name: "T-Shirts", img: "/Images/Topwear/Tshirts.png" },
    { name: "Hoodies", img: "/Images/Topwear/Hoodies.png" },
    { name: "Jackets", img: "/Images/Topwear/jacket.png" },
    { name: "Shirts", img: "/Images/Topwear/Shirts.png" },
    { name: "Sweaters", img: "/Images/Topwear/Sweaters.png" },
    { name: "Winterwear", img: "/Images/Topwear/Winterwear.png" },
  ];

  const bottomwear = [
    { name: "Jeans", img: "/Images/Bottomwear/Jeans.png" },
    { name: "Joggers", img: "/Images/Bottomwear/Joggers.png" },
    { name: "Pants", img: "/Images/Bottomwear/Pants.png" },
    { name: "Shorts", img: "/Images/Bottomwear/Shorts.png" },
    { name: "Cargos", img: "/Images/Bottomwear/Cargos.png" },
    { name: "Pyjamas", img: "/Images/Bottomwear/Pyjamas.png" },
  ];

  const largeBanners = [
    "/Images/Banners/Category.png",
    "/Images/Banners/CategoryOrange.png",
    "/Images/Banners/Ethnic.png",
    "/Images/Banners/FormalBrandBanner.png",
    "/Images/Banners/OfferBanner.png"
  ];

  const brands = [
    "/Images/Brands/Nike.png",
    "/Images/Brands/Puma.png",
    "/Images/Brands/Adidas.png",
    "/Images/Brands/H&M.png",
    "/Images/Brands/Zara.png"
  ];

  const trending = [
    "/Images/Trending/look1.jpg",
    "/Images/Trending/look2.jpg",
    "/Images/Trending/look3.jpg",
  ];

  return (
    <div className="w-full">

      {/* ================= HERO SLIDER ================= */}
      <HeroBannerSlider />

      {/* ================= CATEGORY: TOPWEAR ================= */}
      <section className="w-full mt-10 px-4">
        <h2 className="text-3xl font-extrabold">Topwear</h2>
        <p className="text-gray-600 text-sm mb-4">Premium styles for every season</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
          {topwear.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative w-full h-48 sm:h-56 md:h-64 bg-white rounded-xl shadow-sm">
                <Image src={item.img} alt={item.name} fill className="object-contain p-3" />
              </div>
              <p className="mt-2 font-medium text-sm">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CATEGORY: BOTTOMWEAR ================= */}
      <section className="w-full mt-16 px-4">
        <h2 className="text-3xl font-extrabold">Bottomwear</h2>
        <p className="text-gray-600 text-sm mb-4">Comfortable & stylish every day wear</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
          {bottomwear.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative w-full h-48 sm:h-56 md:h-64 bg-white rounded-xl shadow-sm">
                <Image src={item.img} alt={item.name} fill className="object-contain p-3" />
              </div>
              <p className="mt-2 font-medium text-sm">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= LARGE BANNERS (PC ONLY) ================= */}
      <section className="hidden md:block w-full mt-20 px-4 space-y-10">
        <h2 className="text-3xl font-extrabold mb-4">Featured Collections</h2>

        {largeBanners.map((img, i) => (
          <div key={i} className="relative w-full h-72 lg:h-96 rounded-xl overflow-hidden shadow-xl">
            <Image src={img} fill className="object-contain bg-black" />
          </div>
        ))}
      </section>

      {/* ================= TRENDING NOW ================= */}
      <section className="w-full mt-20 px-4">
        <h2 className="text-3xl font-extrabold">Trending Now</h2>
        <p className="text-gray-600 text-sm mb-4">Handpicked fashion edits</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {trending.map((img, i) => (
            <div key={i} className="relative h-60 sm:h-72 rounded-xl overflow-hidden shadow-xl">
              <Image src={img} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= BRANDS ROW ================= */}
      <section className="w-full mt-20 px-4">
        <h2 className="text-3xl font-extrabold mb-6">Top Brands</h2>

        <div className="flex items-center justify-between flex-wrap gap-6">
          {brands.map((logo, i) => (
            <div key={i} className="relative w-28 h-12 grayscale hover:grayscale-0 transition">
              <Image src={logo} fill className="object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER PLACEHOLDER ================= */}
      <div className="w-full mt-20 py-10 bg-neutral-100 text-center text-gray-600">
        © 2024 Your Store — Premium Modern E-commerce Experience
      </div>

    </div>
  );
}
