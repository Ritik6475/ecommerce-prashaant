"use client";

import { Suspense } from "react";
import ProductsPageContent from "./ProductsPageContent";
import PageSkeleton from "@/components/ui/PageSkeleton";

export default function ProductsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductsPageContent />
    </Suspense>
  );
}
