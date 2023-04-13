import { Checkbox } from "@/components";

export default function CheckboxGroup({
  label,
  values,
  seleccionados,
  setSeleccionados,
}) {
  console.log("values ckgroup", values);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base-semibold">{label}</label>
      <div className="flex flex-col gap-2">
        {values.map((value) => (
          <Checkbox
            value={value}
            seleccionados={seleccionados}
            setSeleccionados={setSeleccionados}
          />
        ))}
      </div>
    </div>
  );
}
