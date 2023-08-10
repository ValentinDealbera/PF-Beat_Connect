import { serverUrl } from "@/data/config";
import axios from "axios";

export function createUserSession(user) {
  const {
    firstName,
    lastName,
    bio,
    _id,
    email,
    username,
    image,
    backImage,
    softDelete,
  } = user;

  return {
    firstName,
    lastName,
    bio,
    image,
    _id,
    email,
    userName: username,
    backImage,
    softDelete,
  };
}

export const getUserData = async ({ clientId }) => {
  try {
    const { data: response } = await axios.get(`${serverUrl}user/${clientId}`);

    const session = createUserSession(response);

    return session;
  } catch (error) {
    console.log("Error al obtener los datos del usuario", error);
    return;
  }
};
