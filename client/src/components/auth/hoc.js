import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  setGoogleSuccessful,
  resetReducer,
} from "@/redux/slices/client/authSession";
import { serverUrl } from "@/data/config";
import { getUserData } from "@/redux/slices/client/authSession";

export default function HOC(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    loginMethod,
    isAdmin,
    isLogged,
    tokenValid,
    google: { googleSessionID },
    json: { token },
  } = useSelector((state) => state?.client.authSession.auth);

  const { _id } = useSelector(
    (state) => state?.client.authSession.session.current
  );

  const state = useSelector((state) => state.client);

  console.log("state", state);

  const hocIsWorking = true;
  const experimentalIsClient = isLogged;
  const experimentalIsAdmin = isAdmin;

  const GoogleSessionID = googleSessionID
    ? googleSessionID
    : router.query.session;

  const clientId = _id && _id !== "" ? _id : router.query.id;

  //--------------------
  //HOC GOOGLE AUTH
  const googleAuth = async (headers) => {
    try {
      await axios.get(`${serverUrl}google/verify`, {
        headers,
      });

      if (clientId && clientId !== undefined) {
        // const userData = await getUserData({ clientId: clientId });
        //console.log("fase 2 ok", userData);
        await dispatch(getUserData(clientId));
        dispatch(
          setGoogleSuccessful({
            isLogged: true,
            tokenValid: true,
            googleSessionID: headers.session,
            //   session: userData,
          })
        );
      }
    } catch (error) {
      console.log("Error al iniciar con google", error.message);
      dispatch(resetReducer());
      router.push("/");
    }
  };

  useEffect(() => {
    if (loginMethod === "google" && GoogleSessionID) {
      const headers = { session: GoogleSessionID };
      googleAuth(headers);
    }
  }, [GoogleSessionID, loginMethod, clientId]);

  //--------------------
  //HOC JSON AUTH
  const jsonAuth = async (headers) => {
    try {
      await axios.get(`${serverUrl}auth/me`, {
        headers,
      });
    } catch (error) {
      console.log("Error:", error);
      dispatch(resetReducer());
      router.push("/");
      return;
    }
  };

  useEffect(() => {
    if (loginMethod === "json" && token) {
      const headers = { Authorization: `Bearer ${token}` };
      jsonAuth(headers);
    }
  }, []);

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
    } else {
      return <>{props.children}</>;
    }
  } else if (router.pathname.startsWith("/auth")) {
    if (router.pathname === "/auth/logout") {
      return <>{props.children}</>;
    }
    if (isLogged === true) {
      router.push("/");
    } else {
      return <>{props.children}</>;
    }
  } else {
    return <>{props.children}</>;
  }
}
