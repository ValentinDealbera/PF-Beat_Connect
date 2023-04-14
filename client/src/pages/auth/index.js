import {
  Input,
  SimpleHeader,
  Head,
  GoogleButton,
  AuthLayout,
} from "@/components";
import Link from "next/link";
import { setCurrentClient } from "@/redux/slices/client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCurrentClient());
    router.push("/client");
  };
  return (
    <>
      <Head title="Ingresar" />
      <SimpleHeader />
      <AuthLayout>
        <h1 className="text-titulo3-regular mb-6">
          Hey, bienvenido{" "}
          <span className="text-titulo3-semibold">de nuevo</span>
        </h1>
        <form className="flex w-full flex-col gap-4">
          <Input
            type="email"
            name="email"
            label="Correo electrónico"
            placeholder="Correo electrónico"
            className="w-full"
          />
          <Input
            type="password"
            name="password"
            label="Contraseña"
            placeholder="Contraseña"
          />

          <button
            type="submit"
            className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
            onClick={handleSubmit}
          >
            Ingresar
          </button>
        </form>
        <hr className="my-6 w-full" />
        <GoogleButton />
        <p className="mt-6 w-full text-center font-light">
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/register" className="font-medium text-red-700">
            Regístrate
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
