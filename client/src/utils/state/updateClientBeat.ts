import { axiosPutter } from '../requests'

export async function updateClientBeat(formData: FormData, beatId: string, userId: string) {
  return await axiosPutter({
    url: `beats/${beatId}`,
    body: formData,
    headers: {
      userid: userId,
      'Content-Type': 'multipart/form-data'
    }
  })
}
