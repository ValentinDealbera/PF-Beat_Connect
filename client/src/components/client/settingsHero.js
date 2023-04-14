import {Hero} from "@/components";

export default function SettingsHero(props) {
    return(
        <Hero
        className="min-h-[35vh] lg:min-h-[30vh] bg-red-950 pb-8 items-end"
        subClassName="flex flex-col h-full w-full "
        //  style={{ minHeight: "15vh" }}
      >
        <div id="content" className="padding-x-estilo2  gap-estilo3 flex h-full w-full flex-col items-start  align-baseline ">
          <h1 className="text-titulo3-medium text-white">
            {props.title}
          </h1>
        </div>
      </Hero>
    )
}