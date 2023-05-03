import {
  Input,
  SimpleHeader,
  Head,
  GoogleButton,
  AuthLayout,
} from "@/components";
import { ValidateRecoverMail } from "@/components/validation/client/recoverMail";
import Link from "next/link";
import {
  setCurrentClient,
  recoverPassword,
} from "@/redux/slices/client/authSession";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Login() {
  const [t] = useTranslation("global");
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    const updatedError = ValidateRecoverMail(value);
    setErrors({ ...error, [name]: updatedError[name] });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const data = {
        email: e.target.email.value,
      };

      if (!error.email) {
        dispatch(recoverPassword(data));
      } else {
      }
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
          {t("recover.t1")}
          <span className="text-titulo3-semibold">{t("recover.t2")}</span>
        </h1>
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          <Input
            type="email"
            name="email"
            label={t("recover.t3")}
            placeholder={t("recover.t3")}
            className="w-full"
            error={error.email}
            onChange={handleInput}
          />
          <button
            type="submit"
            className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
          >
            {t("recover.t4")}
          </button>
        </form>
      </AuthLayout>
    </>
  );
}
