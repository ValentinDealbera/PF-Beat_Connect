import { Input } from "@/components";

export default function MinMax({ seleccionados, setSeleccionados, label }) {


  return (
    <div className="flex flex-col gap-2">
        <label className={`${label === null ? "hidden" : ""} text-base-semibold`}>{label}</label>
      <label htmlFor="min">
        Min
        <Input
          type="number"
          id="min"
          name="min"
          max={seleccionados.max}
          value={seleccionados.min}
          onChange={(e) =>
            setSeleccionados({ ...seleccionados, min: parseInt(e.target.value) })
          }
        />
      </label>
      <label htmlFor="max">
        Max
        <Input
          type="number"
          id="max"
          name="max"
          min={seleccionados.min}
          value={seleccionados.max}
          defaultValue={"100"}
          onChange={(e) =>
            setSeleccionados({ ...seleccionados, max:  parseInt(e.target.value) })
          }
        />
      </label>
    </div>
  );
}
