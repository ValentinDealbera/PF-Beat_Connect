import { Main, Head, BeatFilters } from "@/components";

export default function Test() {
  return (
    <>
      <Head title={"Test"} description={"Head from test"} />
      <Main>
        <BeatFilters/>
      </Main>
    </>
  );
}
