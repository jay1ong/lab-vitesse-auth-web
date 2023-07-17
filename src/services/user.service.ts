import { get } from '../utils/axios'

const API_URL = '/user/'

class UserService {
  getUserInfo(username: string) {
    return get(`${API_URL}username`, { params: { username } }).then((res: any) => {
      return res
    })
  }
}

export default new UserService()
