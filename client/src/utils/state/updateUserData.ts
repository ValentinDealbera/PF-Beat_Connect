import { axiosPutter } from '../requests'

export async function updateUserData(clientId: string, data: any) {
  return await axiosPutter({
    url: `user/${clientId}`,
    body: data,
    headers: {
      userid: clientId
    }
  })
}
