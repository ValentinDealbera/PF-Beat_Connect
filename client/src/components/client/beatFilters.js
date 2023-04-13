import { BeatBottomSheet, Select } from "@/components";
import { genres } from "@/data/fakeDB";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BeatFilters() {
  const [beatGenre, setBeatGenre] = useState([]);
  const [beatTypes, setBeatTypes] = useState([]);
  const [prices, setPrices] = useState({ min: 0, max: 0, filter: false });
  const [BPM, setBPM] = useState({ min: 0, max: 0, filter: false });
  const [sort, setSort] = useState("");
  const [dropDownFilter, setDropDownFilter] = useState(false);
  const [dropDownSorting, setDropDownSorting] = useState(false);
  useEffect(() => {
    console.log(beatGenre);
    console.log(beatTypes);
    console.log(prices);
    console.log(BPM);
    console.log(sort);
  }, [BPM, prices, beatTypes, beatGenre, sort]);
  const generos = genres.map((e) => {
    return {
      value: e.name,
      label: e.name,
    };
  });
  const types = [
    { value: "VOCAL", label: "VOCAL" },
    { value: "BEAT", label: "BEAT" },
    { value: "SONG", label: "SONG" },
  ];
  const sortArr = [
    { value: "Price ↑", label: "Price ↑" },
    { value: "Price ↓", label: "Price ↓" },
    { value: "BPM ↑", label: "BPM ↑" },
    { value: "BPM ↓", label: "BPM ↓" },
    { value: "A - Z", label: "A - Z" },
    { value: "Z - A", label: "Z - A" },
  ];
  return (
    <>
      <div className="hidden flex-row justify-between sm:flex ">
        <div className="gap-estilo3 flex flex-row">
          <div>
            <Select
              type="multiSelect"
              label="Genre"
              valores={generos}
              setSeleccionados={setBeatGenre}
              seleccionados={beatGenre}
            />
          </div>
          <div>
            <Select
              type="multiSelect"
              label="Types"
              valores={types}
              setSeleccionados={setBeatTypes}
              seleccionados={beatTypes}
            />
          </div>
          <div>
            <Select
              type="prices"
              label="Price"
              setSeleccionados={setPrices}
              seleccionados={prices}
            />
          </div>
          <div>
            <Select
              type="prices"
              label="BPM"
              setSeleccionados={setBPM}
              seleccionados={BPM}
            />
          </div>
        </div>
        <div>
          <Select
            label="Sort By"
            valores={sortArr}
            setSeleccionados={setSort}
            seleccionados={sort}
          />
        </div>
      </div>
      <div className="flex flex-row justify-start gap-4 sm:hidden">
        <button
          onClick={() => {
            setDropDownFilter(!dropDownFilter)
          }}
        >
          Filters
        </button>
        {dropDownFilter && (
          <BeatBottomSheet setIsDropdownOpen={setDropDownFilter}>
            <div className="gap-estilo5 padding-x-estilo2 flex flex-col">
                <div className="flex flex-row justify-between">
              <button
                onClick={() => {
                  setDropDownFilter(!dropDownFilter);
                }}
                
              >
                <Image height={15} width={15} src="/icon/arrow-down.svg"/>
              </button>
              <button
                onClick={() => {
                  setDropDownFilter(!dropDownFilter);
                }}
                className="text-lg absolute left-1/2 transform -translate-x-1/2 font-bold"
              >
                Aplly
              </button>
              <button
                onClick={() => {
                  setDropDownFilter(!dropDownFilter);
                }}
              >
                Reset
              </button>
              </div>
              <div className="flex flex-col gap-estilo3">
              <div>
                <Select
                  viewPort="mobile"
                  type="multiSelect"
                  label="Genre"
                  valores={generos}
                  setSeleccionados={setBeatGenre}
                  seleccionados={beatGenre}
                />
              </div>
                <hr/>
              <div>
                <Select
                  viewPort="mobile"
                  type="multiSelect"
                  label="Types"
                  valores={types}
                  setSeleccionados={setBeatTypes}
                  seleccionados={beatTypes}
                />
              </div>
              <hr/>
              <div>
                <Select
                  viewPort="mobile"
                  type="prices"
                  label="Price"
                  setSeleccionados={setPrices}
                  seleccionados={prices}
                />
              </div>
                <hr/>
              <div>
                <Select
                  viewPort="mobile"
                  type="prices"
                  label="BPM"
                  setSeleccionados={setBPM}
                  seleccionados={BPM}
                />
              </div>
            </div>
            </div>
          </BeatBottomSheet>
        )}
        <button
          onClick={() => {
            setDropDownSorting(!dropDownSorting);
          }}
        >
          Sorty by
        </button>
        {dropDownSorting && (
          <BeatBottomSheet setIsDropdownOpen={setDropDownSorting}>
            <div className="gap-estilo3 padding-x-estilo2 flex flex-col">
            <div className="flex flex-row justify-between">
              <button
                onClick={() => {
                    setDropDownSorting(!dropDownSorting);
                }}
                
              >
                <Image height={15} width={15} src="/icon/arrow-down.svg"/>
              </button>
              <button
                onClick={() => {
                    setDropDownSorting(!dropDownSorting);
                }}
                className="absolute left-1/2 transform -translate-x-1/2 font-bold"
              >
                Sort By
              </button>
              <button
                onClick={() => {
                    setDropDownSorting(!dropDownSorting);
                }}
              >
                Reset
              </button>
              </div>
              <div>
                <Select
                  click={true}
                  viewPort="mobile"
                  label="Sort By"
                  valores={sortArr}
                  setSeleccionados={setSort}
                  seleccionados={sort}
                />
              </div>
            </div>
          </BeatBottomSheet>
        )}
      </div>
    </>
  );
}
