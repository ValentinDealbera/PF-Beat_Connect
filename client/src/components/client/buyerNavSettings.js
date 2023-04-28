import { setSettingsActiveIndex } from "@/redux/slices/profile";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const buyerGeneralNav = [
  {
    title: "buyerGeneralNav.profile",
  },
  {
    title: "buyerGeneralNav.password",
  },
];

export default function BuyerNavSettings() {
  const [t, i18n] = useTranslation("global");
  const activeIndex = useSelector((state) => state.profile.settingsActiveIndex);
  const dispatch = useDispatch();
  

  return (
    <>
      <div className="gap-estilo2 flex">
        {buyerGeneralNav.map((item, index) => (

            <h5
              className={`cursor-pointer ${
                index === activeIndex ? "text-base-semibold" : "text-base-light"
              }`}
              onClick={() => dispatch(setSettingsActiveIndex(index))}
            >
              {t(item.title)}
            </h5>
        ))}
      </div>
    </>
  );
}
