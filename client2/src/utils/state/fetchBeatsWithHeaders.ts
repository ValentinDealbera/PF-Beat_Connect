import { axiosGetter } from "../requests";

export async function fetchBeatsWithHeaders(queryString: string) {
  return await axiosGetter({
    url: `beats${queryString}`,
  });
}
