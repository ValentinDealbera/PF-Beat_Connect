import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  setIsDropdownOpen: (arg: boolean) => void
}

export default function BeatBottomSheet({ children, setIsDropdownOpen }: Props) {
  const [hasElapsed, setHasElapsed] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasElapsed(true)
    }, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const handleClick = () => {
    if (hasElapsed) {
      setIsDropdownOpen(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        <div onClick={handleClick} className='fixed left-0 top-0 z-40 h-full w-full bg-black opacity-50 ' />
        <motion.div className='fixed bottom-0 left-0  z-50 max-h-[80vh] w-full overflow-y-scroll rounded-tl-3xl rounded-tr-3xl bg-white pb-10 pt-8'>
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
