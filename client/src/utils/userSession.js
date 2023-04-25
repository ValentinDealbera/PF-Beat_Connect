import { serverUrl } from "@/data/config";
import axios from "axios";

export function createUserSession(user) {
  const { firstName, lastName, bio, _id, email, username, image, backImage } =
    user;

  return {
    firstName,
    lastName,
    bio,
    profilePicture: image,
    _id,
    email,
    userName: username,
    backImage,
  };
}

export const getUserData = async ({ clientId }) => {
  console.log(
    "Obteniendo datos del usuario",
    clientId,
    serverUrl,
    `${serverUrl}user/${clientId}`
  );
  try {
    const { data: response } = await axios.get(`${serverUrl}user/${clientId}`);
    console.log("respuesta g:", response.data);
    const session = createUserSession(response);

    return session;
  } catch (error) {
    console.log("Error al obtener los datos del usuario", error);
    return;
  }
};
