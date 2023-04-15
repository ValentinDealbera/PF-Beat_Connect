export default function Select({
  valores,
  setSeleccionados,
  label,
  labelClass,
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select
        onChange={(e) => setSeleccionados(e.target.value)}
        className="rounded-xl border-slate-200 bg-white px-4 py-0 text-black placeholder:text-gray-400"
      >
        {valores.map((valor) => (
          <option value={valor.value}>{valor.label}</option>
        ))}
      </select>
    </div>
  );
}
