// "use client";
// import { ReactNode, useEffect, useMemo } from "react";
// import { useAppSelector, useAppDispatch } from "@/redux/hooks";
// import { debounce } from "lodash";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import {
//   setAuth,
//   setSession,
//   logout,
//   verifySession as verifySessionX,
// } from "@/redux/slices/client/authSession";
// import { AuthClass, UserClass } from "@/types";

// type Props = {
//   children: ReactNode;
// };

// const SecurityHOC: React.FC<Props> = ({ children }) => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   console.log("searchParams", searchParams);
//   const {
//     session: { current: sSession },
//     auth: sAuth,
//   } = useAppSelector((state) => state.authSession);

//   const loginMethodQy = searchParams.get("loginMethod") ?? "";
//   const userIdQy = searchParams.get("id") ?? "";
//   const statusQy = searchParams.get("status") ?? "";
//   const sessionQy = searchParams.get("session") ?? "";

//   const session = UserClass.deserialize(sSession);
//   const auth = AuthClass.deserialize(sAuth);
//   const userId = session?.getId() || (userIdQy ?? "");
//   const SessionID = auth?.getSessionId() || (sessionQy ?? "");

//   const verifySession = async (data: AuthClass) => {
//     try {
//       if (data.isLogged && userId) {
//         const verifData = await dispatch(verifySessionX(SessionID));
//         if (verifData.meta.requestStatus === "fulfilled") {
//           console.log("Sesión válida");
//           await setSessionFn();
//           return true;
//         } else {
//           console.log("Sesión no válida");
//           return false;
//         }
//       } else {
//         console.log("Debes iniciar sesión primero");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const setSessionFn = async () => {
//     await dispatch(setSession(userId as string));
//   };

//   const setAuthFn = async () => {
//     const authObj = new AuthClass(
//       statusQy === "ok" ? true : false,
//       loginMethodQy as string,
//       sessionQy as string,
//     );
//     await dispatch(setAuth(authObj));
//     return authObj;
//   };

//   const systemHoc = async () => {
//     if (auth?.getIsLogged()) {
//       const sessionOk = await verifySession(auth);
//       if (!sessionOk) {
//         await dispatch(logout());
//       }
//     } else if (
//       !auth?.isLogged &&
//       loginMethodQy &&
//       userIdQy &&
//       statusQy &&
//       sessionQy
//     ) {
//       const authData = await setAuthFn();
//       const sessionOk = await verifySession(authData);
//       if (!sessionOk) {
//         if (!sessionOk) {
//           await dispatch(logout());
//         }
//       }
//     } else {
//       console.log("No hay datos de autenticación");
//     }
//   };

//   const delayedSystemStart = useMemo(
//     () => debounce(() => systemHoc(), 500),
//     [
//       pathname,
//       userId,
//       //  auth?.getIsLogged() === true,
//       loginMethodQy,
//       userIdQy,
//       statusQy,
//       searchParams,
//       session?.getId(),
//     ],
//   );

//   useEffect(() => {
//     const cancelDebounce = () => {
//       delayedSystemStart.cancel();
//     };
//     delayedSystemStart();
//     return cancelDebounce;
//   }, [delayedSystemStart]);

//   useEffect(() => {
//     console.log("pathname", pathname);
//     //Si estamos en la página de login y estamos logueados, redirigimos a la página de inicio
//     if (
//       (pathname === "/auth" || pathname === "/auth/register") &&
//       auth?.getIsLogged()
//     ) {
//       router.push("/");
//     }
//   }, [pathname, auth?.getIsLogged(), router]);

//   // Rutas protegidas
//   //   console.log(auth?.getIsLogged(), userId, auth);
//   //   if (!auth?.getIsLogged() || auth?.getIsLogged() == undefined || !userId) {
//   //     return null;
//   //   } else {
//   //     return <main>{children}</main>;
//   //   }

//   return <main>{children}</main>;
// };

// export default SecurityHOC;
