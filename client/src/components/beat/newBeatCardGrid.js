import {
  BeatCard,
  BeatRightSheet,
  BeatDetailSideBar,
  BeatBottomSheet,
  BeatDeteailSideBar,
} from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectFilteredBeats } from "@/redux/selectors/filters";

export function externalManageDropdown() {
  NewBeatCardGrid.handleDropdownOpen();
}

export default function NewBeatCardGrid(props) {
  const [isDropDown, setIsDropdownOpen] = useState(false);
  const { beatsDisplayMode, generalActiveIndex } =
    useSelector((state) => state?.beats) || 0;
  const state = useSelector((state) => state?.beats) || [];
  const filteredBeats = useSelector(selectFilteredBeats);
  const { activeItems } = useSelector((state) => state?.beats) || [];

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropDown);
  };

  //<BeatCard key={beat.id} beat={beat} variant="public" />

  NewBeatCardGrid.handleDropdownOpen = handleDropdownOpen;
  useEffect(() => {
    console.log(beatsDisplayMode);
  }, [beatsDisplayMode]);

  return (
    <>
      {props.beats && props.beats <= 0 && (
        <div className="flex w-full items-end justify-center">
          <h1 className="mt-5 text-center text-2xl font-medium">
            Hey, parece que no hay nada por aqui 🤯
          </h1>
        </div>
      )}
      <div className="gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {props.beats && props.beats.length > 0 && (
          <>
            {props.beats?.map((beat) => (
              <>
                <BeatCard key={beat.id} beat={beat} variant="public" />
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
