import {
  Select,
  MultiSelect,
  ModalMinMax,
  BeatBottomSheetFilteringWithHeader,
  DynamicButtonsForBottomSheet,
  CheckboxGroup,
  MinMax,
} from "@/components";
import { genres, types, sortArr } from "@/data/fakeDB";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function BeatFilters() {
  const [beatGenre, setBeatGenre] = useState([]);
  const [beatTypes, setBeatTypes] = useState([]);
  const [prices, setPrices] = useState({ min: 0, max: 0, filter: false });
  const [BPM, setBPM] = useState({ min: 0, max: 0, filter: false });
  const [sort, setSort] = useState("");
  const [dropDownFilter, setDropDownFilter] = useState(false);
  const [dropDownSorting, setDropDownSorting] = useState(false);
  const [childFilterIndex, setChildFilterIndex] = useState(0);

  const generos = genres.map((e) => {
    return {
      value: e.name,
      label: e.name,
    };
  });

  useEffect(() => {
    console.log("beatGenre", beatGenre);
    console.log("beatTypes", beatTypes);
    console.log("prices", prices);
    console.log("BPM", BPM);
    console.log("sort", sort);
  }, [beatGenre, beatTypes, prices, BPM, sort]);

  const handleDropDownSorting = () => {
    setDropDownSorting(!dropDownSorting);
  };

  const handleDropDownFilter = () => {
    setDropDownFilter(!dropDownFilter);
  };

  const dynamicFilterBtns = [
    {
      label: "Generos",
      handleClick: () => setChildFilterIndex(1),
    },
    {
      label: "Tipos",
      handleClick: () => setChildFilterIndex(2),
    },
    {
      label: "Precio",
      handleClick: () => setChildFilterIndex(3),
    },
    {
      label: "BPM",
      handleClick: () => setChildFilterIndex(4),
    },
  ];

  return (
    <>
      <div className="hidden flex-row justify-between sm:flex ">
        <div className="gap-estilo3 flex ">
          <MultiSelect
            label="Generos"
            values={generos}
            seleccionados={beatGenre}
            setSeleccionados={setBeatGenre}
          />
          <MultiSelect
            label="Tipos"
            values={types}
            seleccionados={beatTypes}
            setSeleccionados={setBeatTypes}
          />
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
                setBeatTypes([]);
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

              {childFilterIndex === 2 && (
                <CheckboxGroup
                  label="Tipos"
                  values={types}
                  seleccionados={beatTypes}
                  setSeleccionados={setBeatTypes}
                />
              )}
              {childFilterIndex === 3 && (
                <MinMax
                  label="Precio"
                  seleccionados={prices}
                  setSeleccionados={setPrices}
                />
              )}
              {childFilterIndex === 4 && (
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
  );
}
