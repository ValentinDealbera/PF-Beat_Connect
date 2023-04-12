import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav({ currentMode, navItems }) {
  const router = useRouter();
  console.log("nav", currentMode);
  return (
    <>
      <nav className="z-10 hidden lg:flex">
        <ul className="gap-estilo2 flex flex-row">
          {navItems.map(
            (item, index) =>
              item.visible === true && (
                <li key={index}>
                  <Link
                    href={item.url}
                    className={`${
                      item.url === router.pathname
                        ? "text-base-semibold"
                        : "text-base-light"
                    } ${
                      currentMode === "light"
                        ? "color-neutral-black-950"
                        : "color-neutral-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
          )}
        </ul>
      </nav>
    </>
  );
}
