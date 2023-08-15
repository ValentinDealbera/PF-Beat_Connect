import { DashboardItem } from "@/components";
import { useAppSelector } from "@/redux/hooks";
import { useTranslation } from "react-i18next";

export default function SellerDashboardNav() {
  const theme = useAppSelector((state) => state.client.authSession.theme);
  const [t, i18n] = useTranslation("global");

  const dashboardNav = [
    {
      title: "dashboardNav.t1",
      link: "/admin/",
      icon: (() => {
        if (theme === "dark") {
          return "/icon/dashboard/overview.svg";
        } else {
          return "/icon/dashboard/overview.svg";
        }
      })(),
    },
    {
      title: "Beats",
      link: "/admin/beats",
      icon: "/icon/dashboard/musical-black.svg",
    },
    {
      title: "dashboardNav.t2",
      link: "/admin/users",
      icon: "/icon/dashboard/user-black.svg",
    },
    {
      title: "Reviews",
      link: "/admin/reviews",
      icon: "/icon/dashboard/reviews.svg",
    },
    {
      title: "dashboardNav.t3",
      link: "/admin/orders",
      icon: "/icon/dashboard/orders.svg",
    },
    {
      title: "dashboardNav.t5",
      link: "https://docs.google.com/spreadsheets/d/1Kmwc2nt_oiQWiaD7guh62nA_T6a9HNUMXQb6souPSm8/edit?usp=share_link",
      icon: "/icon/dashboard/megafono.svg",
    },
  ];

  const currentLanguage = i18n.language;

  return (
    <>
      <div className="gap-estilo2 flex flex-col">
        {/* <Search colorMode={"red"} sizeMode={"small"} className={"w-full"} /> */}
        <div className="flex flex-col  gap-6">
          {dashboardNav.map((item) => (
            <NavItems
              itemTitle={t(item.title)}
              itemLink={item.link}
              itemIcon={item.icon}
            />
          ))}
        </div>
        <br />
        <div className="gap-estilo4 flex flex-col">
          <h3 className="text-subtitulo-semibold color-neutral-white">
            {t("footerNav.idioma")}
          </h3>

          <div className="flex flex-col gap-4 md:flex-row lg:gap-2">
            <button
              onClick={() => i18n.changeLanguage("es")}
              className={`text-white  ${
                currentLanguage === "es" ? "font-bold underline" : "font-light"
              }`}
            >
              Español
            </button>
            <button
              onClick={() => i18n.changeLanguage("en")}
              className={`text-white  ${
                currentLanguage === "en" ? "font-bold underline" : "font-light"
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

type NavItemsProps = {
  itemTitle: string;
  itemLink: string;
  itemIcon: string;
};

function NavItems({ itemTitle, itemLink, itemIcon }: NavItemsProps) {
  return (
    <div className="flex flex-col ">
      <DashboardItem title={itemTitle} link={itemLink} icon={itemIcon} />
    </div>
  );
}
