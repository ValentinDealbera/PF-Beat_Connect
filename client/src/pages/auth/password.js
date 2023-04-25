import {
  Input,
  SimpleHeader,
  Head,
  GoogleButton,
  AuthLayout,
  RecoveryPasswordForm,
} from "@/components";

import Link from "next/link";
import {
  setCurrentClient,
  recoverPassword,
} from "@/redux/slices/client/authSession";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function RecoverPass() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Head title="Ingresar" />
      <SimpleHeader />
      <AuthLayout>
        <h1 className="text-titulo3-regular mb-6">
          Cambiá <span className="text-titulo3-semibold"> tu contraseña</span>
        </h1>
        <RecoveryPasswordForm />
      </AuthLayout>
    </>
  );
}
