"use client";

import { Truck } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#1f7db6] text-white">
      <div
        className="
          max-w-7xl mx-auto
          px-2 sm:px-4
          h-8 sm:h-9
          flex items-center justify-center
          whitespace-nowrap
          overflow-hidden
        "
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Truck
            size={14}
            className="opacity-90 shrink-0"
          />

          <p
            className="
              text-[11px] sm:text-sm
              font-medium
              tracking-wide
              leading-none
            "
          >
            FREE SHIPPING on all orders above{" "}
            <span className="font-semibold">₹999</span>
          </p>
        </div>
      </div>
    </div>
  );
}
