import { Section, BeatCardGrid } from "@/components";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBeatsDisplayMode } from "@/redux/slices/beats";

export default function BeatsSpecialSection(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBeatsDisplayMode("shop"));
  }, []);
  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <h1 className="text-titulo2-regular">
        {props.title}
        {props.children}{" "}
      </h1>
      <BeatCardGrid />
    </Section>
  );
}
