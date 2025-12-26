"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Upload, Sparkles } from "lucide-react";
import axiosInstance from "@/lib/axios";

const TryonModal = ({ productImage, onClose }) => {
  const [userImage, setUserImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);

  const handleImageChange = (e) => {
    if (loading) return;
    const file = e.target.files[0];
    if (!file) return;
    setUserImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleProceed = async () => {
    if (!userImage || loading) return;

    try {
      setLoading(true);
      setResultImage(null);

      const formData = new FormData();
      formData.append("userImage", userImage);

      // Convert product image URL -> Blob
      const productBlob = await fetch(productImage).then((res) => res.blob());
      formData.append("productImage", productBlob);

      const res = await axiosInstance.post(
        "/api/try-on",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const base64Image =
        res?.data?.result?.results?.[0]?.entities?.find(
          (e) => e.image
        )?.image;

      if (base64Image) {
        setResultImage(`data:image/png;base64,${base64Image}`);
      } else {
        alert("Please upload a clear photo with a plain background.");
      }
    } catch (err) {
      console.error(err);
      const status = err.response?.status;

      if (status === 401) {
        alert("Please login to use AI Try-On");
      } else if (status === 429) {
        alert("You can use AI Try-On only once per day");
      } else {
        alert(err.response?.data?.message || "Try-on failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
      <div className="min-h-full flex items-start justify-center p-4 pt-10 sm:pt-16">
        <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-xl">

          {/* ❌ Close disabled while loading */}
          <button
            onClick={loading ? undefined : onClose}
            disabled={loading}
            className={`absolute top-4 right-4 transition ${
              loading
                ? "opacity-30 cursor-not-allowed"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            <X />
          </button>

          {/* Header */}
          <div className="px-5 sm:px-6 pt-6 pb-4 border-b">
            <h2 className="text-xl sm:text-2xl font-medium text-gray-900">
              See yourself in this outfit
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
              Upload a photo and preview how this outfit looks on you using AI.
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 sm:p-6">

            {/* LEFT */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-900 text-white text-xs">
                  1
                </span>
                <p className="text-sm font-medium text-gray-800">
                  Your photo
                </p>
              </div>

              {/* Product */}
              <div className="mb-4">
                <p className="text-[11px] text-gray-400 mb-1 uppercase tracking-wide">
                  Selected outfit
                </p>
                <div className="relative w-full h-36 bg-gray-50 rounded-xl">
                  <Image
                    src={productImage}
                    alt="Product"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Upload */}
              {!preview ? (
                <label
                  className={`h-44 rounded-xl border border-dashed flex flex-col items-center justify-center transition ${
                    loading
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer hover:border-gray-400"
                  }`}
                >
                  <Upload className="w-5 h-5 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload your photo</p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Plain background recommended
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={loading}
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative h-44 bg-gray-50 rounded-xl">
                  <Image
                    src={preview}
                    alt="User"
                    fill
                    className="object-contain rounded-xl"
                  />
                </div>
              )}

              {/* Button */}
              <button
                disabled={!userImage || loading}
                onClick={handleProceed}
                className={`mt-4 w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition
                  ${
                    userImage && !loading
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <Sparkles className="w-4 h-4" />
                {loading ? "Creating preview..." : "Generate AI Try-On"}
              </button>

              <p className="text-[11px] text-gray-400 mt-2 text-center">
                Your photo is used only to generate this preview
              </p>
            </div>

            {/* RIGHT */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs">
                  2
                </span>
                <p className="text-sm font-medium text-gray-800">
                  Result
                </p>
              </div>

              <div className="h-[380px] sm:h-[420px] bg-gray-50 rounded-xl flex items-center justify-center px-4">
                {!resultImage ? (
                  <p className="text-xs sm:text-sm text-gray-400 text-center leading-relaxed">
                    Your AI try-on preview will appear here once generated.
                  </p>
                ) : (
                  <img
                    src={resultImage}
                    alt="Try On Result"
                    className="max-h-full rounded-xl"
                  />
                )}
              </div>
            </div>
          </div>

          {/* 🔒 FREEZE OVERLAY */}
          {loading && (
            <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center text-center px-6 rounded-2xl">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900">
                Generating your AI Try-On
              </h3>
              <p className="text-sm text-gray-500 mt-2 max-w-sm">
                This may take up to <b>1 minute</b>.  
                Please wait and do not close this window.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TryonModal;
