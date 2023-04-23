import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setTokenValid, setGoogleSuccessful, resetReducer, setClientData } from "@/redux/slices/client";
import axios from "axios";
import { serverUrl } from "@/data/config";

export default function HOC(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authSettings, isLogged, client } = useSelector((state) => state?.client);
  const { loginMethod, tokenValid, googleSessionID } = useSelector((state) => state?.client?.authSettings);

  // const hocIsWorking = true;
  const hocIsWorking = false;
  const experimentalIsClient = isLogged;
  const experimentalIsAdmin = authSettings.superAdmin;

  const GoogleSessionID = googleSessionID ? googleSessionID : router.query.session;
  console.log("GoogleSessionID", GoogleSessionID);
  const clientId = router.query.id;

  const headersJson = {
    Authorization: `Bearer ${authSettings.token}`,
  };



  const getUserData = async ({ clientId }) => {
    console.log("Obteniendo datos del usuario", clientId);
    try {
      const response = await axios.get(`${serverUrl}user/${clientId}`, { timeout: 5000 });
      console.log(response.data);

      const newClient = {
        bio: response.data.bio,
        profilePicture: response.data.image,
        _id: response.data._id,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        userName: response.data.username,
      };

      dispatch(setClientData(newClient));
      return;
    } catch (error) {
      console.log("Error al obtener los datos del usuario", error.message);
      return;
    }
  }


  const googleAuth = async (headers) => {
    console.log("googleAuth", headers);
    try {
      const response = await axios.get(`${serverUrl}google/verify`, { headers });

      console.log(response.data);

      dispatch(setGoogleSuccessful({
        isLogged: true,
        tokenValid: true,
        googleSessionID: GoogleSessionID,
      }));

      console.log("Se inicio correctamente con google");

      return;

    } catch (error) {
      console.log("Error al iniciar con google", error.message);
      router.push("/");
      dispatch(resetReducer());
      return;

    }
  }

  useEffect(() => {
    async function fetchData() {
      console.log("fetching useEffect google;", loginMethod);
      if (GoogleSessionID && GoogleSessionID !== undefined) {
        const headers = { session: GoogleSessionID };
        console.log("googleSessionID llamando", GoogleSessionID);
        await googleAuth(headers);
        if (router.query.id && router.query.id !== undefined) {
          getUserData({ clientId: router.query.id });
        }
      }
      else {
        console.log("No hay session");
        return;
      }
    }
    if (loginMethod === "google") fetchData();
    else {
      console.log("No es google", loginMethod);
    }
  }, [GoogleSessionID, router.query.id,]);




  useEffect(() => {
    async function fetchDataJson() {
      console.log("fetching useEffect json;", loginMethod);
      try {
        const response = await axios.get(`${serverUrl}auth/me`, { headers: headersJson }, { timeout: 5000 });
        console.log(response.data);

        dispatch(setTokenValid(true));
      } catch (error) {
        console.log("Error:", error);
        await dispatch(resetReducer());
        router.push("/");
        return
      }
    }

    if (loginMethod === "json" && headersJson !== undefined) fetchDataJson();

  }, [headersJson]);


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
      console.log("isLogged", isLogged);
      router.push("/");
    } else {
      return <>{props.children}</>;
    }
  } else {
    return <>{props.children}</>;
  }
}
