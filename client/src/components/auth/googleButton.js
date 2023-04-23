import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginMethod } from "@/redux/slices/client";
import { useRouter } from "next/router";
import { serverUrl } from "@/data/config";
export default function GoogleButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    dispatch(setLoginMethod("google"));
    router.push(`${serverUrl}api/google`);
  };

  return (
    <button
      className="text-base-medium flex w-full  items-center justify-center gap-2 rounded-full border px-8 py-2 text-black"
      style={{ background: "#fff" }}
      onClick={handleLogin}
    >
      <div className="rounded-full bg-white p-2">
        <Image
          src="/icon/google.png"
          alt="Google"
          width={15}
          height={15}
          className="aspect-square"
        />
      </div>
      <span>Continuar con Google</span>
    </button>
  );
}
