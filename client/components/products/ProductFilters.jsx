"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  X, 
  Star, 
  DollarSign,
  Shirt,
  Users,
  Tag,
  Award,
  Ruler
} from "lucide-react";

export default function ProductFilters({ filters, activeFilters, onFilterChange, onClearFilters }) {
  const [open, setOpen] = useState({
    size: true,
    gender: false,
    brand: false,
    category: false,
    fit: false,
    sleeve: false,
    material: false,
    rating: false,
    price: false,
  });

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-80 space-y-4 bg-gray-200 p-6 rounded-xl border border-gray-200 shadow-sm">
      {/* Title + Clear */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Sliders className="text-gray-700" />
          <h2 className="text-xl font-bold tracking-tight text-gray-900">Filters</h2>
        </div>
        {Object.values(activeFilters).some(Boolean) && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* SIZE */}
      <div className="space-y-2">
        <button
          onClick={() => toggle("size")}
          className="flex items-center justify-between w-full py-2"
        >
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-gray-600" />
            <span className="font-bold text-gray-800">Size</span>
          </div>
          {open.size ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
        </button>
        {open.size && (
          <div className="flex flex-wrap gap-2 pl-6">
            <button
              onClick={() => onFilterChange("size", null)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition min-w-[40px]
              ${!activeFilters.size ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              All
            </button>
            {filters.sizes?.map((s) => (
              <button
                key={s}
                onClick={() => onFilterChange("size", s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition min-w-[40px]
                ${activeFilters.size === s ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* GENDER */}
      <div className="space-y-2">
        <button
          onClick={() => toggle("gender")}
          className="flex items-center justify-between w-full py-2"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="font-bold text-gray-800">Gender</span>
          </div>
          {open.gender ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
        </button>
        {open.gender && (
          <div className="flex flex-wrap gap-2 pl-6">
            {filters.genders?.map((g) => (
              <button
                key={g}
                onClick={() => onFilterChange("gender", g)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition
                ${activeFilters.gender === g ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CATEGORY */}
      <div className="space-y-2">
        <button
          onClick={() => toggle("category")}
          className="flex items-center justify-between w-full py-2"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-600" />
            <span className="font-bold text-gray-800">Category</span>
          </div>
          {open.category ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
        </button>
        {open.category && (
          <div className="flex flex-wrap gap-2 pl-6">
            {filters.categories?.map((c) => (
              <button
                key={c}
                onClick={() => onFilterChange("category", c)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition
                ${activeFilters.category === c ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* BRAND */}
      <div className="space-y-2">
        <button
          onClick={() => toggle("brand")}
          className="flex items-center justify-between w-full py-2"
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gray-600" />
            <span className="font-bold text-gray-800">Brand</span>
          </div>
          {open.brand ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
        </button>
        {open.brand && (
          <div className="flex flex-wrap gap-2 pl-6">
            {filters.brands?.map((b) => (
              <button
                key={b}
                onClick={() => onFilterChange("brand", b)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition
                ${activeFilters.brand === b ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {b}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FIT */}
      <div className="space-y-2">
        <button
          onClick={() => toggle("fit")}
          className="flex items-center justify-between w-full py-2"
        >
          <div className="flex items-center gap-2">
            <Shirt className="w-4 h-4 text-gray-600" />
            <span className="font-bold text-gray-800">Fit</span>
          </div>
          {open.fit ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
        </button>
        {open.fit && (
          <div className="flex flex-wrap gap-2 pl-6">
            {filters.fits?.map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange("fit", f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition
                ${activeFilters.fit === f ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SLEEVE */}
      <div className="space-y-2">
        <button
          onClick={() => toggle("sleeve")}
          className="flex items-center justify-between w-full py-2"
        >
          <div className="flex items-center gap-2">
            <Shirt className="w-4 h-4 text-gray-600" />
            <span className="font-bold text-gray-800">Sleeve</span>
          </div>
          {open.sleeve ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
        </button>
        {open.sleeve && (
          <div className="flex flex-wrap gap-2 pl-6">
            {filters.sleeves?.map((sl) => (
              <button
                key={sl}
                onClick={() => onFilterChange("sleeve", sl)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition
                ${activeFilters.sleeve === sl ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {sl}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RATING */}
      <div className="space-y-2">
        <button
          onClick={() => toggle("rating")}
          className="flex items-center justify-between w-full py-2"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-gray-600" />
            <span className="font-bold text-gray-800">Ratings</span>
          </div>
          {open.rating ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
        </button>
        {open.rating && (
          <div className="flex flex-wrap gap-2 pl-6">
            {[5, 4, 3, 2].map((r) => (
              <button
                key={r}
                onClick={() => onFilterChange("rating", r)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1
                ${activeFilters.rating === r ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                <span className="text-yellow-500">{"★".repeat(r)}</span>
                <span className="text-gray-300">{"☆".repeat(5 - r)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PRICE */}
      <div className="space-y-2">
        <button
          onClick={() => toggle("price")}
          className="flex items-center justify-between w-full py-2"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-600" />
            <span className="font-bold text-gray-800">Price Range</span>
          </div>
          {open.price ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
        </button>
        {open.price && (
          <div className="flex gap-2 items-center pl-6">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded text-sm text-gray-700 font-medium"
              value={activeFilters.minPrice || ""}
              onChange={(e) => onFilterChange("minPrice", e.target.value)}
            />
            <span className="text-gray-500 font-medium">—</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded text-sm text-gray-700 font-medium"
              value={activeFilters.maxPrice || ""}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}