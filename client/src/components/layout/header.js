import { Logo, Nav } from "@/components";
import { navPublic } from "@/data/data";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const currentSlug = router.pathname;

  const currentMode = navPublic.find(
    (item) => item.url === currentSlug
  ).colorMode;

  return (
    <header className=" flex flex-row justify-center py-8  ">
      <div className="padding-x-estilo2 flex items-center  justify-between align-middle">
        <Logo mode={currentMode} />
        <Nav currentMode={currentMode} navItems={navPublic} />
      </div>
    </header>
  );
}
