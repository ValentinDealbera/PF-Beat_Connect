import { setSettingsActiveIndex } from "@/redux/slices/profile";
import { useDispatch, useSelector } from "react-redux";

const buyerGeneralNav = [
  {
    title: "Perfil",
  },
  {
    title: "Contraseña",
  },
];

export default function BuyerNavSettings() {
  
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
              {item.title}
            </h5>
        ))}
      </div>
    </>
  );
}
