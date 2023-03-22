import request from '@/api/request'

export function sendEmail (info) {
  let data=new FormData();
  data.append("stuId", info.stuId);
  data.append("email", info.email);//前面的key记得对应！
    return request({
      url: `/edu/sendfindCode`,
      method: 'post',
      data
    })
}

export function sendRegisterEmail (info) {
  let data=new FormData();
  data.append("stuId", info.stuId);
  data.append("email", info.email);//前面的key记得对应！
    return request({
      url: `/edu/sendCode`,
      method: 'post',
      data
    })
}

export function examselect (id) {
  return request({
    url: `/api/student/exam/paper/select/${id}`,
    method: 'post'
  })
}
export function exampageList (data) {
  return request({
    url: `/api/student/exam/paper/pageList`,
    method: 'post',
    data
  })
}

export function answerpageList (data) {
  return request({
    url: `/api/student/exampaper/answer/pageList`,
    method: 'post',
    data
  })
}

export function answerSubmit (data) {
  return request({
    url: `/api/student/exampaper/answer/answerSubmit`,
    method: 'post',
    data
  })
}

export function answerRead (id) {
  return request({
    url: `/api/student/exampaper/answer/read/${id}`,
    method: 'post'
  })
}

export function answerEdit (data) {
  return request({
    url: `/api/student/exampaper/answer/edit`,
    method: 'post',
    data
  })
}
