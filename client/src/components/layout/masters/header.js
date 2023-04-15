import { Logo, Nav, UserBoxNav, VerticalNav } from "@/components";
import { useRouter } from "next/router";
import { navPublic, navClient } from "@/data/data";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();

  const currentSlug = router.pathname;
  const [headerType, setHeaderType] = useState("default");
  const currentItem = navPublic.find((item) => currentSlug === item.url);
  const currentMode = currentItem ? currentItem.colorMode : "transparent";

  useEffect(() => {
    const handleScroll = () => {
      // console.log(headerType)
      if (window.scrollY > 100) {
        setHeaderType("alternative");
        //   console.log("headerType")
      } else {
        setHeaderType("default");
        // console.log(headerType)
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
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
        className={`padding-x-estilo2 flex items-center  justify-between align-middle `}
      >
        <Logo mode={currentMode} />
        <Nav currentMode={currentMode} navItems={navPublic} />
        <UserBoxNav id={"userBoxNav"}>
          <VerticalNav navItems={navClient} title={"Centro de ayuda"} />
        </UserBoxNav>
      </div>
    </header>
  );
}