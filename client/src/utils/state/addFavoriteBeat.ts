import { axiosPutter } from "../requests";

export async function addFavoriteBeat(formData: FormData, userId: string) {
  return await axiosPutter({
    url: `user/${userId}`,
    body: formData,
    headers: {
      userid: userId,
    },
  });
}
