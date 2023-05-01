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
import { useTranslation } from "react-i18next";

export default function RecoverPass() {
  const [t] = useTranslation("global");
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Head title="Ingresar" />
      <SimpleHeader />
      <AuthLayout>
        <div className="flex h-full w-full flex-col items-center justify-center gap-7 overflow-y-hidden px-14 pb-4  ">
          <h1 className="text-titulo3-regular mb-6">
            {t("recover.t5")} <span className="text-titulo3-semibold">{t("recover.t2")}</span>
          </h1>
          <div className="flex w-full flex-col gap-5 overflow-y-hidden">
            <div className="flex flex-col items-center justify-center gap-0"></div>
            <RecoveryPasswordForm />
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
