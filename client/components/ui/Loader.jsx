"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src="/Images/logowhite.jpg"
          alt="Loading..."
          width={50}
          height={50}
          className="animate-pulse"
          priority
        />
      </motion.div>

      {/* Spinner circle */}
      <div className="absolute animate-spin rounded-full h-20 w-20 border-b-2 border-black"></div>
    </div>
  );
}
