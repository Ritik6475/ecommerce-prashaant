import { Suspense } from "react";
import { use } from "react";
import BuyNowClient from "./BuyNowClient";
import PageSkeleton from "@/components/ui/PageSkeleton";

export default function Page(props) {
  const params = use(props.params);

  return <BuyNowClient productId={params.id} />;
}

