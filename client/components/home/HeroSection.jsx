'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative h-[832px] grain-texture overflow-hidden bg-neutral-100">
      <div className="container-custom h-full flex flex-col justify-center">
        <div className="max-w-xl">
          {/* Categories */}
          <div className="mb-12 space-y-1">
            <p className="text-base tracking-[2px] uppercase">MEN</p>
            <p className="text-base tracking-[2px] uppercase">WOMEN</p>
            <p className="text-base tracking-[2px] uppercase">KIDS</p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-24 py-4 border border-neutral-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
                Search
              </span>
            </div>
          </form>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-[2px] uppercase mb-8 leading-tight">
            New<br />Collection
          </h1>

          {/* Subtitle */}
          <p className="text-5xl font-light mb-12">Summer 2024</p>

          {/* CTA */}
          <div className="flex items-center space-x-4">
            <button className="px-8 py-4 bg-black text-white rounded hover:bg-gray-800 transition-colors flex items-center space-x-2">
              <span className="font-medium tracking-wide">Go To Shop</span>
              <svg width="48" height="12" viewBox="0 0 48 12" fill="none">
                <path d="M0 6H46M46 6L41 1M46 6L41 11" stroke="white" strokeWidth="2"/>
              </svg>
            </button>
            
            {/* Social Icons Placeholder */}
            <div className="flex space-x-4">
              <button className="w-10 h-10 border border-black rounded hover:bg-black hover:text-white transition-colors" />
              <button className="w-10 h-10 border border-black rounded hover:bg-black hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      
      </div>

    </section>
  );
}
