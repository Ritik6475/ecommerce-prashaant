"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";   // ✅ Import here
import { fetchProductById } from "@/store/slices/productSlice";
import ProductDetail from "@/components/products/ProductDetail";

export default function ProductPage() {
  const { id } = useParams();                  // ✅ Get id correctly
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) return <div className="p-20 text-center text-lg">Loading...</div>;
  if (error) return <div className="p-20 text-center text-lg text-red-600">{error}</div>;
  if (!product) return <div className="p-20 text-center text-lg">Product Not Found</div>;

  return <ProductDetail product={product} />;
}
