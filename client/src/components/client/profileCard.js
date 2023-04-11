import Image from 'next/image';


export default function ProfileCard ({ profilePhoto, profileName, profileMessage }){

    return(
        <div className='bg-white max-w-full w-max sm:w-[300px] flex flex-row border-radius-estilo1 rounded-lg sm:px-1 py-2 overflow-hidden'>
            <div className="mx-auto my-auto flex flex-row gap-estilo4 px-6">
               <Image src={profilePhoto} width={80} height={80} alt="Profile photo" className="rounded-full border object-cover aspect-square" />
                  <div className="mx-auto my-auto px-2">
                     <div className='flex flex-row items-center justify-start gap-estilo4'>
                        <h1 className='text-base-medium text-sm' >{profileName}</h1>
                        <Image src="/icon/checked-blue.svg" alt='checked profile' width={20} height={20} />
                     </div>
                        <h3 className='text-base-light text-sm' >{profileMessage}</h3>
                  </div>
            </div>
        </div>
    )
}
