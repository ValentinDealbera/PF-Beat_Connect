import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { resetReducer } from "@/redux/slices/client/authSession";
import { resetPersist } from '@/redux/store/store';
import { serverUrl } from "@/data/config";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const loginMethod = useSelector((state) => state.client.authSession.auth.loginMethod);

  const logOutJson = async () => {
    dispatch(resetReducer());
    // resetPersist()
    console.log("borrando...")
    await resetPersist();
    console.log("borrado")
  }

  useEffect(() => {
    const logOut = async () => {
      await logOutJson();
      console.log("seguimos")

      if (loginMethod === "google") {
        router.push(`${serverUrl}google/logout`);
      } else {
        router.push("/");
      }
    };

    logOut();
  }, []);
}
