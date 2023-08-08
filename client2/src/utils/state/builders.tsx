import { AuthClass, UserClass } from "@/types";

export const sessionBuilder = (data: any) => {
  return new UserClass(data.id, data.firstName, data.lastName, data.email);
};
