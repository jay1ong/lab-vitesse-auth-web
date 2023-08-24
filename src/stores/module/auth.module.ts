import { defineStore } from 'pinia'
import AuthService from '~/services/auth.service'
import { store } from '~/stores'
import type { UserModel } from '~/composables/userModel'
import type { ApiMessageModel } from '~/composables/httpModel'

const userLocalStorage = useStorage('user', initUser)

let userStorage: UserModel
if (userLocalStorage)
  userStorage = unref(userLocalStorage)

interface UserState {
  status: UserStatus
  user: UserModel | null
  token: string | undefined | null
}

interface UserStatus {
  loggedIn: boolean
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: (): UserState => ({
    token: userStorage.accessToken,
    status: {
      loggedIn:
        !!(userStorage?.accessToken),
    },
    user: userLocalStorage.value || useStorage('user', initUser).value,
  }),
  actions: {
    login(user: UserModel) {
      return AuthService.login(user).then(
        (user: UserModel) => {
          this.loginSuccess(user)
          return Promise.resolve(user)
        },
        (error: UserModel) => {
          this.loginFailure()
          return Promise.reject(error)
        },
      )
    },
    logout() {
      AuthService.logout()
      this.logoutFnc()
    },
    register(user: UserModel) {
      return AuthService.register(user).then(
        (response: UserModel) => {
          this.registerSuccess()
          return Promise.resolve(response)
        },
        (error: ApiMessageModel) => {
          this.registerFailure()
          return Promise.reject(error)
        },
      )
    },
    loginSuccess(user: UserModel) {
      this.status.loggedIn = true
      this.user = user
      this.token = user.accessToken
      userLocalStorage.value = user
    },
    loginFailure() {
      this.status.loggedIn = false
      this.user = null
      userLocalStorage.value = null
    },
    logoutFnc() {
      this.status.loggedIn = false
      this.user = null
      userLocalStorage.value = null
      location.reload()
    },
    registerSuccess() {
      this.status.loggedIn = false
    },
    registerFailure() {
      this.status.loggedIn = false
    },
  },
})

// Need to be used outside the setup
export function useAuthStoreWithOut() {
  return useAuthStore(store)
}
