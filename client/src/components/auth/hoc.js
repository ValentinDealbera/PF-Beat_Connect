import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function HOC(props) {
  const router = useRouter();

  const { authSettings, isLogged } = useSelector((state) => state.client);

  const hocIsWorking = false;
  const experimentalIsClient = isLogged;
  const experimentalIsAdmin = authSettings.superAdmin;

  console.log(authSettings, isLogged)
  console.log(experimentalIsAdmin, experimentalIsClient);


  if (hocIsWorking === false) {
    return <>{props.children}</>;
  }

  if (router.pathname.startsWith("/client")) {
    if (experimentalIsClient === false) {
      router.push("/");
      return <></>;
    } else {
      return <>{props.children}</>;
    }
  } else if (router.pathname.startsWith("/admin")) {
    if (experimentalIsAdmin === false) {
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
      console.log("no se logeo");
      return <>{props.children}</>;
    }
  }
  else {
    return <>{props.children}</>;
  }
}
