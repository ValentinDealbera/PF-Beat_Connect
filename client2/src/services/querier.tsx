"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBeats } from "@/redux/slices/beats";
type Props = {
  children: ReactNode;
};

export default function Querier({ children }: Props) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
const currentPage = useAppSelector((state) => state.beats.pages.current);
  useEffect(() => {
    dispatch(fetchBeats({}));
  }, []);

  useEffect(() => {
    dispatch(fetchBeats({ page: currentPage }));
  }, [currentPage]);

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
