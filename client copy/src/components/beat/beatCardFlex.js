import {
  BeatCard,
  BeatBottomSheet,
  BeatRightSheet,
  BeatDetailSideBar,
} from "@/components";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function BeatCardFlex(props) {
  const [isDropDown, setIsDropdownOpen] = useState(false);
  const { beatsDisplayMode, generalActiveIndex } =
    useSelector((state) => state?.beats) || 0;
  const isLoading = useSelector((state) => state.beats.loadingBeats);
  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropDown);
  };

  BeatCardFlex.handleDropdownOpen = handleDropdownOpen;

  return (
    <>
      {props.beats && props.beats <= 0 && (
        <div className="flex w-full items-end justify-center">
          <h1 className="mt-5 text-center text-2xl font-medium">
            Hey, parece que no hay nada por aqui 🤯
          </h1>
        </div>
      )}
      <div className="gap-estilo1 flex overflow-y-scroll xl:overflow-y-hidden flex-1 flex-shrink flex-grow   ">
        {props.beats && props.beats.length > 0 && (
          <>
            {props.beats?.map((beat) => (
              <>
                <BeatCard
                  key={beat.id}
                  beat={beat}
                  variant="public"
                  manageView={handleDropdownOpen}
                  width="min-w-[75vw] md:min-w-[40vw] lg:min-w-[25vw] xl:min-w-[auto] basis-full"
                  mode="flex"
                />
              </>
            ))}
          </>
        )}
      </div>
      {isDropDown && (
        <>
          <div className="hidden sm:flex">
            <BeatRightSheet setIsDropdownOpen={setIsDropdownOpen}>
              <BeatDetailSideBar />
            </BeatRightSheet>
          </div>
          <div className="flex sm:hidden">
            <BeatBottomSheet setIsDropdownOpen={setIsDropdownOpen}>
              <BeatDetailSideBar />
            </BeatBottomSheet>
          </div>
        </>
      )}
    </>
  );
}
