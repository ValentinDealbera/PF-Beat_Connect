import { fetchBeats } from "@/redux/slices/beats";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Master(props) {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchBeats());
    }, []);

  return <>{props.children}</>;
}
