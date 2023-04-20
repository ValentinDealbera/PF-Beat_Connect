import {
  Head,
  Main,
  Section,
  Hero,
  Search,
  BeatsShopSection,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import {setSearchFilter, } from "@/redux/slices/filters";
import {setBeatsDisplayMode } from "@/redux/slices/beats";
import { useEffect } from "react";


export default function Beats() {
  const dispatch = useDispatch();
const {searchFilter} = useSelector((state) => state.filters);

useEffect (() => {
  dispatch(setBeatsDisplayMode(0));
}, [dispatch])

  return (
    <>
      <Head title={"Beats"} description={"Head from beats"} />
      <Main mode="transparent">
        <Hero
          image="/images/yannis-papanastasopoulos-yWF2LLan-_o-unsplash(1).jpg"
          className="background-primary-red-700 min-h-[350px] md:min-h-[45vh] align-middle items-center justify-center"
          //  style={{ minHeight: "15vh" }}
        >
          <div className="mt-6  padding-estilo2 gap-estilo3 flex h-full w-full flex-col items-start justify-between align-middle md:flex-row md:items-center">
            <h1 className="text-titulo1-regular text-white">Encuentra ese beat <span className="text-titulo1-semibold text-white">soñado.</span></h1>
            <Search
            value={searchFilter}
              colorMode="dark"
              sizeMode="long"
              className={"w-full md:w-max"}
              response={(e) => dispatch(setSearchFilter(e))}
            />
          </div>
        </Hero>
        <BeatsShopSection/>
      </Main>
    </>
  );
}
