import { Main, HelpContainer, Head, FaqsGrid } from "@/components";

export default function HelpOverview() {
  return (
    <>
      <Head title={"Help Center"} description={"Head from about"} />
      <Main mode="transparent">
        <HelpContainer title="Help Center" paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt vulputate erat ut facilisis. In ultrices, metus non pellentesque tincidunt, elit sapien maximus ipsum, at vestibulum purus libero sit amet lacus.">
          <div className="gap-estilo1 flex flex-col ">
            <h1  className="text-titulo3-semibold text-red-700 ">
              Frequent answered questions
            </h1>
            <FaqsGrid />
          </div>
        </HelpContainer>
      </Main>
    </>
  );
}
