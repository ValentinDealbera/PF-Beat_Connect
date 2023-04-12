import { Logo, Nav } from "@/components";
import { navPublic } from "@/data/data";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const currentSlug = router.pathname;
  console.log(currentSlug);

  const currentItem = navPublic.find((item) => currentSlug === item.url);

  console.log(currentItem, currentSlug);

  const currentMode = currentItem ? currentItem.colorMode : "light";

  console.log("header", currentMode);

  return (
    <header
      className={`fixed z-30 flex w-full  flex-row justify-center py-8 ${
        currentMode === "transparent" ? " " : "background-neutral-white"
      }`}
    >
      <div
        className={`padding-x-estilo2 flex items-center  justify-between align-middle `}
      >
        <Logo mode={currentMode} />
        <Nav currentMode={currentMode} navItems={navPublic} />
      </div>
    </header>
  );
}
