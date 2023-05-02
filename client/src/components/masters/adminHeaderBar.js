import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function AdminHeaderBar() {
  const router = useRouter();
    const { isLogged, isAdmin } = useSelector((state) => state.client.authSession.auth);

if(router.pathname.startsWith("/admin") || router.pathname.startsWith("/auth") || !isAdmin || !isLogged){
    return null;
}

  return (
    <>
    <div className="bg-black w-full flex justify-center">
      <div className="padding-x-estilo2 flex h-10 items-center justify-between bg-black">
        <p className="text-sm-light text-white">Hola Admin, bienvenido</p>
        <button
          className="text-sm-semibold text-white"
          onClick={() => {
            router.push("/admin");
          }}
        >
          Ir al panel de control
        </button>
      </div>
      </div>
    </>
  );
}
