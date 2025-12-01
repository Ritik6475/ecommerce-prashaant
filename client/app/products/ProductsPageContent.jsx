'use client';

import {
  Clock,
  ArrowDown,
  ArrowUp,
  Star,
  ChevronDown,
  SlidersHorizontal,
  X,
  Grid,
  List,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchFilterOptions } from '@/store/slices/productSlice';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import CategoryHeadingRow from '@/components/home/CategoryHeadingRow';
import CategoryShowcase from '@/components/home/CategoryShowCase';

export default function ProductsPageContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { products, pagination, loading, filters } = useSelector((state) => state.product);

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filterParams, setFilterParams] = useState({
    gender: '',
    category: '',
    subcategory: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sizes: '',
    sort: 'newest',
    search: '',
    page: 1,
  });

  // ✅ Refetch filters on mount
  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch]);

  // ✅ Update filters whenever search params change (fixes navigation issue)
  useEffect(() => {
    const newParams = {
      gender: searchParams.get('gender') || '',
      category: searchParams.get('category') || '',
      subcategory: searchParams.get('subcategory') || '',
      brand: searchParams.get('brand') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sizes: searchParams.get('sizes') || '',
      sort: searchParams.get('sort') || 'newest',
      search: searchParams.get('search') || '',
      page: parseInt(searchParams.get('page')) || 1,
    };

    setFilterParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // auto scroll to top on category change
  }, [searchParams]);

  // ✅ Fetch products when filters change
  useEffect(() => {
    const params = Object.entries(filterParams).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});

    dispatch(fetchProducts({ ...params, limit: 20 }));
  }, [dispatch, filterParams]);

  const handleFilterChange = (key, value) => {
    setFilterParams((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilterParams((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilterParams({
      gender: '',
      category: '',
      subcategory: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sizes: '',
      sort: 'newest',
      search: '',
      page: 1,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {filterParams.category
                ? `${filterParams.category.charAt(0).toUpperCase() + filterParams.category.slice(1)}`
                : filterParams.search
                ? `Search: "${filterParams.search}"`
                : 'All Products'}
            </h1>
            <p className="mt-2 text-gray-600">
              {pagination.total} {pagination.total === 1 ? 'product' : 'products'} available
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* View mode toggle */}
            <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              {showFilters ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-100 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'} -ml-4 lg:-ml-8`}>
            <div className="sticky top-24">
              <ProductFilters
                filters={filters}
                activeFilters={filterParams}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Product List */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-gray-200 gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{products.length}</span> of{' '}
                <span className="font-medium">{pagination.total}</span> products
              </p>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden sm:block">Sort by:</span>

                {/* Mobile Dropdown */}
                <div className="relative sm:hidden w-full max-w-xs">
                  <select
                    value={filterParams.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-10 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>

                {/* Desktop Sort Controls */}
                <div className="hidden sm:flex bg-gray-100 p-1 rounded-lg shadow-inner">
                  {[
                    { key: 'newest', label: 'Newest', icon: Clock },
                    { key: 'price-low', label: 'Low to High', icon: ArrowDown },
                    { key: 'price-high', label: 'High to Low', icon: ArrowUp },
                    { key: 'rating', label: 'Top Rated', icon: Star },
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => handleFilterChange('sort', key)}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        filterParams.sort === key
                          ? 'bg-white shadow text-indigo-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Display */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="aspect-[3/4] bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div
                  className={`grid gap-4 ${
                    viewMode === 'grid'
                      ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1'
                  }`}
                >
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} viewMode={viewMode} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="inline-flex items-center space-x-1">
                      <button
                        onClick={() => handlePageChange(filterParams.page - 1)}
                        disabled={filterParams.page === 1}
                        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>

                      {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                        let page;
                        if (pagination.pages <= 5) page = i + 1;
                        else if (filterParams.page <= 3) page = i + 1;
                        else if (filterParams.page >= pagination.pages - 2)
                          page = pagination.pages - 4 + i;
                        else page = filterParams.page - 2 + i;

                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg border transition-colors ${
                              filterParams.page === page
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => handlePageChange(filterParams.page + 1)}
                        disabled={filterParams.page === pagination.pages}
                        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
 {/* <CategoryShowcase/> */}

 <CategoryHeadingRow/>
    </div>
  );
}

