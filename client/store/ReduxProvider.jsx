"use client";

import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./slices/authSlice";

function LoadUserOnStart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return null;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <LoadUserOnStart />
      {children}
    </Provider>
  );
}
