import { Section, BeatCardGrid } from "@/components";


const beatsArray = [{
    id: 1,
    name: 'BZR Session 55',
    BPM: 120,
    price: 29.99,
    license: '',
},{
    id: 2,
    name: 'Crazy thing',
    BPM: 100,
    price: 19.99,
    license: '',
},{
    id: 3,
    name: 'Explosion',
    BPM: 210,
    price: 29.99,
    license: '',
},{
    id: 4,
    name: 'Motivation',
    BPM: 150,
    price: 39.99,
    license: '',
},{
    id: 5,
    name: 'Get Beatsy',
    BPM: 140,
    price: 15.99,
    license: '',
},{
    id: 6,
    name: 'BZR Session 56',
    BPM: 189,
    price: 29.99,
    license: '',
},{
    id: 7,
    name: 'Having fun',
    BPM: 120,
    price: 30.00,
    license: '',
}]



export default function BeatsSpecialSection(props) {
  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-estilo5 flex flex-col">
      <h1 className="text-titulo2-semibold">{props.title}</h1>
      <BeatCardGrid beats={beatsArray} />
    </Section>
  );
}
