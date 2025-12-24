"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { fetchProducts } from "@/store/slices/productSlice";
import ProductCard from "@/components/products/ProductCard";
import WomenCategoryShowcase from "./WomenCategoryShowCase";
import HeroBanner from "../HeroBanner/HeroBanner";
import AnnouncementBar from "./AnnouncementBar";

/* ------------------ DYNAMIC SECTIONS ------------------ */

const CategoryGrid = dynamic(() => import("./CategoryGrid"), {
  ssr: false,
  loading: () => <div className="h-[300px]" />,
});

const CategoryShowcase = dynamic(() => import("./CategoryShowCase"), {
  ssr: false,
});

/* ------------------ STATIC DATA ------------------ */

const COLLECTION_IMAGES = [
  "https://imagescdn.peterengland.com/img/app/product/9/939881-12015359.jpg?auto=format&w=390",
  "https://pantproject.com/cdn/shop/files/close-up_of_Pant_Project_mineral_grey_stretchable_pants_front_waistband.jpg?v=1726636457&width=310",
  "https://images.jdmagicbox.com/quickquotes/images_main/mens-blended-printed-slim-round-neck-t-shirt-382251315-04el2.jpg",
  "https://images.jdmagicbox.com/quickquotes/images_main/men-jackets-381973164-v3lp2.jpeg",
];

/* ------------------ COMPONENT ------------------ */

export default function HomeClient() {
  const dispatch = useDispatch();

  const { products, loadingList } = useSelector(
    (state) => ({
      products: state.product.products,
      loadingList: state.product.loading.list,
    }),
    shallowEqual
  );

  /* ------------------ FETCH HOME PRODUCTS ------------------ */

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProducts({ limit: 8 }));
    }
  }, [dispatch, products?.length]);

  /* ------------------ PRODUCT LIST ------------------ */

  const productList = useMemo(() => {
    if (loadingList) {
      return Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="h-80 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 w-3/4 rounded" />
        </div>
      ));
    }

    return products.map((p) => (
      <ProductCard key={p._id} product={p} />
    ));
  }, [loadingList, products]);

  /* ------------------ JSX ------------------ */



  return (
    <>
     
      {/* ------------------ NEW COLLECTION ------------------ */}
      <section className="py-4 mt-32 sm:mt-6">
      
        <div className="container-custom grid lg:grid-cols-2 gap-4 mt-4">
          <div>
            <h1 className="text-5xl font-extrabold uppercase">
              New <br /> Collection
            </h1>
            <p className="mt-2 ml-2 text-gray-600 font-normal">Winter 2025</p>

            <Link
              href="/products"
              className="inline-flex mt-4 px-4 py-2 bg-black text-white rounded-full"
            >
              Go To Shop <ArrowRight className="ml-2" />
            </Link>
          </div>


          

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
            {COLLECTION_IMAGES.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="collection"
                width={400}
                height={500}
                loading="lazy"
                className="rounded object-cover"
              />
            ))}
          </div>
        </div>
      </section>


      {/* ------------------ CATEGORY SHOWCASE ------------------ */}
     
        <HeroBanner />

      <CategoryShowcase />
    <WomenCategoryShowcase/>
     
<section className="py-10 bg-neutral-100">
        <CategoryGrid />
      </section>

 
      {/* ------------------ CATEGORY GRID ------------------ */}
      <div className="hidden md:block my-8">
        <div className="relative h-72 rounded-xl overflow-hidden">
          <Image
            src="/Images/OfferBanner.png.png"
            alt="Offer Banner"
            fill
            sizes="100vw"
            quality={75}
            loading="lazy"
            className="object-cover"
          />
        </div>
      </div>

           {/* ------------------ HOME PRODUCTS ------------------ */}
      
      <section className="py-20">
        <div className="container-custom grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList}
        </div>

        {!loadingList && products.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-black hover:bg-black hover:text-white transition"
            >
              See More Products
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
