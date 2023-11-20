import Content from './content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Author | BeatConnect'
}

export default function Page({ params }: { params: { authorId: string } }) {
  return <Content params={params} />
}
