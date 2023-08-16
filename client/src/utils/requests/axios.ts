import axios from "axios";
import { serverUrl } from "@/data/config";

type axiosPutter = {
  url: any;
  body: any;
  headers?: any;
};

export const axiosPutter = async ({ url, body, headers }: axiosPutter) => {
  const { data: res } = await axios.put(serverUrl + url, body, {
    headers: headers || {},
  });

  return res;
};

type axiosPoster = {
  url: any;
  body?: any;
  headers?: any;
};
export const axiosPoster = async ({ url, body, headers }: axiosPoster) => {
  console.log("axiosPoster body", body);
  const { data: res } = await axios.post(serverUrl + url, body || {}, {
    headers: headers || {},
  });

  return res;
};

type axiosGetter = {
  url: any;
  headers?: any;
};

export const axiosGetter = async ({ url, headers }: axiosGetter) => {
  console.log("axiosGetter headers", headers);
  const { data: res } = await axios.get(serverUrl + url, {
    headers: headers || {},
  });

  return res;
};

type axiosDeleter = {
  url: any;
  headers?: any;
};

export const axiosDeleter = async ({ url, headers }: axiosDeleter) => {
  const { data: res } = await axios.delete(serverUrl + url, {
    headers: headers,
  });

  return res;
};
