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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
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
  const dispatch = useDispatch();
  const [beatGenre, setBeatGenre] = useState([]);
  const [prices, setPrices] = useState({ min: 0, max: 0 });
  const [BPM, setBPM] = useState({ min: 0, max: 0 });
  const [sort, setSort] = useState("");
  const [dropDownFilter, setDropDownFilter] = useState(false);
  const [childFilterIndex, setChildFilterIndex] = useState(0);
  const currentPage = useAppSelector((state) => state.beats.pageIndex);
  const { genres, genresFilter: genre } = useAppSelector(
    (state) => state.filters
  );

  const { sorter, sorterValues } = useAppSelector((state) => state?.filters);

  const [mode, setMode] = useState(0);

  const sortArr = sorterValues;
  const generos = genres;

  useEffect(() => {}, [mode]);

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
                      dynamicFilterBtns={["Genres", "Price", "BPM"]}
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
