import { Section, BeatCardGrid } from "@/components";
import { beats } from "@/data/fakeDB";

export default function BeatsSpecialSection(props) {
  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col" >
      <h1 className="text-titulo2-regular">{props.title}{props.children} </h1>
      <BeatCardGrid beats={beats} />
    </Section>
  );
}
