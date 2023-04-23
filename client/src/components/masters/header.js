import {
  Logo,
  Nav,
  UserBoxNav,
  VerticalNav,
  BeatRightSheet,
  Input,
  CheckboxGroup,
  BecomeSeller,
  PostBeat,
  managePostBeat,
  manageBecomeSeller,
  EditBeat,
} from "@/components";
import { useRouter } from "next/router";
import { navPublic } from "@/data/data";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();

  const currentSlug = router.pathname;
  const [headerType, setHeaderType] = useState("default");
  const currentItem = navPublic.find((item) => currentSlug === item.url);
  const currentMode = currentItem ? currentItem.colorMode : "transparent";
  //obtenemos isSeller
  const { authSettings } = useSelector((state) => state.client);
  const { isSeller } = authSettings;

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
      name: "Perfil",
      url: "/client",
      colorMode: "light",
      visibility: true,
    },
    {
      name: "Inbox",
      url: "/client/inbox",
      colorMode: "light",
      visibility: true,
    },
    {
      name: "Vende tus beats",
      url: "",
      onClick: () => manageBecomeSeller(),
      // // visibility: !isSeller,
      visibility: true,
      visibility: true,
    },
    {
      name: "Publicar un beat",
      url: "",
      onClick: () => managePostBeat(),
      //  //  visibility: isSeller,
      visibility: true,
      visibility: true,
    },
    {
      name: "Configuracion",
      url: "/client/settings",
      colorMode: "light",
      visibility: true,
    },
    {
      name: "Facturacion",
      url: "/client/billing",
      colorMode: "light",
      visibility: true,
    },
    {
      name: "Logout",
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
        className={`fixed z-30 flex w-full  flex-row justify-center py-8 ${
          currentMode === "light" ? "background-neutral-white " : ""
        }`}
        style={
          headerType === "alternative"
            ? { background: "#000000b3", backdropFilter: "blur(3px)" }
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
