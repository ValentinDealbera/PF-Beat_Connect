import { Select } from "@/components";
import { genres } from "@/data/fakeDB";
import { useEffect, useState } from "react";

export default function BeatFilters() {
    const [beatGenre, setBeatGenre] = useState([])
    const [beatTypes, setBeatTypes] = useState([])
    const [prices, setPrices] = useState({min:0, max:0, filter: false})
    const [BPM, setBPM] = useState({min:0, max:0, filter: false})
    const [sort, setSort] = useState('')
    useEffect(()=>{
        console.log(beatGenre);
        console.log(beatTypes);
        console.log(prices);
        console.log(BPM);
        console.log(sort);
    },[BPM, prices, beatTypes, beatGenre,sort])
    const generos = genres.map(e=>{
        return {
            value: e.name,
            label: e.name
        }
    })
    const types = [{value: 'VOCAL', label: 'VOCAL'},{value: 'BEAT', label: 'BEAT'},{value: 'SONG', label: 'SONG'},]
    const sortArr = [{value: 'Price ↑', label: 'Price ↑'},{value: 'Price ↓', label: 'Price ↓'},{value: 'BPM ↑', label: 'BPM ↑'},{value: 'BPM ↓', label: 'BPM ↓'},{value: 'A - Z', label: 'A - Z'},{value: 'Z - A', label: 'Z - A'},]
  return (
    <div className="flex flex-row justify-between">
    <div className="flex flex-row gap-estilo3">
        <div>
    <Select type='multiSelect' label='Genre ⌄' valores={generos} setSeleccionados={setBeatGenre} seleccionados={beatGenre} />
    </div>
    <div>
    <Select type='multiSelect' label='Types ⌄' valores={types} setSeleccionados={setBeatTypes} seleccionados={beatTypes} />
    </div>
    <div>
    <Select type='prices' label='Price' setSeleccionados={setPrices} seleccionados={prices} />
    </div>
    <div>
    <Select type='prices' label='BPM' setSeleccionados={setBPM} seleccionados={BPM} />
    </div>
    </div>
    <div>
    <Select label='Sort By' valores={sortArr} setSeleccionados={setSort} seleccionados={sort} />
    </div>
    </div>
  )
}
