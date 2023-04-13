import {
  Main,
  Input,
  SimpleHeader,
  Head,
  Section,
} from "@/components";

export default function Login() {
  return (
    <>
      <Head title="Ingresar" />
      <SimpleHeader />
      <Main mode="transparent">
        <Section className="min-h-screen" subClassName="gap-estilo2 flex flex-col">
          <div className=" h-full flex flex-col gap-estilo2" style={{background: "url('/images/category1.jpg') no-repeat center", backgroundSize: "cover"}}>
            </div>
            </Section>
      </Main>
    </>
  );
}
