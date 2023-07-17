import { axios, post } from '../utils/axios'
import type { UserModel } from './model/userModel'

const API_URL = '/auth'

class AuthService {
  login(user: UserModel) {
    return post(`${API_URL}/login`, {
      data: {
        username: user.username,
        password: user.password,
      },
    })
  }

  logout() {
    useStorage('user', '{}').value = null
  }

  register(user: UserModel) {
    return axios
      .post(`${API_URL}/register`, {
        username: user.username,
        password: user.password,
      })
      .then((response: any) => {
        const data = response.data
        return data
      })
  }
}

export default new AuthService()
