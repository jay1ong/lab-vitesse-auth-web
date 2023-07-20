import { type UserModule } from '~/types'
import initUser from '~/services/model/initUser'

const userLocalStorage = useStorage('user', initUser)

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from, next) => {
      const publicPages = ['/', '/register']
      const authRequired = !publicPages.includes(to.path)
      // your auth logic
      // trying to access a restricted page + not logged in
      // redirect to login page
      if (authRequired && !unref(userLocalStorage).accessToken)
        next('/')

      else
        next()

      // 返回 false 以取消导航
    //   return false
    })
  }
}
