import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  fetchBeats,
  fetchCurrentAuthor,
  setActiveItemsForProfile,
  setBeatsDisplayMode,
  setUserFavoriteBeats,
  setUserOwnedBeats,
  setUserPurchasedBeats,
} from "@/redux/slices/beats";

import { setTheme } from "@/redux/slices/client/authSession";
import darkmode from "@/utils/darkMode";

export default function Master(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    generalActiveIndex,
    beatsDisplayMode,
    publicBeatsFetchStatus,
    authorFetchStatus,
    setGeneralActiveIndex,
  } = useSelector((state) => state.beats);


  const getTheme= async () => {
    const prefersDarkMode = await darkmode();
    const mode = prefersDarkMode ? "dark" : "light";
    console.log("mode", mode);
    dispatch(setTheme(mode));
  };

useEffect(() => {
 getTheme();
}, [window.matchMedia('(prefers-color-scheme: dark)').matches]);

  useEffect(() => {
    console.log("fetch master");
    if (router.pathname.startsWith("/client")) return;
    else if (router.pathname.startsWith("/beats/author")) return;
    else if (router.pathname === "/beats") return;
    // dispatch(fetchBeats({}));
  }, [dispatch, router.pathname]);



  useEffect(() => {
    if (router.pathname.startsWith("/client")) {
      // dispatch(fetchUserBeats());
    } else if (router.pathname.startsWith("/beats/author")) return;
    else if (router.pathname === "/beats") {
      //  dispatch(setBeatsDisplayMode(0));
      return;
    } else {
      dispatch(setBeatsDisplayMode(1));

      // dispatch(fetchBeats());
    }
  }, [dispatch, router]);

  // useEffect(() => {
  //   switch (generalActiveIndex) {
  //     case 0:
  //       dispatch(setActiveItemsForProfile(0));
  //       break;
  //     case 1:
  //       dispatch(setActiveItemsForProfile(1));
  //       break;
  //     case 2:
  //       dispatch(setActiveItemsForProfile(2));
  //       break;
  //     default:
  //       break;
  //   }
  // }, [dispatch, generalActiveIndex]);

  // useEffect(() => {
  //   switch (beatsDisplayMode) {
  //     case 2:
  //       console.log("solicitamos items activos para perfil");
  //       break;
  //     case 3:
  //       console.log("solicitamos items activos para carrito");
  //       break;
  //     default:
  //       break;
  //   }
  // }, [beatsDisplayMode]);

  return <>{props.children}</>;
}
