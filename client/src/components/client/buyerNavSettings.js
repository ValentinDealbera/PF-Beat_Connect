import { setSettingsActiveIndex } from "@/redux/slices/profile";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";



export default function BuyerNavSettings() {
  const [t, i18n] = useTranslation("global");
  const loginMethod = useSelector((state) => state.client.authSession.auth.loginMethod);
  const activeIndex = useSelector((state) => state.profile.settingsActiveIndex);
  const dispatch = useDispatch();
  console.log("loginMethod", loginMethod);
  const buyerGeneralNav = [
    {
      title: "buyerGeneralNav.profile",
      visible: true
    },
    {
      title: "buyerGeneralNav.password",
      visible: loginMethod !== "google" ? true : false
    },
  ];

  return (
    <>
      <div className="gap-estilo2 flex">
        {buyerGeneralNav.map((item, index) => (
<>
{
  item.visible && (

            <h5
              className={`cursor-pointer ${
                index === activeIndex ? "text-base-semibold" : "text-base-light"
              }`}
              onClick={() => dispatch(setSettingsActiveIndex(index))}
            >
              {t(item.title)}
            </h5>
  )
}
            </>
        ))}
      </div>
    </>
  );
}
