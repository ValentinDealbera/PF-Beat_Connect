import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
  },
];

type IndexerItemProps = {
  item: any;
  index: number;
};

const IndexerItem = ({ item, index }: IndexerItemProps) => {
  const activeIndex = useAppSelector((state) => state.beats.generalActiveIndex);
  const [t] = useTranslation("global");
  const dispatch = useAppDispatch();
  const textStyles =
    index === activeIndex
      ? "text-base-semibold lg:text-base-semibold"
      : "text-base-light lg:text-base-light";

  return (
    <h5
      className={`cursor-pointer whitespace-nowrap ${textStyles}`}
      onClick={() => dispatch(setGeneralActiveIndex(index))}
    >
      {t(item.title)}
    </h5>
  );
};

export default function ClientBeatsIndexer() {
  return (
    <div className="gap-estilo2 flex flex-row overflow-scroll lg:overflow-hidden">
      {buyerGeneralNav.map((item, index) => (
        <IndexerItem item={item} index={index} />
      ))}
    </div>
  );
}
