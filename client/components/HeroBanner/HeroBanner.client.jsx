"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

const bannersMobile = [
  "https://muffynn.com/cdn/shop/articles/Banner-_8_2_da99695a-63ba-47a4-bdd3-838e940ef238.jpg?v=1745556709&width=1200",
  "https://img.freepik.com/free-psd/urban-fashion-banner-template_23-2148652498.jpg?w=740&q=80",
];

const bannersPc = [
  "https://theformalclub.in/cdn/shop/files/Fulkl-SLEVVEESSS_74f73ad8-8779-4f5c-9d89-c70fb07ff625.jpg?v=1721209695",
  "https://cdn.dribbble.com/userupload/14251223/file/original-ccf454426d2b7842dfdcd6917528301d.jpg?resize=2048x1152",
];

export default function HeroBannerClient() {
  return (
    <div className="w-full max-w-[1600px] mx-auto overflow-hidden">

      {/* ───────── MOBILE ───────── */}
      <div className="md:hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
        >
          {bannersMobile.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                  src={img}
                  alt={`mobile-banner-${i}`}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={80}
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ───────── DESKTOP ───────── */}
      <div className="hidden md:block">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
        >
          {bannersPc.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full aspect-[16/8] bg-gray-100">
                <Image
                  src={img}
                  alt={`pc-banner-${i}`}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={80}
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
