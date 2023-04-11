import { Section, Main, Input, BuyerNavSettings, BuyerProfileLayout, Head } from "@/components";

export default function BuyerProfile() {
  return (
    <>
    <Head title="Perfil" />
      <Main>
        <BuyerProfileLayout>
            <Input placeholder="hola" label="Nombre" />
            <Input placeholder="hola" label="Estado" />
        </BuyerProfileLayout>
      </Main>
    </>
  );
}
