import React, { useState, useRef, useEffect } from 'react'
import { MiniModalBox, ArrowLabel, CheckboxGroup } from '@/components'

interface Props {
  seleccionados: any
  setSeleccionados: (seleccionados: any) => void
  label: string
  values: any
}

export default function MultiSelect({ seleccionados, setSeleccionados, label, values }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  function handleClickOutside(event: any) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false)
    }
  }

  function handleDropdownClick() {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div ref={dropdownRef} id='dropdown'>
      <ArrowLabel label={label} handleDropdownClick={handleDropdownClick} iconStatus />
      {isDropdownOpen && (
        <MiniModalBox>
          <CheckboxGroup
            values={values}
            seleccionados={seleccionados}
            setSeleccionados={setSeleccionados}
            label={label}
          />
        </MiniModalBox>
      )}
    </div>
  )
}
