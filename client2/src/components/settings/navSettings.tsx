import { setSettingsActiveIndex } from "@/redux/slices/profile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTranslation } from "react-i18next";

export default function NavSettings() {
  const dispatch = useAppDispatch();
  const [t] = useTranslation("global");
  const activeIndex = useAppSelector(
    (state) => state.profile.settingsActiveIndex
  );
  const loginMethod = useAppSelector(
    (state) => state.client.authSession.auth.loginMethod
  );

  const buyerGeneralNav = [
    {
      title: "buyerGeneralNav.profile",
      visible: true,
    },
    {
      title: "buyerGeneralNav.password",
      visible: loginMethod !== "google" ? true : false,
    },
  ];

  return (
    <>
      <div className="gap-estilo2 flex">
        {buyerGeneralNav.map((item, index) => (
          <>
            {item.visible && (
              <h5
                className={`cursor-pointer ${
                  index === activeIndex
                    ? "text-base-semibold"
                    : "text-base-light"
                }`}
                onClick={() => dispatch(setSettingsActiveIndex(index))}
              >
                {t(item.title)}
              </h5>
            )}
          </>
        ))}
      </div>
    </>
  );
}
