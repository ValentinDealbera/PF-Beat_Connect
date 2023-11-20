interface CheckboxGroupProps {
  label: string
  values: Array<{ value: string; label: string }>
  seleccionados: Array<{ value: string; label: string }>
  setSeleccionados: any
}

const CheckboxGroup = ({ label, values, seleccionados, setSeleccionados }: CheckboxGroupProps) => (
  <div className='flex flex-col gap-2'>
    <label className='text-base-semibold'>{label}</label>
    <div className='flex flex-col gap-2'>
      {values.map((value) => (
        <Checkbox value={value} seleccionados={seleccionados} setSeleccionados={setSeleccionados} key={value.value} />
      ))}
    </div>
  </div>
)

interface CheckboxProps {
  value: { value: string; label: string }
  seleccionados: Array<{ value: string; label: string }>
  setSeleccionados: (seleccionados: Array<{ value: string; label: string }>) => void
}

const Checkbox = ({ value, seleccionados, setSeleccionados }: CheckboxProps) => (
  <div className='flex gap-2 items-center'>
    <input
      type='checkbox'
      value={value.value}
      checked={seleccionados.some((v) => v.value === value.value)}
      onChange={(e) => {
        e.target.checked
          ? setSeleccionados([...seleccionados, value])
          : setSeleccionados(seleccionados.filter((v) => v.value !== value.value))
      }}
    />
    <label className='text-sm-light'>{value.label}</label>
  </div>
)

export default CheckboxGroup
