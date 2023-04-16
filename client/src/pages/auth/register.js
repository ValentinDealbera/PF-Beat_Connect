import {
  Input,
  SimpleHeader,
  Head,
  GoogleButton,
  AuthLayout,
} from "@/components";
import Link from "next/link";
import { toast } from "sonner";

import { useState } from "react";
import { useRouter } from "next/router";
import { registerClientUser } from "@/redux/slices/client";
import { useDispatch } from "react-redux";

export default function Login() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const router = useRouter();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form);
    try {
      await dispatch(registerClientUser(form));
    setTimeout(() => {
      router.push("/auth");
    }, 2000);
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
          Registrate en{" "}
          <span className="text-titulo3-semibold">BeatConnect</span>
        </h1>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          {step === 1 && (
            <div id="step1" className="flex w-full flex-col gap-4">
              <Input
                type="text"
                name="firstName"
                label="Nombre"
                placeholder="Nombre"
                className="w-full"
                onChange={handleChange}
              />
              <Input
                type="text"
                name="lastName"
                label="Apellido"
                placeholder="Apellido"
                className="w-full"
                onChange={handleChange}
              />
              <button
                type="button"
                className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
                onClick={() => setStep(2)}
              >
                Siguiente
              </button>
            </div>
          )}
          {step === 2 && (
            <div id="step2" className="flex w-full flex-col gap-4">
              <Input
                type="email"
                name="email"
                label="Correo electrónico"
                placeholder="Correo electrónico"
                className="w-full"
                onChange={handleChange}
              />
              <Input
                type="text"
                name="username"
                label="Nombre de usuario"
                placeholder="Nombre de usuario"
                className="w-full"
                onChange={handleChange}
              />
              <Input
                type="password"
                name="password"
                label="Contraseña"
                placeholder="Contraseña"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
              >
                Registrarme
              </button>
            </div>
          )}
        </form>
        <hr className="my-6 w-full" />
        <GoogleButton />
        <p className="mt-6 w-full text-center font-light">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth" className="font-medium text-red-700">
            Inicia sesión
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}