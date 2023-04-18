import {
  MultiSelect,
  ModalMinMax,
  BeatBottomSheetFilteringWithHeader,
  DynamicButtonsForBottomSheet,
  CheckboxGroup,
  MinMax,
} from "@/components";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  setGenresFilter,
  setTypesFilter,
  fetchGenres,
  setPriceFilter,
  setBpmFilter,
  setSorter,
} from "@/redux/slices/filters";

export default function BeatFilters() {
  const dispatch = useDispatch();
  const [beatGenre, setBeatGenre] = useState([]);
  const [prices, setPrices] = useState({ min: 0, max: 0 });
  const [BPM, setBPM] = useState({ min: 0, max: 0 });
  const [sort, setSort] = useState("");
  const [dropDownFilter, setDropDownFilter] = useState(false);
  const [childFilterIndex, setChildFilterIndex] = useState(0);
  //const mode = useSelector((state) => state?.beats?.beatsDisplayMode);
  const beats = useSelector((state) => state.beats.activeItems);

  const genres = useSelector((state) => state.filters.genres);
  const { sorter, sorterValues } = useSelector((state) => state?.filters);

  const router = useRouter();

  const [mode, setMode] = useState(0);

  useEffect(() => {
    if (router.pathname === "/beats") setMode(0);
    else if (router.pathname === "/beats/author/[slug]") setMode(0);
    else setMode(1);
  }, [router.pathname]);

  const sortArr = sorterValues;

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  useEffect(() => {
    dispatch(setSorter(sort));
  }, [sort]);

  useEffect(() => {
    const maxPrice = beats.reduce((acc, beat) => {
      return beat.priceAmount > acc ? beat.priceAmount : acc;
    }, 0);
    setPrices({ min: 0, max: maxPrice });

    const maxBPM = beats.reduce((acc, beat) => {
      return beat.BPM > acc ? beat.BPM : acc;
    }, 0);

    setBPM({ min: 0, max: maxBPM });
  }, [beats]);

  useEffect(() => {
    dispatch(setPriceFilter(prices));
  }, [prices, dispatch]);

  useEffect(() => {
    dispatch(setBpmFilter(BPM));
  }, [BPM, dispatch]);

  const generos = genres;

  useEffect(() => {}, [mode]);

  useEffect(() => {
    dispatch(setGenresFilter(beatGenre.map((e) => e.value)));
  }, [beatGenre]);

  const handleDropDownFilter = () => {
    setDropDownFilter(!dropDownFilter);
  };

  const dynamicFilterBtns = [
    {
      label: "Generos",
      handleClick: () => setChildFilterIndex(1),
    },
    // {
    //   label: "Tipos",
    //   handleClick: () => setChildFilterIndex(2),
    // },
    {
      label: "Precio",
      handleClick: () => setChildFilterIndex(2),
    },
    {
      label: "BPM",
      handleClick: () => setChildFilterIndex(3),
    },
  ];

  return (
    <>
      {mode === 0 && (
        <>
          <div className="z-10 hidden flex-row justify-between sm:flex">
            <div className="gap-estilo3 flex items-end">
              <MultiSelect
                label="Generos"
                values={generos}
                seleccionados={beatGenre}
                setSeleccionados={setBeatGenre}
              />
              {/* <MultiSelect
            label="Tipos"
            values={types}
            seleccionados={beatTypes}
            setSeleccionados={setBeatTypes}
          /> */}
              <ModalMinMax
                label="Precio"
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
              label="Sort By:"
              valores={sortArr}
              setSeleccionados={setSort}
              labelClass="text-base-semibold"
            />
          </div>
          <div className="flex flex-row justify-start gap-2 sm:hidden">
            <div className="flex flex-row items-center gap-1">
              <Image src="/icon/filter.svg" width={20} height={20} />
              <button onClick={handleDropDownFilter}>Filters</button>
            </div>
            {dropDownFilter && (
              <>
                <BeatBottomSheetFilteringWithHeader
                  setIsDropdownOpen={setDropDownFilter}
                  title="Filters"
                  handleBack={() => setChildFilterIndex(0)}
                  reset={() => {
                    setBeatGenre([]);
                    setPrices({ min: 0, max: 0, filter: false });
                    setBPM({ min: 0, max: 0, filter: false });
                  }}
                  isDropdownOpen={dropDownFilter}
                >
                  {childFilterIndex === 0 && (
                    <DynamicButtonsForBottomSheet
                      dynamicFilterBtns={dynamicFilterBtns}
                    />
                  )}
                  {childFilterIndex === 1 && (
                    <CheckboxGroup
                      label="Generos"
                      values={generos}
                      seleccionados={beatGenre}
                      setSeleccionados={setBeatGenre}
                    />
                  )}
                  {/* {childFilterIndex === 2 && (
                <CheckboxGroup
                  label="Tipos"
                  values={types}
                  seleccionados={beatTypes}
                  setSeleccionados={setBeatTypes}
                />
              )} */}
                  {childFilterIndex === 2 && (
                    <MinMax
                      label="Precio"
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

function Select({ valores, setSeleccionados, value, label, labelClass }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select
        onChange={(e) => setSeleccionados(e.target.value)}
        value={value}
        className="rounded-xl border-slate-200 bg-white px-4 py-0 text-black placeholder:text-gray-400"
      >
        {valores.map((valor) => (
          <option value={valor.value}>{valor.label}</option>
        ))}
      </select>
    </div>
  );
}
