export default function CheckboxGroup({
  label,
  values,
  seleccionados,
  setSeleccionados,
}) {
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

function Checkbox({ value, seleccionados, setSeleccionados }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        value={value.value}
        checked={seleccionados.some((v) => v.value === value.value)}
        onChange={(e) =>
          e.target.checked
            ? setSeleccionados([...seleccionados, value])
            : setSeleccionados(
                seleccionados.filter((v) => v.value !== value.value)
              )
        }
      />
      <label className="text-sm-light">{value.label}</label>
    </div>
  );
}
