import { Main, HelpContainer, Head, FaqsGrid } from "@/components";

export default function HelpOverview() {
  return (
    <>
      <Head title={"Help Center"} description={"Head from about"} />
      <Main mode="transparent">
        <HelpContainer>
          <div className="gap-estilo1 flex flex-col ">
            <h1 className="text-titulo3-semibold">
              Frequent answered questions
            </h1>
            <FaqsGrid />
          </div>
        </HelpContainer>
      </Main>
    </>
  );
}
