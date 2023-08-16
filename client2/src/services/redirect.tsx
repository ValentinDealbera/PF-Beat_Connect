import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
type Props = {
  children: ReactNode;
};

export default function RedirectProvider({ children }: Props) {
  const router = useRouter();


  return <div>{children}</div>;
}
