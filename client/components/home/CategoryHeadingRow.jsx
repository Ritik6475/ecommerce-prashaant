'use client';

import HeroBannerSlider from '@/components/home/HeroBannerSlider';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryHeadingRow() {
  const gender = "Men"; // Change if needed

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

  const brands = [
    { name: "Allen Solly", logo: "/logos/Allen Solly.png" },
    { name: "Levi's", logo: "/logos/Levi's.png" },
    { name: "Louis Philippe", logo: "/logos/LP.png" },
    { name: "Peter England", logo: "/logos/Peter England.png" },
    { name: "puma", logo: "/logos/puma.png" },
    { name: "Raymond", logo: "/logos/raymond.png" },
    { name: "roadster", logo: "/logos/roadster.png" },
  ];

  const trending = [
    { name: "Winter Casual", img: "https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fuploads%2Fcategory%2Fdesktop%2FWinterwear--GRAPHICS---INSIDE-BANNER-DESKTOP---men-1762164728.jpg&w=1920&q=75" },
    { name: "Formal Elegance", img: "https://i.pinimg.com/736x/d6/3c/46/d63c4685ee4a537a275975481ec70fea.jpg" },
    { name: "Solid T-shirts", img: "https://img.freepik.com/premium-vector/black-t-shirt-mockup_1318093-10961.jpg" },

  ];

  // Function to build category URLs
  const buildCategoryUrl = (name) => 
    `/products?category=${encodeURIComponent(name.toLowerCase())}&gender=${gender}`;

  // Function to build trending URLs
  const buildTrendingUrl = (name) => 
    `/products?collection=${encodeURIComponent(name.toLowerCase())}&gender=${gender}`;

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* ================= HERO SLIDER ================= */}
        {/* <HeroBannerSlider /> */}

        {/* ================= CATEGORY: TOPWEAR ================= */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Topwear</h2>
              <div className="w-24 h-1 bg-indigo-600 mt-3 rounded-full"></div>
              <p className="text-gray-600 mt-3 max-w-md">Premium styles for every season and occasion</p>
            </div>
            <Link href={buildCategoryUrl("topwear")}>
              <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Explore Collection
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {topwear.map((item, i) => (
              <Link href={buildCategoryUrl(item.name)} key={i}>
                <div className="group cursor-pointer">
                  <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-xl">
                    <div className="aspect-square p-4 flex items-center justify-center">
                      <Image 
                        src={item.img} 
                        alt={item.name} 
                        fill 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                    <div className="w-8 h-0.5 bg-indigo-600 mx-auto mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= CATEGORY: BOTTOMWEAR ================= */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Bottomwear</h2>
              <div className="w-24 h-1 bg-indigo-600 mt-3 rounded-full"></div>
              <p className="text-gray-600 mt-3 max-w-md">Comfortable & stylish every day wear essentials</p>
            </div>
            <Link href={buildCategoryUrl("bottomwear")}>
              <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Explore Collection
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {bottomwear.map((item, i) => (
                <Link href={buildCategoryUrl(item.name)} key={i}>
                <div className="group cursor-pointer">
                  <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-xl">
                    <div className="aspect-square p-4 flex items-center justify-center">
                      <Image 
                        src={item.img} 
                        alt={item.name} 
                        fill 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                    <div className="w-8 h-0.5 bg-indigo-600 mx-auto mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= TRENDING NOW ================= */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Trending Now</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Handpicked fashion edits from our top designers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trending.map((item, i) => (
              <Link href={buildTrendingUrl(item.name)} key={i}>
             
             <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl">
  <div className="aspect-w-16 aspect-h-9">
    <Image 
      src={item.img} 
      alt={`Trending fashion look ${item.name}`} 
      width={600}
      height={400}
      className="w-full h-96 object-fill transition-transform duration-700 group-hover:scale-110"
    />
  </div>

  {/* Always visible text (no hover opacity) */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
    <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
    <p className="text-indigo-200 mb-4">Shop this trending style</p>
    <button className="px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors w-32">
      Shop Now
    </button>
  </div>
</div>

              </Link>
            ))}
          </div>
        </section>

        {/* ================= BRANDS ROW ================= */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Top Brands</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Discover premium collections from world-renowned designers</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
              {brands.map((brand, i) => (
                <Link href={`/products?brand=${encodeURIComponent(brand.name.toLowerCase())}&gender=${gender}`} key={i}>
                  <div className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 cursor-pointer">
                    <Image 
                      src={brand.logo} 
                      alt={`Brand logo ${brand.name}`} 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}