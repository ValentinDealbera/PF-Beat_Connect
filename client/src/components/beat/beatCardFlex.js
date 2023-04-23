import {BeatCard} from "@/components"

export default function BeatCardFlex(props) {
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
        </>
    )
}