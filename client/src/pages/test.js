import { Main, Head, BeatFilters, Switch, Input } from "@/components";

import { beats } from "../data/fakeDB";

export default function Test() {
  const props = beats[0];
  
  return (
    <>
      <Head title={"Test"} description={"Head from test"} />
      <Main>
        <BeatFilters/>
      </Main>
      <br />
      <Switch name={props.name} label={props.label} state={props.state} />
      <br />
    </>
  );
}
