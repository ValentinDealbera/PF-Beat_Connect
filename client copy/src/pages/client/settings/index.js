import {
  Main,
  Input,
  BuyerProfileLayout,
  Head,
  SettingsHero,
  EditClientForm,
  EditPasswordForm,
} from "@/components";
import { useSelector } from "react-redux";

export default function BuyerProfile() {
  const activeIndex = useSelector((state) => state.profile.settingsActiveIndex);

  return (
    <>
      <Head title="Perfil" />
      <Main mode="transparent">
        <SettingsHero title="Configura tu cuenta" />
        <BuyerProfileLayout>
          {activeIndex === 0 && <>
          <EditClientForm
          mode="edit"
          /></>}
          {activeIndex === 1 && <>
          <EditPasswordForm mode="edit" />
          </>}
        </BuyerProfileLayout>
      </Main>
    </>
  );
}
