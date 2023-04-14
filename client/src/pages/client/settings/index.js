import {
  Main,
  Input,
  BuyerProfileLayout,
  Head,
  SettingsHero,
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
          {activeIndex === 0 && <></>}
          {activeIndex === 1 && <></>}
        </BuyerProfileLayout>
      </Main>
    </>
  );
}
