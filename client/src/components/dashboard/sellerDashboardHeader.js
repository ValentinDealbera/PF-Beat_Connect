import { Logo, HamburgerAdmin } from "@/components";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import { useRouter } from "next/router";

export default function SellerDashboardHeader() {
  const router = useRouter();
  const [hamburguerVisible, setHamburguerVisible] = useState(false);

  const dashboardNav = [
    {
      title: "dashboardNav.t1",
      url: "/admin/",
      icon: "/icon/dashboard/overview.svg",

    },
    {
      title: "Beats",
      url: "/admin/beats",
      icon: "/icon/dashboard/musical-black.svg",

    },
    {
      title: "dashboardNav.t2",
      url: "/admin/users",
      icon: "/icon/dashboard/user-black.svg",

    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: "/icon/dashboard/reviews.svg",

    },
    {
      title: "dashboardNav.t3",
      url: "/admin/orders",
      icon: "/icon/dashboard/orders.svg",
   
    },
  ];
  return (
    <>
      <header
        className={`"background-neutral-white" background-neutral-white fixed z-50 flex  w-full flex-row justify-center py-8 dark:bg-customDark-900`}
      >
        <div
          className={`padding-x-dashboard-estilo1 flex w-full items-center  justify-between align-middle `}
        >
          <Logo mode={"light"} />
          <ReactSVG
            src="/icon/hamburguer.svg"
            className="dashboard-item__icon flex cursor-pointer fill-current text-white dark:text-white xl:hidden"
            onClick={() => setHamburguerVisible(!hamburguerVisible)}
          />
        </div>
        
      </header>
      {hamburguerVisible && (
        <HamburgerAdmin
          options={dashboardNav}
          manageHamburguer={setHamburguerVisible}
        />
      )}
    </>
  );
}
