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

  return (
    <div className="relative search-wrapper w-full flex-shrink-0">
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md w-full">
        <Search size={16} className="text-gray-500 mr-2" />
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for products brands and price..."
          className="bg-transparent outline-none text-sm w-full text-gray-600 placeholder:text-gray-400"
        />
        {searchText.length > 1 && (
          <button
            onClick={() => {
              setSearchText("");
              setShowPanel(false);
              setResults([]);
            }}
            className="p-1"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}
      </div>

      {showPanel && (
        <SearchResultsPanel
          results={results}
          onClose={() => setShowPanel(false)}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />
      )}
    </div>
  );
}
