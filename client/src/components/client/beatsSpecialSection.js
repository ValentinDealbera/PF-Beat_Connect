import Section from "../layout/section";

export default function BeatsSpecialSection(props) {
  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2">
      <h1 className="text-titulo2-semibold">{props.title}</h1>
    </Section>
  );
}
