"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { fetchBeats } from "@/redux/slices/beats";
type Props = {
  children: ReactNode;
};

export default function Querier({ children }: Props) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBeats({}));
  }, []);

  // useEffect(() => {
  //   if (pathname === "/") {
  //     dispatch(getCharacters());
  //   }

  //   console.log("pathname", pathname, params.gameId, router);

  //   if (params?.characterId) {
  //     dispatch(getCharacterById(params?.characterId.toString()));
  //   }
  // }, [pathname]);

  return <div>{children}</div>;
}
