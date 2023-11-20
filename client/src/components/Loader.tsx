import Image from 'next/image'

const Loader = () => (
  <div className='flex justify-center items-center  min-h-[150px] '>
    <Image src='/icon/loader.svg' alt='loader' width={50} height={50} />
  </div>
)

export default Loader
