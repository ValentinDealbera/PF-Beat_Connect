import { Logo } from "@/components";
import Link from "next/link";
import { helpItems, generalItems, accountItems } from "@/data/navItems";

export default function Footer(props) {
  return (
    <>
      <footer
        className={`${
          props.mode === "light"
            ? "background-neutral-white xl:hidden"
            : "bg-gray-950"
        } flex flex-row items-center  justify-center align-middle`}
      >
        <div className="padding-x-estilo2 padding-y-estilo1 flex flex-col items-start justify-between gap-8 align-middle md:flex-row">
          <Logo mode={props.mode} />
          <div className="flex flex-col gap-8 md:flex-row lg:gap-12">
            <FooterNav items={generalItems} title="General" mode={props.mode} />
            <FooterNav items={helpItems} title="Ayuda" mode={props.mode} />
            <FooterNav items={accountItems} title="Cuenta" mode={props.mode} />
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterNav({ items, title, mode }) {
  return (
    <>
      <div className="gap-estilo4 flex flex-col">
        <h3
          className={`text-subtitulo-semibold ${
            mode === "light" ? "color-neutral-black-950" : "color-neutral-white"
          }`}
        >
          {title}
        </h3>
        <nav className="">
          <ul className="gap-estilo4 flex flex-col">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className={`${
                    mode === "light"
                      ? "color-neutral-black-950  text-base-light"
                      : "color-neutral-white text-base-light"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
