import { useDispatch, useSelector } from "react-redux";
import { setGeneralActiveIndex } from "@/redux/slices/beats";
import { useTranslation } from "react-i18next";

const buyerGeneralNav = [
  {
    title: "buyerGeneralNav.t1",
  },
  {
    title: "buyerGeneralNav.t2",
  },
  {
    title: "buyerGeneralNav.t3",
  },
  {
    title: "buyerGeneralNav.t4",
  }
];

export default function BuyerNavGeneral() {
  const activeIndex = useSelector((state) => state.beats.generalActiveIndex);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");


  return (
    <>
      <div className="gap-estilo2 flex flex-row overflow-scroll lg:overflow-hidden">
        {buyerGeneralNav.map((item, index) => (
          <h5
            className={`cursor-pointer whitespace-nowrap ${index === activeIndex
                ? "text-base-semibold lg:text-base-semibold"
                : "text-base-light lg:text-base-light"
              }`}
            onClick={() => dispatch(setGeneralActiveIndex(index))}
          >
            {t(item.title)}
          </h5>
        ))}
      </div>
    </>
  );
}
