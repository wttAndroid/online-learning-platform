import request from '@/api/request'

const api_name = '/api/app/edu/pub'
   
const api_pro = '/api/admin/learnprogress'

export default {
  getHomeList () {
    return request({
      url: `${api_name}/home/list`,
      method: 'get'
    })
  },
  getSujectList () {
    return request({
      url: `${api_name}/subject/get`,
      method: 'get'
    })
  },
  getCourseList (data,current=1,limit=10) {
    return request({
      url: `${api_name}/course/${current}/${limit}`,
      method: 'post',
      data
    })
  },

  getCourseInfo (id) {
    return request({
      url: `${api_name}/course/${id}`,
      method: 'get'
    })
  },

  getTeacherList (teacherName, current = 1, limit = 10) {
    let data=new FormData();
    data.append("teacherName", teacherName);
    return request({
      url: `${api_name}/teacher/${current}/${limit}`,
      method: 'post',
      data
    })
  },
  getTeacherInfo (teacherid) {
    return request({
      url: `${api_name}/teacher/${teacherid}`,
      method: 'get'
    })
  },
  getAclList (data,current,limit=10) {
    return request({
      url: `${api_name}/acl/${current}/${limit}`,
      method: 'post',
      data
    })
  },
  getAclUsList (current,limit=10) {
    return request({
      url: `${api_name}/acl/us/${current}/${limit}`,
      method: 'get'
    })
  },
  getAclComList (current,limit=10) {
    return request({
      url: `${api_name}/acl/comment/us/${current}/${limit}`,
      method: 'get'
    })
  },
  
  deleAclUs (artId) {
    return request({
      url: `${api_name}/acl/us/${artId}`,
      method: 'delete'
    })
  },
  getAclhotList () {
    return request({
      url: `${api_name}/acl/hot`,
      method: 'get'
    })
  },
  getAclTaghotList () {
    return request({
      url: `${api_name}/tag/hot`,
      method: 'get'
    })
  },
  getAclCateList () {
    return request({
      url: `${api_name}/acl/cate`,
      method: 'get'
    })
  },
  saveAcl (data) {
    return request({
      url: `${api_name}/acl/save`,
      method: 'post',
      data
    })
  },
  updateAcl (data) {
    return request({
      url: `${api_name}/acl/update`,
      method: 'post',
      data
    })
  },
  getAclTagList () {
    return request({
      url: `${api_name}/acl/tag`,
      method: 'get'
    })
  },
  getCommentByAcl (id) {
    return request({
      url: `${api_name}/acl/comment/${id}`,
      method: 'get'
    })
  },
  getAclById (id) {
    return request({
      url: `${api_name}/acl/${id}`,
      method: 'get'
    })
  },
  saveComment (data) {
    return request({
      url: `${api_name}/acl/comment/save`,
      method: 'post',
      data
    })
  },
  deleComment (comId) {
    let data=new FormData();
    data.append("comId", comId);
    return request({
      url: `${api_name}/acl/comment/dele`,
      method: 'delete',
      data
    })
  },
  getProgress (data) {
    return request({
      url: `${api_name}/progress`,
      method: 'post',
      data
    })
  },
  getElective (data) {
    return request({
      url: `${api_name}/elective`,
      method: 'post',
      data
    })
  },
  joinElective (courseId) {
  let data=new FormData();
  data.append("courseId", courseId);
    return request({
      url: `${api_name}/elective/join`,
      method: 'post',
      data
    })
  },
  getCourseByList () {
    return request({
      url: `${api_name}/course/mylist`,
      method: 'get'
    })
  },
  getMsgByList (current,limit=10) { 
    return request({
      url: `${api_name}/msg/page/us/${current}/${limit}`,
      method: 'get'
    })
  },
  readByMsg (id) { 
    return request({
      url: `${api_name}/msg/page/us/read/${id}`,
      method: 'post'
    })
  },

  //获取考试
  getByExam (data, current, limit = 10) { 
    console.log(data)
    return request({
      url: `${api_name}/exam/page/us/${current}/${limit}`,
      method: 'post',
      data
    })
  },

  //获取当前考试内容
  getByExamCtx(id) { 
    return request({ 
      url: `${api_name}/exam/select/${id}`,
      method: 'post'
    })
  },
  answerSubmit (data) {
    return request({ 
      url: `${api_name}/exam/answer/submit`,
      method: 'post',
      data
    })
  },
  isAnswerSubmit (examId) {
    let data=new FormData();
    data.append("examId", examId);
    return request({ 
      url: `${api_name}/exam/answer/issubmit`,
      method: 'post',
      data
    })
  },
  readExamAnswer (id) {
    return request({ 
      url: `${api_name}/exam/answer/read/${id}`,
      method: 'post'
    })
  },
  upProgress (data) {
    return request({ 
      url: `${api_name}/progress/upProgress`,
      method: 'post',
      data
    })
  },
  learnprogress (videoId) {
    let data = new FormData();
    if (videoId) {
      data.append("videoId", videoId);
    }
    return request({ 
      url: `${api_name}/progress/getProgress`,
      method: 'post',
      data
    })
  }

  ,
  getAffichelist (current,limit=10) {
    return request({ 
      url: `${api_name}/affiche/list/${current}/${limit}`,
      method: 'get',
    })
  },
  getAffichebyId (id) {
    return request({ 
      url: `${api_name}/affiche/${id}`,
      method: 'get',
    })
  },
}
