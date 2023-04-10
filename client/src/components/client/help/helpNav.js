import Link from "next/link";
import { useRouter } from "next/router";

export default function HelpNav({ navItems }) {
  const router = useRouter();
  return (
    <>
      <nav className="hidden lg:flex">
        <ul className="gap-estilo2 flex flex-row">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.url}
                className={`${
                  item.url === router.pathname
                    ? "text-base-semibold"
                    : "text-base-light"
                } color-neutral-white`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
