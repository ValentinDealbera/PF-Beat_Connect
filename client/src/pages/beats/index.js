import {
  Head,
  Main,
  Hero,
  Search,
  BeatsShopSection,
  Loader,
  BeatsSpecialSection,
  Section,
} from "@/components";
import { useDispatch, useSelector, getState } from "react-redux";
import { setSearchFilter } from "@/redux/slices/filters";
import { setCurrentPage } from "@/redux/slices/beats";
import { useTranslation } from "react-i18next";

export default function Beats() {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const { searchFilter } = useSelector((state) => state.filters);
  const { pages } = useSelector((state) => state.beats);

  // useEffect(() => {
  //   dispatch(setBeatsDisplayMode(0));
  // }, [dispatch]);

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
              {t("beats.t1")}{" "}
              <span className="text-titulo1-semibold text-white">
                {t("beats.t2")}
              </span>
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
        <BeatsSpecialSection title={t("beats.t3")}>
          <span className="text-titulo2-semibold">{t("beats.t4")}</span>
        </BeatsSpecialSection>
        <Section
          subClassName=" bg-neutral-100 color-white gap-2 flex "
          className="min-w-full bg-neutral-100"
        >
          <div className="flex min-w-full flex-col-reverse  2xl:container lg:flex-row 2xl:pr-24">
            <div className="padding-x-estilo2  py-16 lg:padding-y-estilo1 flex lg:h-full w-full flex-col justify-center gap-2 lg:w-1/2 ">
              <h1 className="text-titulo2-regular leading-4">
                {t("beats.t5")}
                <span className="text-titulo2-semibold text-red-700">
                  {" "}
                  {t("beats.t6")}{" "}
                </span>
              </h1>
              <p className="text-base-light">{t("beats.t7")}</p>
            </div>
            <div
              style={{
                backgroundImage:
                  "url(/images/glenn-van-de-wiel-ySfXlAqg8QQ-unsplash.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="aspect-square max-h-[400px] lg:max-h-none w-full lg:aspect-auto lg:h-full lg:w-1/2 "
            ></div>
          </div>
        </Section>
        <BeatsShopSection />
      </Main>
    </>
  );
}
