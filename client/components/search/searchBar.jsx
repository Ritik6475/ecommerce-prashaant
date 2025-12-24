"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import axios from "@/lib/axios";
import SearchResultsPanel from "./searchPanel";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  // Fetch products function
  const fetchResults = useCallback(async (query, pageNum = 1, append = false) => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await axios.get(`/search?q=${encodeURIComponent(query)}&page=${pageNum}`);
      const data = res.data.products || [];
      setResults(prev => (append ? [...prev, ...data] : data));
      setHasMore(data.length === 16); // if 16 results, assume more pages exist
      setShowPanel(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced Search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchText.trim().length < 2) {
        setResults([]);
        setShowPanel(false);
        return;
      }
      setPage(1);
      fetchResults(searchText, 1, false);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchText, fetchResults]);

  // Load next page
  const loadMore = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults(searchText, nextPage, true);
  };

  // Click outside to close
  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (!e.target.closest(".search-wrapper")) setShowPanel(false);
    };
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);



  const placeholders = [
  'Search "Joggers"',
  'Search "Oversized T-Shirts"',
  'Search "Hoodies"',
  'Search "Sneakers"',
];

const [placeholderIndex, setPlaceholderIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
  }, 2000);

  return () => clearInterval(interval);
}, []);

  return (
  <div className="relative search-wrapper w-full">
    
    {/* SEARCH INPUT */}
    <div
      className="
        flex items-center
        bg-white
        px-4
        py-2.5
        rounded-xl
        border border-gray-300
        shadow-sm
      "
    >
      <Search size={18} className="text-gray-500 mr-3" />

      <input
        value={searchText}
        aria-label="Search products"
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={placeholders[placeholderIndex]}
        className="
          bg-transparent
          outline-none
          w-full
          text-[14px]
          text-black
          placeholder:text-gray-500
          placeholder:font-light
          transition-all
        "
      />

      {searchText.length > 1 && (
        <button
          onClick={() => {
            setSearchText("");
            setShowPanel(false);
            setResults([]);
          }}
        >
          <X size={16} className="text-gray-400" />
        </button>
      )}
    </div>

    {/* SEARCH RESULTS – FULL WIDTH */}
    {showPanel && (
      <div className="fixed left-0 right-0 top-[108px] z-50 bg-white">
        <SearchResultsPanel
          results={results}
          onClose={() => setShowPanel(false)}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />
      </div>
    )}
  </div>
);
}
