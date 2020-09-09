import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Login from '@/pages/login/login' // 登录
import Entrance from '@/pages/Entrance/Entrance' // 选择平台
import Platform from '@/pages/Platform/Platform' // 平台
import Administration from '@/pages/Platform/Administration/Administration' // 课堂管理
import FreePractice_mode from '@/pages/Platform/Administration/FreePractice_mode/FreePractice_mode' // 课堂管理>自由练习模式
import Classrooms_mode from '@/pages/Platform/Administration/Classrooms_mode/Classrooms_mode' // 课堂管理>课堂练习模式
import Examination_mode from '@/pages/Platform/Administration/Examination_mode/Examination_mode' // 课堂管理>考试模式
import ScoreQuery from '@/pages/Platform/ScoreQuery/ScoreQuery' // 考试成绩查询
import StudentList from '@/pages/Platform/ScoreQuery/StudentList' // 考试成绩查询>学生列表
import PaperDetails from '@/pages/Platform/ScoreQuery/PaperDetails' // 考试成绩查询>学生列表>试卷详情
import Analysis from '@/pages/Platform/Analysis/Analysis' // 试题分析
import AnswerData from '@/pages/Platform/AnswerData/AnswerData' // 学生答题数据
import AnswerDetails from '@/pages/Platform/AnswerData/AnswerDetails' // 学生答题数据>试题详情
import Question from '@/pages/Platform/Question/Question' // 题库管理
import QuestionDetails from '@/pages/Platform/Question/QuestionDetails' // 题库管理>题库详情
import Examination from '@/pages/Platform/Examination/Examination' // 考试管理

Vue.use(Router)
export default new Router({
  routes: [
    { // 登录页面
      path: '/',
      name: 'Login',
      component: Login
    },{ // 选择平台页面
      path: '/Entrance',
      name: 'Entrance',
      component: Entrance
    },{ // 平台页面
      path: '/Platform',
      name: 'Platform',
      component: Platform,
      children:[{ // 课堂管理（一级tab路由）
        path: '/Administration',
        name: 'Administration',
        component: Administration,
        children:[{ // 自由练习模式（子级路由）
          path: '/FreePractice_mode',
          name: 'FreePractice_mode',
          component: FreePractice_mode
        },{ // 课堂练习模式（子级路由）
          path: '/Classrooms_mode',
          name: 'Classrooms_mode',
          component: Classrooms_mode
        },{ // 考试模式（子级路由）
          path: '/Examination_mode',
          name: 'Examination_mode',
          component: Examination_mode
        }],
        redirect:function () {
          let navList = store.state.navList
          for(var i = 0; i < navList.length; i++){
            if (navList[i].class == 'Choice') {
              return navList[i].route
            }
          }
        }
      },{ // 考试成绩查询（一级tab路由）
        path: '/ScoreQuery',
        name: 'ScoreQuery',
        component: ScoreQuery,
      },{ // 试题分析（一级tab路由）
        path: '/Analysis',
        name: 'Analysis',
        component: Analysis
      },{ // 学生答题数据（一级tab路由）
        path: '/AnswerData',
        name: 'AnswerData',
        component: AnswerData
      },{ // 题库管理（一级tab路由）
        path: '/Question',
        name: 'Question',
        component: Question
      },{ // 考试管理（一级tab路由）
        path: '/Examination',
        name: 'Examination',
        component: Examination
      },{ // 学生列表页（二级页面）
        path: '/StudentList',
        name: 'StudentList',
        component: StudentList
      },{ // 试卷详情页（二级页面）
        path: '/PaperDetails',
        name: 'PaperDetails',
        component: PaperDetails
      },{ // 题库详情页（二级页面）
        path: '/QuestionDetails',
        name: 'QuestionDetails',
        component: QuestionDetails
      },{ // 试题详情页（二级页面）
        path: '/AnswerDetails',
        name: 'AnswerDetails',
        component: AnswerDetails
      }],
      redirect:'/Administration'
    }
  ]
})
