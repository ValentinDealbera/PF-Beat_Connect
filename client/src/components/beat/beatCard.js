import Image from "next/image";
import Link from "next/link";
import { externalManageDropdown } from "./beatCardGrid";
import { useSelector, useDispatch } from "react-redux";
import { setActiveItemDetail } from "@/redux/slices/beats";

export default function BeatCard({ beat, variant }) {
  const dispatch = useDispatch();

const handleAction = () => {
  dispatch(setActiveItemDetail(beat));
  externalManageDropdown();
};

  return (
    <>
      <div onClick={handleAction}>
        <div
          className={`background-neutral-white gap-estilo3 flex flex-col ${
            variant === "public" ? "" : "border-radius-estilo1 px-2 pb-5 pt-2 "
          }`}
        >
          <div>
            <Image
              className="border-radius-estilo2 color-primary-red-700 aspect-square object-cover"
              src={beat.image}
              alt={beat.name}
            />
          </div>
          <div className={`${variant === "public" ? "" : "px-2"}`}>
            <span className="color-primary-red-700 font-semibold">{`$${beat.price}`}</span>
            <span className="font-light">{` | ${beat.BPM}BPM`}</span>
            <h1 className="font-bold text-subtitulo-semibold md:text-base-semibold">{`${beat.name}`}</h1>
            <div className="flex flex-row items-center gap-1">
              <Link
                href={`/beats/author/${beat.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="font-light">{`${beat.author?.name}`}</span>
              </Link>
              <Image
                className="inline"
                width={14}
                height={14}
                src={"/icon/checked-blue.svg"}
                alt="checked"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
