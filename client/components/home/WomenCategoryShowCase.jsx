'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function WomenCategoryShowcase() {
  const gender = "Women";

  /* ---------------- TOPWEAR ---------------- */
  const topwear = [
    { name: "Tops", img: "https://charmgal.in/cdn/shop/files/blacktop.jpg?v=1698903127&width=533" },
    { name: "T-Shirts", img: "https://images.bewakoof.com/t640/women-s-blue-cute-but-crazy-tjl-graphic-printed-boyfriend-t-shirt-296362-1744807319-1.jpg" },
    { name: "Kurtas", img: "https://assets.ajio.com/medias/sys_master/root/20231027/ddVs/653b927bafa4cf41f563d164/-473Wx593H-466750798-olive-MODEL.jpg" },
    { name: "Hoodies", img: "https://images.bewakoof.com/t640/women-s-beige-black-graphic-printed-oversized-hoodies-682772-1760100200-1.jpg" },
    { name: "Jackets", img: "https://images.bewakoof.com/t640/women-s-blue-embroidered-oversized-washed-cropped-denim-jacket-684819-1763987691-1.jpg" },
    { name: "Sweaters", img: "https://images.bewakoof.com/t640/women-s-jet-black-embellished-oversized-sweater-680224-1758863006-1.jpg" },
  ];

  /* ---------------- BOTTOMWEAR ---------------- */
  const bottomwear = [
    { name: "Jeans", img: "https://mediahub.debenhams.com/gzz56240_acid%20wash%20light%20blue_xl_2?qlt=70&w=549&ssz=true&dpr=1" },
    { name: "Trousers", img: "https://images.bewakoof.com/t1080/women-s-jet-black-tapered-fit-pants-683848-1760438144-4.jpg" },
    { name: "Leggings", img: "https://m.media-amazon.com/images/I/51Wx1pLPG7L._AC_UY350_.jpg" },
    { name: "Skirts", img: "https://i.pinimg.com/736x/35/c0/0a/35c00a74a93acfd5aaa2f705f60ed493.jpg" },
    { name: "Palazzos", img: "https://img.tatacliq.com/images/i18//450Wx545H/MP000000022937055_450Wx545H_202407171930583.jpeg" },
    { name: "Shorts", img: "https://images.bewakoof.com/web/denim-shorts-12-types-of-shorts-for-women-and-girls-bewakoof-blog-1-1631022364.jpg" },
  ];

  const buildUrl = (name) =>
    `/products?category=${encodeURIComponent(
      name.toLowerCase()
    )}&gender=${gender}`;

  return (
    <div className="w-full px-4 mt-10">

      {/* ------------------ TOPWEAR ------------------ */}
      <h2 className="text-3xl font-extrabold">Women's Topwear</h2>
      <p className="text-sm text-gray-600 mb-4">
        Explore our latest women&apos;s topwear collection.
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
                  loading="lazy"
                />
              </div>
              <p className="mt-1 text-sm font-medium">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ------------------ BOTTOMWEAR ------------------ */}
      <h2 className="text-3xl font-extrabold mt-10">Women's Bottomwear</h2>
      <p className="text-sm text-gray-600 mb-4">
        Stylish & comfortable bottomwear for everyday wear.
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
                  loading="lazy"
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
