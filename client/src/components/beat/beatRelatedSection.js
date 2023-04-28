import { Section, NewBeatCardGrid, BeatCardFlex } from "@/components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBeatsDisplayMode } from "@/redux/slices/beats";

export default function BeatsRelatedSection(props) {
  const { activeItems } = useSelector((state) => state?.beats) || [];

  //Limit the number of items to 10

  const limit = 5;
  const limitedItems = activeItems.slice(0, limit);

  useEffect(() => {
    // dispatch(setBeatsDisplayMode("shop"));
  }, []);
  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <h1 className="text-titulo2-regular">
        {props.title}
        {props.children}{" "}
      </h1>
      <BeatCardFlex beats={limitedItems} />
    </Section>
  );
}
