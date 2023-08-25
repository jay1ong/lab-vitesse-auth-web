/**
 * 此处可直接引用自己项目封装好的 axios 配合后端联调
 */
import type { UserModel } from './userModel'
import { del, get, post, put } from '~/utils/axios'

/**
 * 用户列表
 */
export function listUserApi() {
  return get('/user/users', {

  })
}

export function removeUserApi(ids: string[]) {
  return del('/user/users', {
    data: ids,
  })
}

export function addUserApi(user: UserModel) {
  return post('/user/users', {
    data: user,
  })
}

export function changeUserApi(user: UserModel) {
  return put('/user/users', {
    data: user,
  })
}
