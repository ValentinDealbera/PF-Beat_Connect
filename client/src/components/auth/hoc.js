import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setTokenValid, setGoogleSuccessful, resetReducer, setClientData } from "@/redux/slices/client";
import axios from "axios";


export default function HOC(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authSettings, isLogged, client } = useSelector((state) => state.client);
  const { loginMethod, tokenValid } = useSelector((state) => state.client.authSettings);

  const hocIsWorking = true;
  const experimentalIsClient = isLogged;
  const experimentalIsAdmin = authSettings.superAdmin;

  const googleSessionID = router.query.session;
  const clientId = router.query.id;



  const getUserData = async ({ clientId }) => {
    console.log("Obteniendo datos del usuario", clientId);
    try {
      const response = await axios.get(`http://localhost:3001/api/user/${clientId}`);
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

    } catch (error) {
      console.log("Error al obtener los datos del usuario", error.message);
    }
  }


  const googleAuth = async (headers) => {
    console.log("googleAuth", headers);
    try {
      const response = await axios.get("http://localhost:3001/api/google/verify", { headers });

      console.log(response.data);

      dispatch(setGoogleSuccessful({
        isLogged: true,
        tokenValid: true,
        googleSessionID: googleSessionID,
      }));

      console.log("Se inicio correctamente con google");

    } catch (error) {
      console.log("Error al iniciar con google", error.message);
      // dispatch(resetReducer());
    }
  }

  useEffect(() => {
    async function fetchData() {
      console.log("fetching useEffect");
      if (router.query.session && router.query.session !== undefined) {
        const headers = { session: router.query.session };
        console.log("googleSessionID llamando", router.query.session);
        await googleAuth(headers);
        if (router.query.id && router.query.id !== undefined) {
          getUserData({ clientId: router.query.id });
        }
      }
    }
    fetchData();
  }, [router.query.session, router.query.id]);

  useEffect(() => {
    console.log("useEffect googleSessionID", googleSessionID, router);
  }, [googleSessionID, router]);




  // useEffect(() => {

  //   if (loginMethod === "google") {

  //      async function googleAuth(headers)  {

  //       try {

  //         const response = await axios.get("http://localhost:3001/api/google/verify", { headers })
  //         console.log(response.data);

  //         dispatch(setGoogleSuccessful({
  //           isLogged: true,
  //           tokenValid: true,
  //           googleSessionID: googleSessionID,
  //         }));

  //         console.log("Se inicio correctamente con google");

  //       } catch (error) {
  //         console.log("Error al iniciar con google");
  //       }

  //     }

  //     const headers = {
  //       session: googleSessionID,
  //     };

  //     if (googleSessionID) return googleAuth(headers)

  //   } else {

  //     const headers = {
  //       Authorization: `Bearer ${authSettings.token}`,
  //     };

  //     axios
  //       .get("http://localhost:3001/api/auth/me", { headers })
  //       .then((response) => {
  //         console.log(response.data);
  //         dispatch(setTokenValid(true));
  //       })
  //       .catch((error) => {
  //         dispatch(setTokenValid(false));
  //         console.log("Error:", error);
  //       });
  //   }
  // }, [googleSessionID]);





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
