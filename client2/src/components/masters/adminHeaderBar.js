import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function AdminHeaderBar() {
  const [t] = useTranslation("global");
  const router = useRouter();
  const { isLogged, isAdmin } = useSelector(
    (state) => state.client.authSession.auth,
  );

  if (
    router.pathname.startsWith("/admin") ||
    router.pathname.startsWith("/auth") ||
    !isAdmin ||
    !isLogged
  ) {
    return null;
  }

  return (
    <>
      <div className="bg-black w-full flex justify-center">
        <div className="padding-x-estilo2 flex h-10 items-center justify-between bg-black">
          <p className="text-sm-light text-white">{t("adminHeaderBar.t1")}</p>
          <button
            className="text-sm-semibold text-white"
            onClick={() => {
              router.push("/admin");
            }}
          >
            {t("adminHeaderBar.t2")}
          </button>
        </div>
      </div>
    </>
  );
}
