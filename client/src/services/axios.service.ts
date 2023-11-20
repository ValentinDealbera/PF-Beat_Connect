import axios from 'axios'
import { serverUrl } from '@/utils/config.const'

interface AxiosPutter {
  url: string
  body: any
  headers?: any
}

export const axiosPutter = async ({ url, body, headers }: AxiosPutter) => {
  const { data: res } = await axios.put(serverUrl + url, body, {
    headers: headers || {}
  })

  return res
}

interface AxiosPoster {
  url: string
  body?: any
  headers?: any
}
export const axiosPoster = async ({ url, body, headers }: AxiosPoster) => {
  console.log('axiosPoster body', body)
  const { data: res } = await axios.post(serverUrl + url, body || {}, {
    headers: headers || {}
  })

  return res
}

interface AxiosGetter {
  url: string
  headers?: any
}

export const axiosGetter = async ({ url, headers }: AxiosGetter) => {
  console.log('axiosGetter headers', headers)
  const { data: res } = await axios.get(serverUrl + url, {
    headers: headers || {}
  })

  return res
}

interface AxiosDeleter {
  url: string
  headers?: any
}

export const axiosDeleter = async ({ url, headers }: AxiosDeleter) => {
  const { data: res } = await axios.delete(serverUrl + url, {
    headers
  })

  return res
}
