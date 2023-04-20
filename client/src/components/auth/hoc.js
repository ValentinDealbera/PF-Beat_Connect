import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setTokenValid } from "@/redux/slices/client";
import axios from "axios";

export default function HOC(props) {
  const router = useRouter();
  const dispatch = useDispatch()
  const { authSettings, isLogged, tokenValid } = useSelector((state) => state.client);

  const hocIsWorking = false;
  const experimentalIsClient = isLogged;
  const experimentalIsAdmin = authSettings.superAdmin;

  const headers = {
    "Authorization": `Bearer ${authSettings.token}`,
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/me', { headers })
      .then((response) => {
        console.log(response.data);
        dispatch(setTokenValid(true))
      })
      .catch((error) => {
        dispatch(setTokenValid(false))
        console.log("Error:", error);
      });
  if (Cookies.get("token") !== "true") {
        navigate("/auth/login");
      }
  }, [authSettings.token, headers]);

  if (hocIsWorking === false) {
     return <>{props.children}</>;
  }  

  if (router.pathname.startsWith("/client")) {
    if (experimentalIsClient === false || tokenValid === false) {
      router.push("/");
      return <></>;
    } else {
      return <>{props.children}</>;
    }
  } else if (router.pathname.startsWith("/admin")) {
    if (experimentalIsAdmin === false || tokenValid === false) {
      router.push("/");
    } 
    else {
      return <>{props.children}</>;
    }
  } else if (router.pathname.startsWith("/auth")) {
    if(router.pathname === "/auth/logout"){
      return <>{props.children}</>;
    }
    if (isLogged === true) {
      router.push("/");
    } else {
     
      return <>{props.children}</>;
    }
  }
  else {
    return <>{props.children}</>;
  }
}
