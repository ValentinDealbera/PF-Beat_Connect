import {
  Input,
  SimpleHeader,
  Head,
  GoogleButton,
  AuthLayout,
} from "@/components";
import Link from "next/link";
import { setCurrentClient, jsonLogin } from "@/redux/slices/client/authSession";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      dispatch(jsonLogin(data));
    } catch (error) {
      toast.error("Ocurrio un error, recarga la pagina", {
        style: {
          background: "#FFF0F0",
          color: "#E60000",
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // router.push("/client");
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
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
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
          <p className="mt-6 w-full text-center font-light">
            ¿No recuerdas tu contraseña?{" "}
            <Link href="/auth/recover" className="font-medium text-red-700">
              Recuperar
            </Link>
          </p>
          <button
            type="submit"
            className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
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
