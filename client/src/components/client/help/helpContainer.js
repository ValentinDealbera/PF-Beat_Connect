import { Section, Hero, HelpHeader } from "@/components";

export default function HelpContainer({children}) {
    return (
      <>
        <Hero
          style={{ minHeight: "45vh" }}
          image="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        >
          <HelpHeader />
        </Hero>
        <Section className="" subClassName="padding-estilo1">
          {children}
        </Section>
      </>
    );
  }