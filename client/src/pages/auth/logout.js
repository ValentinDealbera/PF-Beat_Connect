import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { resetReducer } from "@/redux/slices/client";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const loginMethod = useSelector((state) => state.client.authSettings.loginMethod);

const logOutJson = async () => {

  await dispatch(resetReducer());

  if (loginMethod === "google") {
    router.push("http://localhost:3001/api/google/logout");
    return;
  }
  router.push("/");
}

  useEffect(() => {
    logOutJson();
  }, []);

  return <div></div>;
}
