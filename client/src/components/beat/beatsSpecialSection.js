import {
  Section,
  BeatCardFlex,
  BeatCardGrid,
  NewBeatCardGrid,
} from "@/components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBeatsDisplayMode, fetchBeats } from "@/redux/slices/beats";

export default function BeatsSpecialSection(props) {
  const featuredBeats = useSelector((state) => state?.beats.activeItems) || [];
  const dispatch = useDispatch();

  //Limit the number of items to 10

  // const limit = 10;
  // const limitedItems = activeItems.slice(0, limit);

  useEffect(() => {
    // dispatch(setBeatsDisplayMode("shop"));
  }, []);

  useEffect(() => {
    dispatch(fetchBeats({ relevance: "desc" }));
  }, []);

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <h1 className="text-titulo2-regular">
        {props.title}
        {props.children}{" "}
      </h1>

      <BeatCardFlex beats={featuredBeats} />
    </Section>
  );
}
