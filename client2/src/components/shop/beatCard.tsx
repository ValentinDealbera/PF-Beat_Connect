import { useRef } from "react";
import { BeatImage, AuthorName, BeatTitle } from "@/components";

type BeatCardProps = {
  beat: any;
  variant: "public" | "private";
  mode?: "grid" | "flex";
};

export default function BeatCard({ beat, variant, mode }: BeatCardProps) {
  const ref = useRef(null);

  return (
    <div ref={ref} className="relative w-full ">
      <div className={mode === "grid" ? "w-full" : ``}>
        <div
          className={`gap-estilo3 flex flex-col ${
            variant === "public" ? "" : "border-radius-estilo1 px-2 pb-5 pt-2 "
          }`}
        >
          <BeatImage
            beat={beat}
            height={"auto"}
            width={"auto"}
            tapVisible={false}
          />
          <div className={`${variant === "public" ? "" : "px-2"}`}>
            <BeatTitle beat={beat} />
            <AuthorName beat={beat} />
          </div>
        </div>
      </div>
    </div>
  );
}
