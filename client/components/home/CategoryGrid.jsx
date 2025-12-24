'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Men's Collection",
    subtitle: 'Bold styles • Everyday essentials',
    image:
      'https://i.pinimg.com/originals/a7/1f/ec/a71fece9337c954bf05c496ad2624f89.jpg',
    link: 'products?gender=men',
  },
  {
    id: 2,
    name: "Women's Collection",
    subtitle: 'Trendy fits • Comfort wear',
    image:
      'https://thevishnu.in/cdn/shop/articles/Vishnu22ndJune2021_32845.webp?v=1718963071',
    link: 'products?gender=women',
  },
  {
    id: 3,
    name: 'All Collection',
    subtitle: 'Unisex • Best sellers',
    image:
      'https://img.freepik.com/free-photo/portrait-smiling-beautiful-girl-her-handsome-boyfriend-laughing_158538-4879.jpg?semt=ais_hybrid&w=740&q=80',
    link: 'products?gender=unisex',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* HEADING */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Shop by Category
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Explore curated collections designed for every style
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group"
          >
            <Link href={category.link} className="block h-full">
              <div className="relative h-[420px] rounded-2xl overflow-hidden border bg-black">

                {/* IMAGE */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </motion.div>

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-200 mb-4">
                    {category.subtitle}
                  </p>

                  <div className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                    Shop Collection
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
