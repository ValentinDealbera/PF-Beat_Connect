import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  fetchBeats,
  fetchCurrentAuthor,
  fetchUserBeats,
  setActiveItemsForProfile,
  setBeatsDisplayMode,
  setUserFavoriteBeats,
  setUserOwnedBeats,
  setUserPurchasedBeats,
} from "@/redux/slices/beats";

export default function Master(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    generalActiveIndex,
    beatsDisplayMode,
    publicBeatsFetchStatus,
    authorFetchStatus,
    setGeneralActiveIndex
  } = useSelector((state) => state.beats);

  useEffect(() => {
    if (router.pathname.startsWith("/client")) return
    dispatch(fetchBeats());
  }, [dispatch, router]);

  useEffect(() => {
    if (router.pathname.startsWith("/client")) {
      dispatch(fetchUserBeats());
      
    }
    else if (router.pathname.startsWith("/beats/author")) return;
    else if (router.pathname === "/beats") {
    //  dispatch(setBeatsDisplayMode(0));
    return;
    }
   else  {
    dispatch(setBeatsDisplayMode(1));
    console.log("solicitamos beats");
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

// import { fetchBeats } from "@/redux/slices/beats";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import {
//   setBeatsDisplayMode,
//   fetchCurrentAuthor,
//   setUserOwnedBeats,
//   setUserPurchasedBeats,
//   setUserFavoriteBeats,
//   fetchUserBeats,
//   setActiveItemsForProfile,
// } from "@/redux/slices/beats";

// export default function Master(props) {
//   const router = useRouter();

//   const { generalActiveIndex, beatsDisplayMode } = useSelector(
//     (state) => state.beats
//   );

// const [beatsLoaded, setBeatsLoaded] = useState(false);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchBeats()).then(() => {
//       setBeatsLoaded(true);
//     });
//   }, []);

//   useEffect(() => {
//     if (router.pathname === "/beats") {
//       dispatch(setBeatsDisplayMode(0));
//     } else if (router.pathname === "/client") {
//       dispatch(fetchUserBeats());
//       dispatch(setBeatsDisplayMode(2));
//     } else if (router.pathname.startsWith("/beats/author")) {
//       const { slug } = router.query;
//       dispatch(fetchCurrentAuthor(slug));
//     } else {
//       console.log("solicitamos display 1");
//       if (beatsLoaded) {
//         dispatch(setBeatsDisplayMode(1));
//       }
//     }
//   }, [
//     router.pathname,
//     router.pathname.startsWith("/beats/author") ? router.query.slug : "",
//   ]);

//   useEffect(() => {
//     if (beatsDisplayMode === 2) {
//       if (generalActiveIndex === 0) {
//         console.log("solicitamos setUserPurchasedBeats");
//         dispatch(setActiveItemsForProfile(0));
//       } else if (generalActiveIndex === 1) {
//         console.log("solicitamos setUserOwnedBeats");
//         dispatch(setActiveItemsForProfile(1));
//       } else if (generalActiveIndex === 2) {
//         console.log("solicitamos setUserFavoriteBeats");
//         dispatch(setActiveItemsForProfile(2));
//       }
//     }
//     console.log(
//       "generalActiveIndex, beatsDisplayMode",
//       generalActiveIndex,
//       beatsDisplayMode
//     );
//   }, [generalActiveIndex]);

//   return <>{props.children}</>;
// }
