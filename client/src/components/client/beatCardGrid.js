import {BeatCard} from "@/components"

export default function BeatCardGrid({ beats }) {
  return (
    <div className="grid grid-cols-1 gap-estilo1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
      {beats.map((beat) => (
        <BeatCard key={beat.id} beat={beat} />
      ))}
    </div>
  );
}