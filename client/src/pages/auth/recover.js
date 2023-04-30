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
import { useTranslation } from "react-i18next";

export default function Login() {
  const [t] = useTranslation("global");
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
          {t("recover.t1")}<span className="text-titulo3-semibold">{t("recover.t2")}</span>
        </h1>
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          <Input
            type="email"
            name="email"
            label={t("recover.t3")}
            placeholder={t("recover.t3")}
            className="w-full"
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
