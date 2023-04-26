import {
  Input,
  SimpleHeader,
  Head,
  GoogleButton,
  AuthLayout,
} from "@/components";
import Link from "next/link";
import { setCurrentClient, recoverPassword } from "@/redux/slices/client/authSession";
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
      };

      dispatch(recoverPassword(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head title="Ingresar" />
      <SimpleHeader />
      <AuthLayout>
        <h1 className="text-titulo3-regular mb-6">
          Recupera tu <span className="text-titulo3-semibold">contraseña</span>
        </h1>
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          <Input
            type="email"
            name="email"
            label="Ingresa tu email"
            placeholder="Ingresa tu email"
            className="w-full"
          />
          <button
            type="submit"
            className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
          >
            Enviar solicitud
          </button>
        </form>
      </AuthLayout>
    </>
  );
}
