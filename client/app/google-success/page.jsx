"use client";

import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSuccess } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

function GoogleSuccessInner() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const token = params.get("token");

  useEffect(() => {
    if (!token) return;

    // Save token
    localStorage.setItem("token", token);

    // Update Redux auth state
    dispatch(loginSuccess(token));

    toast.success("Logged in via Google");
    router.replace("/");
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen text-lg">
      Completing Login...
    </div>
  );
}

export default function GoogleSuccess() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <GoogleSuccessInner />
    </Suspense>
  );
}
