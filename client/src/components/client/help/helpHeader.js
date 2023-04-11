import HelpNav from "./helpNav";
import {navHelp} from "@/data/data"


export default function HelpHeader() {
  return (
    <div className="padding-estilo2 flex h-full w-full flex-col items-center justify-between align-middle md:flex-row">
      <h1 className="text-titulo1-semibold text-white">Help Center</h1>
      <HelpNav navItems={navHelp} />
    </div>
  );
}
