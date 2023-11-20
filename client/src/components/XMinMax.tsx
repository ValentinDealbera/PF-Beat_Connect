import { Input } from '@/components'

interface MinMaxProps {
  seleccionados: any
  setSeleccionados: any
  label: string
}

const MinMax = ({ seleccionados, setSeleccionados, label }: MinMaxProps) => {
  const handleMinChange = (e: any) => {
    const newMin = parseInt(e.target.value)
    setSeleccionados({
      ...seleccionados,
      min: newMin
    })
  }

  const handleMaxChange = (e: any) => {
    const newMax = parseInt(e.target.value)
    setSeleccionados({
      ...seleccionados,
      max: newMax
    })
  }

  return (
    <div className='flex flex-col gap-2'>
      {label !== null && <label className='text-base-semibold'>{label}</label>}
      <Input
        label='Min'
        type='number'
        id='min'
        name='min'
        max={seleccionados.max}
        value={seleccionados.min}
        onChange={handleMinChange}
      />
      <Input
        label='Max'
        type='number'
        id='max'
        name='max'
        min={seleccionados.min}
        value={seleccionados.max}
        onChange={handleMaxChange}
      />
    </div>
  )
}

export default MinMax
