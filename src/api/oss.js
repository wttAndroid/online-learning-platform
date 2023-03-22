import request from '@/api/request'
const api_prefix = "/edu/oss"

export default {
      // 上传头像
  uploadAvater (file) {
    console.log(file)
        return request({
          url: `${api_prefix}/file`,
          method: 'post',
          data:file
        })
        },

       // 上传视频
       uploadVideo (file) {
        console.log(file)
            return request({
              url: `/edu/video/create`,
              method: 'post',
              data:file
            })
  },
        // 上传视频
        deleteVideo (videoId) {
              return request({
                url: `/edu/video/remove/${videoId}`,
                method: 'delete'
        })
      },
      // 获取视频凭证 http://127.0.0.1:8001/file/playauth/1619185767712612353
      getVideoPlayAuth (videoId) {
            return request({
              url: `${api_prefix}/file/playauth/${videoId}`,
              method: 'get'
      })
    }
      
}
