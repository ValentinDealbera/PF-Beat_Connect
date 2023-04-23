import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginMethod } from "@/redux/slices/client";
import { useRouter } from "next/router";

export default function GoogleButton(){

  const dispatch = useDispatch();
  const router = useRouter();

const handleLogin = () => {
    dispatch(setLoginMethod("google"));
    router.push("http://localhost:3001/api/google");
  };

// const handleLogin = async () => {
//   await dispatch(setLoginMethod("google"));
//   const popup = window.open("http://localhost:3001/api/google", "popup", "width=600,height=600");
//   window.addEventListener("message", async (event) => {
//     const { message, id } = event.data;

//     // Hacer console.log del objeto JSON
//     console.log(message, id);
//     if (event.source === popup && event.data === "login-success") {
//       const response = await fetch("http://localhost:3001/api/user");
//       const data = await response.json();
//       console.log(data);
//     }
//   });
// };


    return(

        <button
          className="text-base-medium flex w-full  justify-center items-center gap-2 rounded-full border px-8 py-2 text-black"
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
 
    )
}