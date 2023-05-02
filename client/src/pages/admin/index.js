import {
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
  Head,
} from "@/components";
import { useTranslation } from "react-i18next";

export default function SellerDashboardOverview() {
  const [t, i18n] = useTranslation("global");
  return (
    <>
      <Head title="Panel de control" />
      <main >
        <SellerDashboardLayout
          topBarMode="message"
          topBarMessage={t("admin.t1")}
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
            <h1 className="text-subtitulo-semibold dark:text-white ">
                {t("admin.t2")}
            </h1>
            <FaqsGrid />
          </IslandDashboard>
        </SellerDashboardLayout> 
      </main>
    </>
  );
}
