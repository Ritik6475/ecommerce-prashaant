"use client";

import { useParams } from "next/navigation";
import ProductClient from "./ProductClient";

export default function ProductPage() {
  const { id } = useParams();

  return <ProductClient productId={id} />;
}
