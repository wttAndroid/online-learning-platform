import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://123.56.144.92:8001',
  baseURL:'http://127.0.0.1:8001', 
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    console.log(store.getters.token)
    // do something before request is sent
    if (store.getters.token) {
      config.headers['X-Token'] = store.getters.token || ''
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code !== 20000) { //发生了错误
      let message = res.message || 'Error'
      // if (res.status === 3001) { // 用户未登录
      //   store.dispatch('user/setInfo', {})
      //   // window.location.reload()
      //   return
      // } else if (res.status === 1001) { // 非法参数
      //   if (res.data instanceof Object) {
      //     for (const key in res.data) {
      //       message = res.data[key]
      //       break
      //     }
      //   } else {
      //     message = res.data || res.message
      //   }
      // } else if (res.status === 400) {
      //   message = res.errors&& res.errors[0]&&res.errors[0].defaultMessage
      // }

      if (res.code == 20002) {
        store.dispatch("dialog/setlogin", true);
      }


      // Message({
      //   message: message,
      //   type: 'error',
      //   duration: 3.6 * 1000
      // })

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
