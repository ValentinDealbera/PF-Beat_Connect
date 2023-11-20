'use client'
import { Hero, ProfileCard, Section, Loader, BeatsGrid } from '@/components'
import { useEffect } from 'react'
import { fetchCurrentAuthor } from '@/redux/slices/beats'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

interface Props {
  params: {
    authorId: string
  }
}

const AuthorProfile = ({ params }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCurrentAuthor(params.authorId))
  }, [params.authorId])

  const { currentAuthor, currentAuthorBeats, loadingcurrentAuthor } = useAppSelector((state) => state.beats)

  return (
    <>
      <Hero style={{ height: '45vh' }} image={currentAuthor?.backImage} imageAlt=''>
        <div id='contenido' className='padding-x-estilo2 flex h-full w-full flex-col justify-end pb-8'>
          <ProfileCard
            profilePhoto={currentAuthor?.image}
            profileName={`${currentAuthor?.firstName} ${currentAuthor?.lastName}`}
            profileMessage={currentAuthor?.bio}
          />
        </div>
      </Hero>
      <Section subClassName='padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col'>
        {loadingcurrentAuthor ? <Loader /> : <BeatsGrid beats={currentAuthorBeats} />}
      </Section>
    </>
  )
}

export default AuthorProfile
