import { Nav } from "@/components";

type ItemProps = {
  name: string;
  url: string;
  visible: boolean;
};

type PropsNav = {
  items: ItemProps[];
  title: string;
  mode: "light" | "dark";
};

export default function FooterNav({ items, title, mode }: PropsNav) {
  const titleStyles =
    mode === "light" ? "color-neutral-black-950" : "color-neutral-white";
  return (
    <>
      <div className="gap-estilo4 flex flex-col">
        <h3 className={`text-subtitulo-semibold ${titleStyles}`}>{title}</h3>
        <Nav
          items={items}
          currentMode={mode}
          withModal={false}
          center={false}
          horizontal={false}
        />
      </div>
    </>
  );
}
