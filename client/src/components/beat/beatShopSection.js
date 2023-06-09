import { Section, BeatFilters, NewBeatCardGrid } from "@/components";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "@/redux/slices/beats";
import { useTranslation } from "react-i18next";

export default function BeatShopSection() {
  const [t] = useTranslation("global");
  const { pages } = useSelector((state) => state.beats);
  const filteredBeats = useSelector((state) => state.beats.publicItems);
  const dispatch = useDispatch();

  let visiblePages = [];
  for (let i = pages.current - 2; i <= pages.current + 2; i++) {
    if (i > 0 && i <= pages.limit) {
      visiblePages.push(i);
    }
  }

  const isLoading = useSelector((state) => state.beats.isLoading);

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BeatFilters />
      <NewBeatCardGrid
        beats={filteredBeats}
        mode="beats"
        isLoading={isLoading}
      />
      {(<div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => dispatch(setCurrentPage({ page: pages.current - 1 }))}
          disabled={pages.current === 1}
          className={pages.current === 1 ? "text-black" : " text-red-800"}
        >
          {t("beatShopSection.t1")}
        </button>
        <div className="flex justify-center gap-4">
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => dispatch(setCurrentPage({ page: page }))}
              disabled={pages.current === page}
              className={`${
                pages.current === page
                  ? "border-red-800 bg-red-800 text-white"
                  : "text-black"
              } flex aspect-square items-center justify-center rounded-md border p-2`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            dispatch(setCurrentPage({ page: pages.current + 1 }));
          }}
          disabled={pages.current === visiblePages[visiblePages.length - 1]}
          className={
            pages.current === visiblePages[visiblePages.length - 1]
              ? " text-black"
              : "text-red-800"
          }
        >
          {t("beatShopSection.t2")}
        </button>
      </div>)}
    </Section>
  );
}
