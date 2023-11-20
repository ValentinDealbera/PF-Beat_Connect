import Content from './content'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beats | BeatConnect'
}

export default function Page() {
  return <Content />
}
