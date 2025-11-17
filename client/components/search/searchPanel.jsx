"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Search, Loader2 } from "lucide-react";

export default function SearchResultsPanel({ results = [], onClose, loadMore, hasMore, loading }) {
  const listRef = useRef(null);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current || loading || !hasMore) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        loadMore();
      }
    };

    const listEl = listRef.current;
    listEl?.addEventListener("scroll", handleScroll);
    return () => listEl?.removeEventListener("scroll", handleScroll);
  }, [loadMore, loading, hasMore]);

  return (
    <div className="absolute left-0 top-full mt-2 w-full md:w-[480px] max-h-[75vh] bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden z-[9999] animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 bg-gray-50 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-500" />
          <p className="text-sm font-medium text-gray-700">Search Results</p>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors duration-150">
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      {/* Results List */}
      <div ref={listRef} className="divide-y divide-gray-100 max-h-[65vh] overflow-y-auto">
        {results.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <Search className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">No products found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search terms</p>
          </div>
        )}

        {results.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            onClick={onClose}
            className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 line-clamp-2 group-hover:text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-sm text-gray-900">
                    ₹{product.offerprice?.toLocaleString?.() || product.offerprice}
                  </p>
                  {product.price && product.price > product.offerprice && (
                    <p className="text-xs text-gray-400 line-through">
                      ₹{product.price?.toLocaleString?.() || product.price}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center py-4">
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          </div>
        )}
      </div>

      {/* Footer */}
      {results.length > 0 && (
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 sticky bottom-0">
          <p className="text-xs text-gray-500">
            Showing {results.length} {results.length === 1 ? "result" : "results"}
            {loading && " • Loading more..."}
          </p>
        </div>
      )}
    </div>
  );
}