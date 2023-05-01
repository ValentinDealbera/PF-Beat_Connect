import {
  Logo,
  Nav,
  UserBoxNav,
  VerticalNav,
  BecomeSeller,
  PostBeat,
  managePostBeat,
  manageBecomeSeller,
  EditBeat,
  AdminHeaderBar,
} from "@/components";
import { useRouter } from "next/router";
import { navPublic } from "@/data/data";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Header() {
const router = useRouter();
  

  const currentSlug = router.pathname;
  const [headerType, setHeaderType] = useState("default");
  const currentItem = navPublic.find((item) => currentSlug === item.url);
  const currentMode = currentItem ? currentItem.colorMode : "transparent";
  const { isSeller } = useSelector((state) => state.client.authSession.auth);
  const [t, i18n] = useTranslation("global");


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHeaderType("alternative");
      } else {
        setHeaderType("default");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navClient = [
    {
      name: "navClient.t1",
      url: "/client",
      colorMode: "light",
      visibility: true,
    },
    {
      name: "navClient.t2",
      url: "/client/inbox",
      colorMode: "light",
      visibility: false,
    },
    {
      name:  t("navClient.t3"),
      url: "",
      onClick: () => manageBecomeSeller(),
      // // visibility: !isSeller,
      visibility: true,
      // visibility: true,
    },
    {
      name: t("navClient.t4"),
      url: "",
      onClick: () => managePostBeat(),
      //  //  visibility: isSeller,
      visibility: true,
      visibility: true,
    },
    {
      name: "navClient.t5",
      url: "/client/settings",
      colorMode: "light",
      visibility: true,
    },
    {
      name: "navClient.t6",
      url: "/client/billing",
      colorMode: "light",
      visibility: true,
    },
    {
      name: "navClient.t7",
      url: "/auth/logout",
      colorMode: "light",
      visibility: true,
    },
  ];

  return (
    <>
      <BecomeSeller />
      <PostBeat />
      <EditBeat />
      
      <header
        className={`fixed z-30 flex  w-full  flex-row justify-center py-8 ${
          currentMode === "light" ? "background-neutral-white " : ""
        }`}
        style={
          headerType === "alternative"
            ? { background: "#000000b3", backdropFilter: "blur(3px)", top: 0 }
            : {}
        }
      >
        <div
          className={`padding-x-estilo2 relative flex items-center justify-between align-middle `}
        >
          <Logo mode={currentMode} />
          <div className="absolute left-[50%] w-max translate-x-[-50%]">
            <Nav currentMode={currentMode} navItems={navPublic} />
          </div>
          <UserBoxNav id={"userBoxNavUnique"}>
            <VerticalNav navItems={navClient} title={"Centro de ayuda"} />
          </UserBoxNav>
        </div>
      </header>
    </>
  );
}
