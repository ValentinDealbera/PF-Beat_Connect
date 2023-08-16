import { useAppDispatch } from "@/redux/hooks";
import { adminGetData } from "@/redux/slices/admin/adminSession";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";

type Props = {
  children: React.ReactNode;
};

export default function AdminMaster({ children }: Props) {
  const dispatch = useAppDispatch();

  const delayedAdminGetBeats = useMemo(
    () => debounce(() => dispatch(adminGetData()), 500),
    [dispatch],
  );

  useEffect(() => {
    const cancelDebounce = () => {
      delayedAdminGetBeats.cancel();
    };

    delayedAdminGetBeats();

    return cancelDebounce;
  }, []);

  return <>{children}</>;
}
