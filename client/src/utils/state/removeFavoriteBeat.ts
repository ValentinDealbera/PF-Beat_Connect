import { axiosPutter } from "../requests";

export async function removeFavoriteBeat(formData: FormData, userId: string) {
  return await axiosPutter({
    url: `user/${userId}`,
    body: formData,
    headers: {
      userid: userId,
    },
  });
}
