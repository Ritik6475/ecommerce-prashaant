"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      const res = await axios.post(
        "/googlelogin/googlelogin",
        { token: googleToken },
        { withCredentials: true }
      );

      const { user } = res.data;

      // 🚫 DO NOT store token or user in localStorage
      // 🎯 Correct approach:
      dispatch(loginSuccess(user));

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => alert("Google login failed")}
    />
  );
}
