/**
 * 此处可直接引用自己项目封装好的 axios 配合后端联调
 */
import { get } from '~/utils/axios'

/**
 * 用户列表
 */
export function listUserApi() {
  return get('/user/users', {

  })
}
