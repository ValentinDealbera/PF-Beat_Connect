import {
  Main,
  Input,
  BuyerProfileLayout,
  Head,
  SettingsHero,
  EditClientForm,
  EditPasswordForm,
  Section,
  DynamicTable,
} from "@/components";
import { useSelector } from "react-redux";

export default function BuyerProfile() {
  const activeIndex = useSelector((state) => state.profile.settingsActiveIndex);

//obtenemos los beats


  return (
    <>
      <Head title="Facturación" />
      <Main mode="transparent">
      <SettingsHero title="Facturación" />
      <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-estilo2 flex flex-col">
        </Section>
      </Main>
    </>
  );
}
