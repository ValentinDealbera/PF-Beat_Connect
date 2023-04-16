import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { resetReducer } from "@/redux/slices/client";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(resetReducer());
    router.push("/");
  }, []);

  return <div></div>;
}
