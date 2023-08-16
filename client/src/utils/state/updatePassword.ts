import { axiosPutter } from "../requests";

export async function updatePassword(clientId: string, formData: FormData) {
  await axiosPutter({
    url: `user/${clientId}`,
    body: formData,
    headers: {
      userid: clientId,
    },
  });
}
