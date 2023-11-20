import { axiosGetter } from '../requests'

export async function fetchUserData(clientId: string) {
  return await axiosGetter({
    url: `user/${clientId}`
  })
}
