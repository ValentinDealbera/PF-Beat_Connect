import {
  Section,
  BeatCardFlex,
  BeatCardGrid,
  NewBeatCardGrid,
} from "@/components";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBeatsDisplayMode, fetchBeats, fetchFeaturedBeats } from "@/redux/slices/beats";
import { debounce } from "lodash";
export default function BeatsSpecialSection(props) {
  const featuredBeats = useSelector((state) => state?.beats.featuredItems) || [];
  const dispatch = useDispatch();

  //Limit the number of items to 10

  // const limit = 10;
  // const limitedItems = activeItems.slice(0, limit);

  useEffect(() => {
    // dispatch(setBeatsDisplayMode("shop"));
  }, []);


  const delayedFeaturedBeats = useMemo(() => {
    return debounce(() => {
      dispatch(fetchFeaturedBeats());
    }, 500); // ajusta el tiempo de espera según sea necesario
  }, [dispatch]);

  useEffect(() => {
    const cancelDebounce = () => {
      delayedFeaturedBeats.cancel();
    };

    delayedFeaturedBeats();

    return cancelDebounce;
  }, [delayedFeaturedBeats]);


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
