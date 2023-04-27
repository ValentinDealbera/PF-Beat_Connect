import { Hero } from "@/components";

export default function SettingsHero(props) {
  return (
    <Hero
      className="min-h-[35vh] items-end bg-red-950 pb-8 lg:min-h-[30vh] justify-center "
      subClassName="flex flex-col h-full w-full justify-center items-center "
    >
      <div
        id="content"
        className="padding-x-estilo2  gap-estilo3 flex h-full w-full flex-col items-start  align-baseline "
      >
        <h1 className="text-titulo3-medium text-white">{props.title}</h1>
      </div>
    </Hero>
  );
}
