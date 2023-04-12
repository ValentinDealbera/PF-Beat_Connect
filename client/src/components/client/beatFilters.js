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
  const mobileHandler = () => {
    if (document.body.style.overflow === "hidden") {
      return (document.body.style.overflow = "auto");
    } else {
      return (document.body.style.overflow = "hidden");
    }
  };
  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0 });
  }
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
            scrollToTop()
            mobileHandler()
            setDropDownFilter(!dropDownFilter)
          }}
        >
          Filters
        </button>
        {dropDownFilter && (
          <BeatBottomSheet>
            <div className="gap-estilo5 padding-x-estilo2 flex flex-col">
                <div className="flex flex-row justify-between">
              <button
                onClick={() => {
                  setDropDownFilter(!dropDownFilter);
                  mobileHandler();
                }}
                
              >
                <Image height={15} width={15} src="/icon/arrow-down.svg"/>
              </button>
              <button
                onClick={() => {
                  setDropDownFilter(!dropDownFilter);
                  mobileHandler();
                }}
                className="text-lg absolute left-1/2 transform -translate-x-1/2 font-bold"
              >
                Aplly
              </button>
              <button
                onClick={() => {
                  setDropDownFilter(!dropDownFilter);
                  mobileHandler();
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
            scrollToTop()
            mobileHandler();
            setDropDownSorting(!dropDownSorting);
          }}
        >
          Sorty by
        </button>
        {dropDownSorting && (
          <BeatBottomSheet>
            <div className="gap-estilo3 padding-x-estilo2 flex flex-col">
            <div className="flex flex-row justify-between">
              <button
                onClick={() => {
                    setDropDownSorting(!dropDownSorting);
                  mobileHandler();
                }}
                
              >
                <Image height={15} width={15} src="/icon/arrow-down.svg"/>
              </button>
              <button
                onClick={() => {
                    setDropDownSorting(!dropDownSorting);
                  mobileHandler();
                }}
                className="absolute left-1/2 transform -translate-x-1/2 font-bold"
              >
                Sort By
              </button>
              <button
                onClick={() => {
                    setDropDownSorting(!dropDownSorting);
                  mobileHandler();
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
