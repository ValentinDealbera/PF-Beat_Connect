import { type BeatsClass } from '@/types'
import { axiosPoster } from '../requests'

export async function uploadClientBeat(data: BeatsClass, userId: string) {
  return await axiosPoster({
    url: 'beats',
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      userid: userId
    }
  })
}
