'use client';

import Link from 'next/link';
import Image from 'next/image';

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((category, index) => (
        
        <Link
          key={category.id}
          href={category.link}
          className="group relative h-96 bg-neutral-200 border border-neutral-300 overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
             <Image
            src={category.image}
            alt="collection"
            width={400}
            height={500}
            className="object-cover rounded border border-neutral-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
          <div className="absolute bottom-8 left-8 right-8">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              {category.name}
            </h3>
          </div>
        </Link>
      ))}  
    </div>
  );
}
