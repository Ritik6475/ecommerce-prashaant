"use client";

import GoogleProvider from "./providers/GoogleProvider";
import ReduxProvider from "@/store/ReduxProvider";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <GoogleProvider>
      <ReduxProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </ReduxProvider>
    </GoogleProvider>
  );
}
