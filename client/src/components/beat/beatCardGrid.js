import {
  BeatCard,
  BeatRightSheet,
  BeatDetailSideBar,
  BeatBottomSheet,
} from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectFilteredBeats } from "@/redux/selectors/filters";

export function externalManageDropdown() {
  BeatCardGrid.handleDropdownOpen();
}

export default function BeatCardGrid() {
  const [isDropDown, setIsDropdownOpen] = useState(false);
  const currentMode = useSelector((state) => state?.beats?.beatsDisplayMode) || [];
  const beats = useSelector(selectFilteredBeats) 
  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropDown);
  };

  BeatCardGrid.handleDropdownOpen = handleDropdownOpen;
useEffect(() => {
  console.log("beats", currentMode);
}, [currentMode]);

  return (
    <>
      {beats && beats.length <= 0 && (
        <div className="flex w-full items-end justify-center">
          <h1 className="mt-5 text-center text-2xl font-medium">
            Hey, parece que no hay nada por aqui 🤯
          </h1>
        </div>
      )}
      <div className="gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {beats && beats.length > 0 && (
          <>
            {beats?.map((beat) => (
              <BeatCard key={beat.id} beat={beat} variant="public" />
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
