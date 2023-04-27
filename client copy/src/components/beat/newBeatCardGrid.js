import {
  BeatCard,
  BeatRightSheet,
  BeatDetailSideBar,
  BeatBottomSheet,
  Loader,
} from "@/components";
import { useState } from "react";
import { useSelector } from "react-redux";

export function externalManageDropdown() {
  NewBeatCardGrid.handleDropdownOpen();
}

export default function NewBeatCardGrid(props) {
  const [isDropDown, setIsDropdownOpen] = useState(false);
  const { beatsDisplayMode, generalActiveIndex } =
    useSelector((state) => state?.beats) || 0;
  const isLoading = useSelector((state) => state.beats.loadingBeats);
  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropDown);
  };

  NewBeatCardGrid.handleDropdownOpen = handleDropdownOpen;

  return (
    <>
      {isLoading && <Loader />}
      {isLoading !== true && props.beats && props.beats <= 0 && (
        <div className="flex w-full items-end justify-center">
          <h1 className="mt-5 text-center text-2xl font-medium">
            Hey, parece que no hay nada por aqui 🤯
          </h1>
        </div>
      )}
      <div className="gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {isLoading !== true && props.beats && props.beats.length > 0 && (
          <>
            {props.beats?.map((beat) => (
              <>
                <BeatCard
                  key={beat.id}
                  beat={beat}
                  variant="public"
                  manageView={handleDropdownOpen}
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
