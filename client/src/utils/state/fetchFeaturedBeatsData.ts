import { axiosGetter } from '../requests'

export async function fetchFeaturedBeatsData() {
  return await axiosGetter({
    url: 'beats?relevance=desc&limit=5'
  })
}
