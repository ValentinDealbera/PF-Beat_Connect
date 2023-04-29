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
import { useTranslation } from "react-i18next";

export default function BuyerProfile() {
  const [t, i18n] = useTranslation("global");
  const activeIndex = useSelector((state) => state.profile.settingsActiveIndex);

  return (
    <>
      <Head title="Perfil" />
      <Main mode="transparent">
        <SettingsHero title= {t("settingsClient.title")} />
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
