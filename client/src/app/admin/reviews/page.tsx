import Content from './content'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reviews | BeatConnect'
}

export default function Page() {
  return <Content />
}