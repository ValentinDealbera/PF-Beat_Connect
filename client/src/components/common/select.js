export default function Select({
  valores,
  setSeleccionados,
  value,
  label,
  labelClass,
  error,
}) {
  return (
    <div
      type="text"
      className="text-sm-medium border-radius-estilo2 color-neutral-black-950 placeholder:color-neutral-gray-400 flex flex-col  gap-2 border-slate-200 bg-white"
      style={{ width: "100%" }}
    >
      <label className={labelClass}>{label}</label>
      <select
        onChange={(e) => setSeleccionados(e.target.value)}
        value={value}        
        className="rounded-xl border border-slate-200 bg-white px-4 py-2  text-black placeholder:text-gray-400"
      >
        {/* Valor default */}
        <option value="" disabled selected>
          Seleccionar género
        </option>
        {valores.map((valor) => (
          <option value={valor.value}>{valor.label}</option>
        ))}
      </select>
      {error && (
        <p className="gap-estilo4 text-sm-medium color-primary-red-500 ml-2 flex">
          {error}
        </p>
      )}
    </div>
  );
}
