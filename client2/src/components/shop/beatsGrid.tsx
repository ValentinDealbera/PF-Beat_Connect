import { BeatCard } from "@/components";

type BeatsGridProps = {
  beats: any;
};

export default function NewBeatCardGrid({ beats }: BeatsGridProps) {
  const gridStyles =
    "gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5";
  return (
    <>
      <div className={gridStyles}>
        {Array.isArray(beats) &&
          beats?.map((beat: any) => (
            <BeatCard key={beat.id} beat={beat} variant="public" />
          ))}
      </div>
    </>
  );
}
