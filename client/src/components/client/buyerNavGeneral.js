import { useDispatch, useSelector } from "react-redux";
import { setActiveIndex } from "@/redux/slices/profile";

const buyerGeneralNav = [
  {
    title: "Mis beats",
    index: 0,
  },
  {
    title: "Favoritos",
    index: 1,
  },
  {
    title: "Reviews",
    index: 2,
  },
];

export default function BuyerNavGeneral() {
  const activeIndex = useSelector((state) => state.profile.activeIndex);
  const dispatch = useDispatch();

  return (
    <>
      <div className="gap-estilo2 flex flex-row overflow-scroll">
        {buyerGeneralNav.map((item, index) => (
          <h5
            className={`cursor-pointer ${
              index === activeIndex
                ? "text-base-semibold"
                : "text-base-medium"
            }`}
            onClick={() => dispatch(setActiveIndex(index))}
          >
            {item.title}
          </h5>
        ))}
      </div>
    </>
  );
}
