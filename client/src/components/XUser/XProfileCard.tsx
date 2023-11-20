import Image from 'next/image'

interface Props {
  profilePhoto: string
  profileName: string
  profileMessage: string
}

const ProfileCard = ({ profilePhoto, profileName, profileMessage }: Props) => (
  <div className='flex w-max max-w-full items-center gap-estilo4 flex-row overflow-hidden rounded-full bg-white  py-2 pl-2 pr-5 sm:max-w-[300px]'>
    <Image
      src={profilePhoto}
      width={75}
      height={75}
      alt='Profile photo'
      className='aspect-square rounded-full border object-cover'
    />
    <div className='flex flex-col items-start px-2'>
      <h1 className='text-base-medium '>{profileName}</h1>
      <h3 className='text-sm-light text-start'>{profileMessage}</h3>
    </div>
  </div>
)

export default ProfileCard
