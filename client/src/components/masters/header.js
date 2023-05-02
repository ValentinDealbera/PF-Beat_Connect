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
  Hamburger,
} from "@/components";
import { ReactSVG } from "react-svg";
import { useRouter } from "next/router";
import { navPublic, navPublicMobile } from "@/data/data";
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
      name:  t("navClient.t1"),
      url: "/client",
      colorMode: "light",
      visibility: true,
      onClick: () => {setHamburguerVisible(false), router.push("/client")},
    },
    {
      name: "navClient.t2",
      url: "/client/inbox",
      colorMode: "light",
      visibility: false,
      onClick: () => {setHamburguerVisible(false)},
    },
    {
      name: t("navClient.t3"),
      url: "",
      onClick: () => {manageBecomeSeller(), setHamburguerVisible(false)},
      // // visibility: !isSeller,
      visibility: true,
   
      // visibility: true,
    },
    {
      name: t("navClient.t4"),
      url: "",
      onClick: () => {managePostBeat(), setHamburguerVisible(false)},
      //  //  visibility: isSeller,
      visibility: true,
      visibility: true,
    },
    {
      name: t("navClient.t5"),
      url: "/client/settings",
      colorMode: "light",
      visibility: true,
      onClick: () => {setHamburguerVisible(false), router.push("/client/settings")},
    },
    {
      name: t("navClient.t6"),
      url: "/client/billing",
      colorMode: "light",
      visibility: true,
      onClick: () => {setHamburguerVisible(false), router.push("/client/billing")},
    },
    {
      name:  t("navClient.t7"),
      url: "/auth/logout",
      colorMode: "light",
      visibility: true,
      onClick: () => {setHamburguerVisible(false), router.push("/auth/logout")},
    },
  ];

  const [hamburguerVisible, setHamburguerVisible] = useState(false);

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
          className={`padding-x-estilo2 relative  flex items-center justify-between align-middle`}
        >
          <Logo mode={currentMode} />
          <ReactSVG
            src="/icon/hamburguer.svg"
            className="dashboard-item__icon flex cursor-pointer fill-current text-white dark:text-white lg:hidden"
            onClick={() => setHamburguerVisible(!hamburguerVisible)}
          />
          <div className="absolute left-[50%] hidden w-max  translate-x-[-50%] lg:flex">
            <Nav currentMode={currentMode} navItems={navPublic} />
          </div>
          <div className=" hidden lg:flex">
            <UserBoxNav id={"userBoxNavUnique"}>
              <VerticalNav navItems={navClient} title={"Centro de ayuda"} />
            </UserBoxNav>
          </div>
        </div>
      </header>
      {hamburguerVisible && (
        <Hamburger
          options={navPublicMobile}
          userMenu={navClient}
          manageHamburguer={setHamburguerVisible}
        />
      )}
    </>
  );
}
