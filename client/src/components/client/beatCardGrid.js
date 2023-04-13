import {
  BeatCard,
  BeatRightSheet,
  BeatDetailSideBar,
  BeatBottomSheet,
} from "@/components";
import { useState } from "react";

export function externalManageDropdown() {
  BeatCardGrid.handleDropdownOpen();
}

export default function BeatCardGrid({ beats }) {
  const [isDropDown, setIsDropdownOpen] = useState(false);
  const placeholder = beats[2];

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropDown);
  };

  BeatCardGrid.handleDropdownOpen = handleDropdownOpen;

  return (
    <>
      <div className="gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {beats.map((beat) => (
          <BeatCard key={beat.id} beat={beat} variant="public" />
        ))}
      </div>
      {isDropDown && (
        <>
          <div className="hidden sm:flex">
            <BeatRightSheet setIsDropdownOpen={setIsDropdownOpen}>
              <BeatDetailSideBar beat={placeholder} />
            </BeatRightSheet>
          </div>
          <div className="flex sm:hidden">
            <BeatBottomSheet setIsDropdownOpen={setIsDropdownOpen}>
              <BeatDetailSideBar beat={placeholder} />
            </BeatBottomSheet>
          </div>
        </>
      )}
    </>
  );
}
