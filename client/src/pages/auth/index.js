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
import { useTranslation } from "react-i18next";

export default function Login() {
  const [t, i18n] = useTranslation("global");
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
          {t("authIndex.t1")}{" "}
          <span className="text-titulo3-semibold">{t("authIndex.t2")}</span>
        </h1>
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          <Input
            type="email"
            name="email"
            label={t("authIndex.label")}
            placeholder={t("authIndex.placeholder")}
            className="w-full"
          />
          <Input
            type="password"
            name="password"
            label={t("authIndex.labelPassword")}
            placeholder={t("authIndex.placeholderPassword")}
          />
          <p className=" w-full text-center font-light">
            {t("authIndex.t3")}{" "}
            <Link href="/auth/recover" className="font-medium text-red-700">
              {t("authIndex.t4")}
            </Link>
          </p>
          <button
            type="submit"
            className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
          >
            {t("authIndex.t5")}
          </button>
        </form>
        <hr className="my-6 w-full" />
        <GoogleButton />
        <p className="mt-6 w-full text-center font-light">
            {t("authIndex.t6")}{" "}
          <Link href="/auth/register" className="font-medium text-red-700">
            {t("authIndex.t7")}
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
