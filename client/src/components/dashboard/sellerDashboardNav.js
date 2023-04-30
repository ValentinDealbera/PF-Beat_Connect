import { Search, DashboardItem } from "@/components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function SellerDashboardNav() {
  const theme = useSelector((state) => state.client.authSession.theme);
  const [t] = useTranslation("global");

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
  ];

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
      </div>
    </>
  );
}

function NavItems(props) {
  return (
    <div className="flex flex-col ">
      <DashboardItem
        title={props.itemTitle}
        link={props.itemLink}
        icon={props.itemIcon}
      />
    </div>
  );
}
