import {
  Main,
  Head,
  BeatRightSheet,
  Switch,
  FormAdmin,
  ModalOnHover,
  DynamicTable,
  BeatDetailSideBar,
  BeatBottomSheet,
  ReviewForm,
} from "@/components";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

export default function Test(props) {
  const [isDropDown, setIsDropdownOpen] = useState(false);
  const [beatId, setBeatId] = useState("");

  const tableHeaders = ["Item", "audiomp3", "price", "creator", "review"];
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.client.authSession.current?._id);
  const comprados = useSelector((state) => state.client.beats?.bougthBeats);

  useEffect(() => {}, []);

  // verificamos si tienen los beats reseña y agregamos un campo true o false, usamos map
  const beatData = comprados.map((item) => {
    const hasReview = reviewedItems.find(
      (review) => review.beat._id === item._id
    );
    return {
      ...item,
      hasReview: hasReview ? true : false,
    };
  });

  const saveBeatId = (id) => {
    setBeatId(id);
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropDown);
  };

  const rows = beatData.map((item) => {
    return {
      id: item.id,
      item: (
        <div className="flex items-center gap-4">
          <Image
            src={item.image}
            width={50}
            height={50}
            className="aspect-square rounded-full object-cover"
          />
          <h3 className="text-base-medium">{item.name}</h3>
        </div>
      ),
      audiomp3: (
        <div className="w-max-[30px] flex items-center">
          <audio controls className="w-full">
            <source src={item.audioMP3} type="audio/mpeg" />
          </audio>
        </div>
      ),
      price: item.priceAmount,
      creator: `${item.userCreator}`,
      review: (
        <>
          {item.hasReview ? (
            <div className="flex items-center gap-2">
              <button
                className="text-base-medium"
                onClick={() => console.log("test btn")}
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="text-base-medium"
                onClick={() => (handleDropdownOpen(), saveBeatId(item._id))}
              >
                dejar review
              </button>
            </div>
          )}
        </>
      ),
    };
  });

  return (
    <Main>
      <DynamicTable headers={tableHeaders} rows={rows} />
      {isDropDown && (
        <>
          <div className="hidden sm:flex">
            <BeatRightSheet
              width="w-[40vw]"
              setIsDropdownOpen={setIsDropdownOpen}
            >
              <ReviewForm beatId={beatId} />
            </BeatRightSheet>
          </div>
          <div className="flex sm:hidden">
            <BeatBottomSheet setIsDropdownOpen={setIsDropdownOpen}>
              hey soy el sidebar
            </BeatBottomSheet>
          </div>
        </>
      )}
    </Main>
  );
}
