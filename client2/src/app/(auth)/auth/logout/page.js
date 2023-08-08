import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { resetReducer } from "@/redux/slices/client/authSession";
import { resetPersist } from "@/redux/store/store";
import { serverUrl } from "@/data/config";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const loginMethod = useSelector(
    (state) => state.client.authSession.auth.loginMethod
  );

  const logOutJson = async () => {
    dispatch(resetReducer());
    // resetPersist()
 
    await resetPersist();

  };

  useEffect(() => {
    const logOut = async () => {
      await logOutJson();
     

      if (loginMethod === "google") {
        router.push(`${serverUrl}google/logout`);
      } else {
        window.location.reload();
        router.push("/");
      }
    };

    if (loginMethod !== "") {
      logOut();
    }
    else {
      router.push("/");
    }


   
  }, []);

  return (
    <>

    </>
  ); // Opcionalmente puedes retornar algún contenido o null si no necesitas mostrar nada en este componente
}
