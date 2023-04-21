import {
  Head,
  Main,
  Section,
  Hero,
  Search,
  BeatsShopSection,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "@/redux/slices/filters";
import { setBeatsDisplayMode, fetchBeats } from "@/redux/slices/beats";
import { useEffect } from "react";

export default function Beats() {
  const dispatch = useDispatch();
  const { searchFilter } = useSelector((state) => state.filters);
  const { pages } = useSelector((state) => state.beats);

  useEffect(() => {
    dispatch(setBeatsDisplayMode(0));
  }, [dispatch]);

  //visibles solo 5 paginas, teninedo en cuenta la pagina actual y la ultima pagina. usamos push
  let visiblePages = [];
  for (let i = pages.current - 2; i <= pages.current + 2; i++) {
    if (i > 0 && i <= pages.limit) {

      visiblePages.push(i);
    }
  }

  return (
    <>
      <Head title={"Beats"} description={"Head from beats"} />
      <Main mode="transparent">
        <Hero
          image="/images/yannis-papanastasopoulos-yWF2LLan-_o-unsplash(1).jpg"
          className="background-primary-red-700 min-h-[350px] items-center justify-center align-middle md:min-h-[45vh]"
          //  style={{ minHeight: "15vh" }}
        >
          <div className="padding-estilo2  gap-estilo3 mt-6 flex h-full w-full flex-col items-start justify-between align-middle md:flex-row md:items-center">
            <h1 className="text-titulo1-regular text-white">
              Encuentra ese beat{" "}
              <span className="text-titulo1-semibold text-white">soñado.</span>
            </h1>
            <Search
              value={searchFilter}
              colorMode="dark"
              sizeMode="long"
              className={"w-full md:w-max"}
              response={(e) => dispatch(setSearchFilter(e))}
            />
          </div>
        </Hero>
        <BeatsShopSection />
        <button
          onClick={() => {dispatch(fetchBeats({page: pages.current + 1}))
       }}
          disabled={pages.current === visiblePages[visiblePages.length -1]}
          className={pages.current === visiblePages[visiblePages.length -1] ? "text-red-800" : "text-black"}
        >
          Next
        </button>
        <div className="flex justify-center gap-4">
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => dispatch(fetchBeats({page: page}))}
              disabled={pages.current === page}
              className={pages.current === page ? "text-red-800" : "text-black"}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => dispatch(fetchBeats({page: pages.current - 1}))}
          disabled={pages.current === 1}
          className={pages.current === 1 ? "text-red-800" : "text-black"}
        >
          Prev
        </button>
      </Main>
    </>
  );
}
