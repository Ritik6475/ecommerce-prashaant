'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

export default function HeroBannerSlider() {
  
  const bannersMobile = [
    "https://muffynn.com/cdn/shop/articles/Banner-_8_2_da99695a-63ba-47a4-bdd3-838e940ef238.jpg?v=1745556709&width=1200",
    "https://img.freepik.com/free-psd/urban-fashion-banner-template_23-2148652498.jpg?semt=ais_hybrid&w=740&q=80",
    "https://m.media-amazon.com/images/G/31/MA2025/Banner_Men._SX1035_QL85_.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpGS64gP3SaxlxFWCTnDwuMjRu5Snx9LefA&s",
  ];

  const bannersPc = [
    "https://theformalclub.in/cdn/shop/files/Fulkl-SLEVVEESSS_74f73ad8-8779-4f5c-9d89-c70fb07ff625.jpg?v=1721209695",
    "https://s.alicdn.com/@sc04/kf/Ab14870f0e44641f489a6dfe031772bcec/1023162095/Ab14870f0e44641f489a6dfe031772bcec.jpg",
    "https://cdn.dribbble.com/userupload/14251223/file/original-ccf454426d2b7842dfdcd6917528301d.jpg?resize=2048x1152&vertical=center",
    "https://shreeman.in/cdn/shop/files/Artboard_1_06edebbb-33db-4517-9b71-045f2aa3f8b8.jpg?v=1671272106&width=1800",
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto mb-6 mt-2 rounded-xl overflow-hidden">

      {/* MOBILE BANNERS */}
      <div className="block md:hidden">  
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="rounded-xl"
        >
          {bannersMobile.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[180px] sm:h-[240px]">
                <Image
                  src={img}
                  alt={`mobile-banner-${i}`}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* PC BANNERS */}
      <div className="hidden md:block">  
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="rounded-xl"
        >
          {bannersPc.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[330px] lg:h-[450px] xl:h-[520px]">
                <Image
                  src={img}
                  alt={`pc-banner-${i}`}
                  fill
                  quality={100}
                  className="object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
}
