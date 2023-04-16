import { useDispatch, useSelector } from "react-redux";
import { setGeneralActiveIndex } from "@/redux/slices/beats";

const buyerGeneralNav = [
  {
    title: "Beats comprados",
  },
  {
    title: "Mis Beats",
  },
  {
    title: "Reviews",
  },
];

export default function BuyerNavGeneral() {
  const activeIndex = useSelector((state) => state.beats.generalActiveIndex);
  console.log("nav",activeIndex);
  const mode = useSelector((state) => state.beats.beatsDisplayMode);
  const dispatch = useDispatch();

  if (mode !== 2) {
    return <></>;
  }

  return (
    <>
      <div className="gap-estilo2 flex flex-row overflow-scroll">
        {buyerGeneralNav.map((item, index) => (
          <h5
            className={`cursor-pointer whitespace-nowrap ${
              index === activeIndex
                ? "text-base-semibold lg:text-base-semibold"
                : "text-base-light lg:text-base-light"
            }`}
            onClick={() => dispatch(setGeneralActiveIndex(index))}
          >
            {item.title}
          </h5>
        ))}
      </div>
    </>
  );
}
