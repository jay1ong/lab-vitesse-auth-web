import type { ApiMessageModel } from '~/composables/httpModel'
import { get } from '~/utils/axios'

const API_URL = '/user/'

class UserService {
  getUserInfo(username: string) {
    return get(`${API_URL}username`, { params: { username } }).then((res: ApiMessageModel) => {
      return res
    })
  }
}

export default new UserService()
