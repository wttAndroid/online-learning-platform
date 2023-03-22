import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const Index =() => import(/* webpackChunkName: "about" */ '../views/Index.vue')
const HomeCenter =() => import(/* webpackChunkName: "about" */ '../views/pages/HomeCenter.vue')
const CourseCenter =() => import(/* webpackChunkName: "about" */ '../views/pages/CourseCenter.vue')
const ForumCenter =() => import(/* webpackChunkName: "about" */ '../views/pages/ForumCenter.vue')
const LearnCenter =() => import(/* webpackChunkName: "about" */ '../views/pages/LearnCenter.vue')
const TeacherCenter =() => import(/* webpackChunkName: "about" */ '../views/pages/TeacherCenter.vue')
const TeacherDetail =() => import(/* webpackChunkName: "about" */ '../views/details/TeacherDetail.vue')
const VideoDetail =() => import(/* webpackChunkName: "about" */ '../views/details/VideoDetail.vue')



const CourseDetail =() => import(/* webpackChunkName: "about" */ '../views/details/CourseDetail.vue')
const PersonalCenter =() => import(/* webpackChunkName: "about" */ '../views/pages/PersonalCenter.vue')
const NoticeCenter =() => import(/* webpackChunkName: "about" */ '../views/pages/NoticeCenter.vue')
const ForumPage =() => import(/* webpackChunkName: "about" */ '../views/details/ForumPage.vue')
const ForumDetail =() => import(/* webpackChunkName: "about" */ '../views/details/ForumDetail.vue')

const AskRelease =() => import(/* webpackChunkName: "about" */ '../views/details/AskRelease.vue')


const Information = () => import(/* webpackChunkName: "about" */ '../views/personal/Information.vue')
const MyClasses = () => import(/* webpackChunkName: "about" */ '../views/personal/MyClasses.vue')
const Answer = () => import(/* webpackChunkName: "about" */ '../views/personal/Answer.vue')
const Msg = () => import(/* webpackChunkName: "about" */ '../views/notice/Msg.vue')
const Exam = () => import(/* webpackChunkName: "about" */ '../views/notice/Exam.vue')
const Busywork = () => import(/* webpackChunkName: "about" */ '../views/notice/Busywork.vue')


const NewsCenter = () => import(/* webpackChunkName: "about" */ '../views/pages/NewsCenter.vue')
const NewsList =() => import(/* webpackChunkName: "about" */ '../views/details/NewsList.vue')
const NewsDetail =() => import(/* webpackChunkName: "about" */ '../views/details/NewsDetail.vue')



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: "/homeCenter",
    children: [
      {
        path: '/homeCenter',
        name: 'HomeCenter',
        component: HomeCenter
      },
      {
        path: '/courseCenter',
        name: 'CourseCenter',
        component: CourseCenter
      }, {
        path: '/forumCenter',
        name: 'ForumCenter',
        component: ForumCenter,
        redirect: "/forumCenter/page",
        children: [
          {
            path: '/forumCenter/page',
            name: 'ForumPage',
            component: ForumPage
          },
          {
            path: '/forumCenter/detail/:id',
            name: 'ForumDetail',
            component: ForumDetail
          },
        ]
      },
      {
        path: '/learnCenter',
        name: 'LearnCenter',
        component: LearnCenter
      },{
        path: '/teacherCenter',
        name: 'TeacherCenter',
        component: TeacherCenter
      },
      {
        path: '/teacherDetail',
        name: 'TeacherDetail',
        component: TeacherDetail
      },
      {
        path: '/courseDetail',
        name: 'CourseDetail',
        component: CourseDetail
      },
      {
        path: '/player/:vid',
        name: 'VideoDetail',
        component: VideoDetail
      },
      {
        path: '/personalCenter',
        name: 'PersonalCenter',
        redirect: "/personalCenter/information",
        component: PersonalCenter,
        children: [
          {
            path: '/personalCenter/information',
            name: 'Information',
            component: Information
          },
          {
            path: '/personalCenter/myClasses',
            name: 'MyClasses',
            component: MyClasses
          },
          {
            path: '/personalCenter/answer',
            name: 'Answer',
            component: Answer
          }
        ]
      },{
        path: '/notice',
        name: 'Notice',
        redirect: "/notice/msg",
        component: NoticeCenter,
        children: [
          {
            path: '/notice/msg',
            name: 'Msg',
            component: Msg
          }, {
            path: '/notice/exam',
            name: 'exam',
            component: Exam
          }, {
            path: '/notice/Busywork',
            name: 'Busywork',
            component: Busywork
          }
        ]
      },
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/askrelease',
        name: 'AskRelease',
        component: AskRelease
      },
      {
        path: '/news',
        name: 'NewsCenter',
        component: NewsCenter,
        redirect: "/news/list",
        children: [
          {
            path: '/news/list',
            name: 'NewsList',
            component: NewsList
          },
          {
            path: '/news/detail/:id',
            name: 'NewsDetail',
            component: NewsDetail
          },
        ]
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/do',
    name: 'ExamPaperDo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/exam/paper/do')
  }
  ,
  {
    path: '/read',
    name: 'ExamPaperRead',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/exam/paper/read')
  }
]

const router = new VueRouter({
  routes
})



//要添加的代码
router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})

// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = router.matcher // reset router
// }

export default router


