'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    name: 'Men\'s Collection',
    image: 'https://images.bewakoof.com/uploads/grid/app/1x1-Oct-POLOS-Finnal-01-1762323164.jpg',
    link: '/products?gender=Men'
  },
  {
    id: 2,
    name: 'Women\'s Collection',
    image: 'https://images.bewakoof.com/uploads/grid/app/444x666-Desktop-OS-Tshirts-WomenTrending-Category-Icon-1747724475.jpg',
    link: '/products?gender=Women'
  },
  {
    id: 3,
    name: 'All Collection',
    image: 'https://images.bewakoof.com/uploads/grid/app/1x1-men--2--1762334679.jpg',
    link: '/products?gender=Unisex'
  }
];

export default function CategoryGrid() {
  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">SHOP BY CATEGORY</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={category.link} className="block group">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="h-80"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              
              <div className="mt-4 p-4 bg-white border border-gray-200 rounded-b-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.name}</h3>
                <button className="w-full py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">
                  SHOP NOW
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}