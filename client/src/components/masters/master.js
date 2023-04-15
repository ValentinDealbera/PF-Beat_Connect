import { fetchBeats } from "@/redux/slices/beats";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  setBeatsDisplayMode,
  fetchCurrentAuthor,
  fetchCurrentAuthorBeats,
} from "@/redux/slices/beats";

export default function Master(props) {
  const router = useRouter();

  const { generalActiveIndex } = useSelector((state) => state.beats);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBeats());
  }, []);

  useEffect(() => {
    if (router.pathname === "/beats") {
      dispatch(setBeatsDisplayMode(0));
    } else if (router.pathname === "/client") {
      dispatch(setBeatsDisplayMode(2));
    } else if (router.pathname.startsWith("/beats/author")) {
      const { slug } = router.query;
      dispatch(fetchCurrentAuthor(slug));
      dispatch(fetchCurrentAuthorBeats(slug));
    } else {
      dispatch(setBeatsDisplayMode(1));
    }
  }, [router.pathname, (router.pathname.startsWith("/beats/author") ? router.query.slug : "")]);

  useEffect(() => {
    console.log("generalActiveIndex", generalActiveIndex);
  }, [generalActiveIndex]);

  return <>{props.children}</>;
}
