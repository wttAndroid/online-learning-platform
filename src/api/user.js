import request from '@/api/request'
const api_prefix = '/api/app/edu/us'

// 登录
export function login(data) {
  return request({
    url: `${api_prefix}/login`,
    method: 'post',
    data
  })
}
// 注册
export function register(data) {
  return request({
    url: `${api_prefix}/register`,
    method: 'post',
    data
  })
}


// 注销
export function logout() {
  return request({
    url: `${api_prefix}/logout`,
    method: 'post'
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: `${api_prefix}/info`,
    method: 'get'
  })
}


// 更改用户信息
export function profile(data) {
  return request({
    url: `${api_prefix}/update/profile`,
    method: 'post',
    data
  })
}



export function updatePass(data) {
  return request({
    url: `${api_prefix}/update/password`,
    method: 'post',
    data
  })
}


export function findpass(data) {
  return request({
    url: `${api_prefix}/update/findpass`,
    method: 'post',
    data
  })
}
