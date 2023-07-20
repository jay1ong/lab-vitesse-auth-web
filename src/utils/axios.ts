import { unref } from 'vue'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { MessagePlugin } from 'tdesign-vue-next'
import { useAuthStoreWithOut } from '../stores/module/auth.module'
import type { ApiMessageModel } from '../services/model/httpModel'
import initUser from '~/services/model/initUser'
import type { UserModel } from '~/services/model/userModel'

const instance = axios.create()

const VITE_API_URL = import.meta.env.VITE_API_URL

if (VITE_API_URL)
  instance.defaults.baseURL = VITE_API_URL as string

instance.defaults.timeout = 10000

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const userLocalStorage = useStorage('user', initUser)
    const unrefUser = unref(userLocalStorage) as UserModel
    if (unrefUser) {
      const authorization = `Bearer ${unrefUser.accessToken}`
      config.headers.Authorization = authorization
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const data = response.data
    if (!data || !data.code || data.code !== '200') {
      MessagePlugin.error({ content: data.message })
      return Promise.reject(response.data)
    }
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { logout } = useAuthStoreWithOut()
    const status = error.response.status
    let errMessage = ''
    switch (status) {
      case 400:
        break
      // 401: Not logged in
      // Jump to the login page if not logged in, and carry the path of the current page
      // Return to the current page after successful login. This step needs to be operated on the login page.
      case 401:
        errMessage = '用户没有权限（令牌、用户名、密码错误）'
        logout()
        break
      case 403:
        errMessage = '用户得到授权，但是访问是被禁止的。'
        break
      // 404请求不存在
      case 404:
        errMessage = '网络请求错误,未找到该资源'
        break
      case 405:
        errMessage = '网络请求错误,请求方法未允许'
        break
      case 408:
        errMessage = '网络请求超时'
        break
      case 500:
        errMessage = '服务器错误,请联系管理员'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用，服务器暂时过载或维护'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
    }
    MessagePlugin.error({ content: errMessage })
    return Promise.reject(error)
  },
)

function get(url: string, config: AxiosRequestConfig): Promise<any> {
  return request(url, { ...config, method: 'GET' })
}

function post(url: string, config: AxiosRequestConfig): Promise<any> {
  return request(url, { ...config, method: 'POST' })
}

function put(url: string, config: AxiosRequestConfig): Promise<any> {
  return request(url, { ...config, method: 'PUT' })
}

function request(url: string, config: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    instance
      .request<any, AxiosResponse<ApiMessageModel>>({
        ...config,
        url: instance.defaults.baseURL + url,
      })
      .then((res: AxiosResponse<ApiMessageModel>) => {
        resolve(res.data.data)
      })
      .catch((e: Error | AxiosError) => {
        if (axios.isAxiosError(e)) {
          // rewrite error message from axios in here
        }
        reject(e)
      })
  })
}

export { instance as axios, get, post, put, request }
