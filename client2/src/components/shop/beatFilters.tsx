import {
  MultiSelect,
  ModalMinMax,
  BeatBottomSheetFilteringWithHeader,
  DynamicButtonsForBottomSheet,
  CheckboxGroup,
  MinMax,
} from "@/components";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter, usePathname } from "next/navigation";
import {
  setGenresFilter,
  fetchGenres,
  setPriceFilter,
  setBpmFilter,
  setSorter,
} from "@/redux/slices/filters";
import { fetchBeats } from "@/redux/slices/beats";
import { debounce } from "lodash";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/redux/hooks";

export default function BeatFilters() {
  const [t, i18n] = useTranslation("global");
  const dispatch = useAppDispatch();
  const [beatGenre, setBeatGenre] = useState([]);
  const [prices, setPrices] = useState({ min: 0, max: 0 });
  const [BPM, setBPM] = useState({ min: 0, max: 0 });
  const [sort, setSort] = useState("");
  const [dropDownFilter, setDropDownFilter] = useState(false);
  const [childFilterIndex, setChildFilterIndex] = useState(0);
  const currentPage = useAppSelector((state) => state.beats.pageIndex);
  const { genres, genresFilter: genre } = useAppSelector(
    (state) => state.filters,
  );

  const { sorter, sorterValues } = useAppSelector((state) => state?.filters);
  const pathname = usePathname();

  const [mode, setMode] = useState(0);

  useEffect(() => {
    if (pathname === "/beats") setMode(0);
    else if (pathname === "/beats/author/[slug]") setMode(0);
    else setMode(1);
  }, [pathname]);

  const sortArr = sorterValues;

  //Primer pedido

  //Sorter
  useEffect(() => {
    dispatch(setSorter(sort));
  }, [sort]);

  //Filtro Precio
  useEffect(() => {
    dispatch(setPriceFilter(prices));
  }, [prices, dispatch]);

  //Filtro BPM
  useEffect(() => {
    dispatch(setBpmFilter(BPM));
  }, [BPM.min, dispatch]);

  let sortValue = {} as any;

  if (sort === "default") {
    sortValue;
  } else if (sort === "Price-AS") {
    sortValue.priceAmount = "asc";
  } else if (sort === "Price-DES") {
    sortValue.priceAmount = "desc";
  } else if (sort === "BPM-AS") {
    sortValue.BPM = "asc";
  } else if (sort === "BPM-DES") {
    sortValue.BPM = "desc";
  } else if (sort === "A-Z") {
    sortValue.name = "asc";
  } else if (sort === "Z-A") {
    sortValue.name = "desc";
  }

  const delayedFetchGenres = useMemo(() => {
    return debounce(() => {
      dispatch(fetchGenres());
    }, 300); // ajusta el tiempo de espera según sea necesario
  }, [dispatch]);

  useEffect(() => {
    const cancelDebounce = () => {
      delayedFetchGenres.cancel();
    };

    delayedFetchGenres();

    return cancelDebounce;
  }, [delayedFetchGenres]);

  const filters = useMemo(
    () => [prices, BPM, sort, currentPage, genre],
    [prices, BPM, sort, currentPage, genre],
  );

  const delayedDispatch = debounce(() => {
    console.log("dispatching");
    dispatch(
      fetchBeats({
        minPrice: prices.min,
        maxPrice: prices.max,
        minBPM: BPM.min,
        maxBPM: BPM.max,
        page: currentPage,
        genre,
        ...sortValue,
      }),
    );
  }, 500); // ajusta el tiempo de espera según sea necesario

  useEffect(() => {
    delayedDispatch();
    return delayedDispatch.cancel; // cancelar el debounce cuando se desmonte el componente
  }, filters);

  // useEffect(() => {
  //   delayedDispatch();
  // }, [
  //   filterObj,
  //   dispatch,
  //   prices.min,
  //   prices.max,
  //   BPM.min,
  //   BPM.max,
  //   sort,
  //   currentPage.page,
  //   genre,
  // ]);

  // useEffect(() => {
  //   const maxPrice = beats.reduce((acc, beat) => {
  //     return beat.priceAmount > acc ? beat.priceAmount : acc;
  //   }, 0);
  //   setPrices({ min: 0, max: maxPrice });

  //   const maxBPM = beats.reduce((acc, beat) => {
  //     return beat.BPM > acc ? beat.BPM : acc;
  //   }, 0);

  //   setBPM({ min: 0, max: maxBPM });
  // }, [beats]);

  const generos = genres;

  useEffect(() => {}, [mode]);

  useEffect(() => {
    console.log(beatGenre);

    dispatch(setGenresFilter(beatGenre.map((e: any) => e.value)));
  }, [beatGenre]);

  const handleDropDownFilter = () => {
    setDropDownFilter(!dropDownFilter);
  };

  return (
    <>
      {mode === 0 && (
        <>
          <div className="z-10 hidden flex-row justify-between sm:flex">
            <div className="gap-estilo3 flex items-end">
              <MultiSelect
                label={t("beatShopSection.filterName1")}
                values={generos}
                seleccionados={beatGenre}
                setSeleccionados={setBeatGenre}
              />
              <ModalMinMax
                label={t("beatShopSection.filterName2")}
                seleccionados={prices}
                setSeleccionados={setPrices}
              />
              <ModalMinMax
                label="BPM"
                seleccionados={BPM}
                setSeleccionados={setBPM}
              />
            </div>
            <Select
              value={sorter}
              label={t("beatShopSection.sortBy")}
              valores={sortArr}
              setSeleccionados={setSort}
              labelClass="text-base-semibold"
            />
          </div>
          <div className="flex flex-row justify-start gap-2 sm:hidden">
            <div className="flex flex-row items-center gap-1">
              <Image src="/icon/filter.svg" width={20} height={20} alt="" />
              <button onClick={handleDropDownFilter}>
                {t("beatShopSection.filters")}
              </button>
            </div>
            {dropDownFilter && (
              <>
                <BeatBottomSheetFilteringWithHeader
                  setIsDropdownOpen={setDropDownFilter}
                  title={i18n.language === "en" ? "Filters" : "Filtros"}
                  handleBack={() => setChildFilterIndex(0)}
                  reset={() => {}}
                  isDropdownOpen={dropDownFilter}
                >
                  {childFilterIndex === 0 && (
                    <DynamicButtonsForBottomSheet
                      dynamicFilterBtns={[
                        {
                          label: i18n.language === "en" ? "Genres" : "Generos",
                          handleClick: () => setChildFilterIndex(1),
                        },
                        {
                          label: i18n.language === "en" ? "Price" : "Precio",
                          handleClick: () => setChildFilterIndex(2),
                        },
                        {
                          label: "BPM",
                          handleClick: () => setChildFilterIndex(3),
                        },
                      ]}
                    />
                  )}
                  {childFilterIndex === 1 && (
                    <CheckboxGroup
                      label={i18n.language === "en" ? "Genres" : "Generos"}
                      values={generos}
                      seleccionados={beatGenre}
                      setSeleccionados={setBeatGenre}
                    />
                  )}
                  {childFilterIndex === 2 && (
                    <MinMax
                      label={i18n.language === "en" ? "Price" : "Precio"}
                      seleccionados={prices}
                      setSeleccionados={setPrices}
                    />
                  )}
                  {childFilterIndex === 3 && (
                    <MinMax
                      label="BPM"
                      seleccionados={BPM}
                      setSeleccionados={setBPM}
                    />
                  )}
                </BeatBottomSheetFilteringWithHeader>
              </>
            )}
            <div>
              <div className="flex flex-row items-center gap-1">
                <Select
                  label=""
                  value={sorter}
                  valores={sortArr}
                  setSeleccionados={setSort}
                  labelClass="text-base-semibold"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

type SelectProps = {
  valores: { value: string; label: string }[];
  setSeleccionados: (value: string) => void;
  value: string;
  label: string;
  labelClass?: string;
};

function Select({
  valores,
  setSeleccionados,
  value,
  label,
  labelClass,
}: SelectProps) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select
        onChange={(e) => setSeleccionados(e.target.value)}
        value={value}
        className="rounded-xl border-slate-200 bg-white px-4 py-0 text-black placeholder:text-gray-400"
      >
        {valores?.map((valor) => (
          <option value={valor.value}>{valor.label}</option>
        ))}
      </select>
    </div>
  );
}
