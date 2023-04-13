export default function Checkbox({ value, seleccionados, setSeleccionados }) {
  console.log("value", value);
  return (
    <div className="flex gap-2">
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
