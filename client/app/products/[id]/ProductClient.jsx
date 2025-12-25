// app/products/[id]/ProductClient.jsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import dynamic from "next/dynamic";
import { fetchProductById } from "@/store/slices/productSlice";


const ProductDetail = dynamic(
  () => import("@/components/products/ProductDetail"),
  {
    loading: () => (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-xl animate-pulse" />
      </div>
    ),
    ssr: false,
  }
);

export default function ProductClient({ productId }) {
  const dispatch = useDispatch();

  const { product, loadingProduct, error } = useSelector(
    (state) => ({
      product: state.product.product,
      loadingProduct: state.product.loading.product,
      error: state.product.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!productId || product?._id === productId) return;
    dispatch(fetchProductById(productId));
  }, [dispatch, productId, product?._id]);

  if (loadingProduct) return null;

  if (error)
    return <div className="p-20 text-center text-lg text-red-600">{error}</div>;

  if (!product)
    return <div className="p-20 text-center text-lg">Product Not Found</div>;

  return <ProductDetail product={product} />;
}
