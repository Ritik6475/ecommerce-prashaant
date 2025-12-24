import { Suspense } from "react";
import HeroBannerSkeleton from "./HeroBannerSkeleton";
import HeroBannerClient from "./HeroBanner.client";

export default function HeroBanner() {
  return (
    <Suspense fallback={<HeroBannerSkeleton />}>
      <HeroBannerClient />
    </Suspense>
  );
}
