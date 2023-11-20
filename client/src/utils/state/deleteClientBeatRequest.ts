import { axiosDeleter } from '../requests'

export async function deleteClientBeatRequest(beatId: string, userId: string) {
  return await axiosDeleter({
    url: `beats/${beatId}`,
    headers: {
      userid: userId
    }
  })
}
