export default function Select({
  valores,
  setSeleccionados,
  value,
  label,
  labelClass,
}) {
  return (
    <div className="text-sm-medium border-radius-estilo2 color-neutral-black-950 placeholder:color-neutral-gray-400 border-slate-200 bg-white  flex flex-col gap-2" style={{ width: "100%" }}>
      <label className={labelClass}>{label}</label>
      <select
        onChange={(e) => setSeleccionados(e.target.value)}
        value = {value}
        className="rounded-xl border px-4 py-2 border-slate-200 bg-white  text-black placeholder:text-gray-400"
      >
        {valores.map((valor) => (
          <option value={valor.value}>{valor.label}</option>
        ))}
      </select>
    </div>
  );
}
