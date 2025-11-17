'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import HeroBannerSlider from '@/components/home/HeroBannerSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import CategoryShowcase from '@/components/home/CategoryShowCase';

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8, sort: 'newest' }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Slider */}
      <HeroBannerSlider />

      {/* Offer Banner - Hidden on mobile */}
      <div className="space-y-8 hidden md:block"> 
        <div className="relative w-full h-72 lg:h-76 rounded-xl overflow-hidden shadow-xl">
          <Image 
            src="/Images/OfferBanner.png.png"
            alt="big-banner"
            fill
            quality={100}
            className="object-cover"
          />
        </div>
      </div>

      {/* New Collection Section */}
      <section className="relative w-full overflow-hidden pt-16 pb-10">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Side Text Section */}
          <div className="px-3">
            <p className="text-[12px] tracking-widest uppercase mb-3 opacity-60">
              MEN • WOMEN • KIDS
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide uppercase leading-tight mb-4">
              New <br /> Collection
            </h1>

            <p className="text-base sm:text-lg opacity-80 mb-6">
              Winter 2025
            </p>

            <Link
              href="/products"
              className="inline-flex items-center space-x-2 px-6 py-2 bg-black text-white text-xs sm:text-sm tracking-wider uppercase rounded-full hover:bg-neutral-800 transition-all"
            >
              <span>Go To Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Side Images */}
          <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 px-3">
            {[
              "https://images.bewakoof.com/uploads/grid/app/1x1-women--3--1762423182.jpg",
              "https://images.bewakoof.com/uploads/grid/app/1x1-women--3--1762423182.jpg",
              "https://images.bewakoof.com/uploads/grid/app/1x1-women--3--1762423182.jpg",
              "https://images.bewakoof.com/uploads/grid/app/1x1-women--3--1762423182.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-[3/4] overflow-hidden rounded-md border border-neutral-200"
              >
                <Image
                  src={src}
                  alt="collection"
                  width={400}
                  height={500}
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container-custom">
          <CategoryGrid />
        </div>
      </section>

      <CategoryShowcase />

      {/* Product Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-5xl font-extrabold tracking-wide mb-12">
            XIV Collections 23-24
          </h2>

          {/* Product Grid - Updated for mobile responsiveness */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-10 mb-10">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-4 animate-pulse">
                    <div className="bg-neutral-200 h-96 w-full rounded"></div>
                    <div className="bg-neutral-200 h-4 w-3/4 rounded"></div>
                    <div className="bg-neutral-200 h-4 w-1/2 rounded"></div>
                  </div>
                ))
              : products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
            }
          </div>

          <div className="text-center">
            <Link href="/products" className="text-lg hover:underline">
              See More →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}