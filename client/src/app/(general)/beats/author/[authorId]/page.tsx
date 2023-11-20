import Content from './_components/Content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autor | BeatConnect'
}

interface Props {
  params: {
    authorId: string
  }
}

const Author = ({ params }: Props) => <Content params={params} />

export default Author
