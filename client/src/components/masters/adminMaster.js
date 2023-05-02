import { useDispatch } from "react-redux";
import { adminGetData } from "@/redux/slices/admin/adminSession";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";

export default function AdminMaster(props) {
  const dispatch = useDispatch();

  const delayedAdminGetBeats = useMemo(
    () => debounce((value) => dispatch(adminGetData(value)), 500),
    [dispatch]
  );

  useEffect(() => {
    const cancelDebounce = () => {
      delayedAdminGetBeats.cancel();
    };

    delayedAdminGetBeats();

    return cancelDebounce;
  }, []);

  return <>{props.children}</>;
}
