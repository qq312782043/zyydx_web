import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login' // 登录
import Entrance from '@/pages/Entrance/Entrance' // 选择平台
import Platform from '@/pages/Platform/Platform' // 平台
import Administration from '@/pages/Platform/Administration/Administration' // 课堂管理
import ScoreQuery from '@/pages/Platform/ScoreQuery/ScoreQuery' // 考试成绩查询
import StudentList from '@/pages/Platform/ScoreQuery/StudentList' // 考试成绩查询>学生列表
import PaperDetails from '@/pages/Platform/ScoreQuery/PaperDetails' // 考试成绩查询>学生列表>试卷详情
import Analysis from '@/pages/Platform/Analysis/Analysis' // 试题分析
import AnswerData from '@/pages/Platform/AnswerData/AnswerData' // 学生答题数据
import Question from '@/pages/Platform/Question/Question' // 题库管理
import QuestionDetails from '@/pages/Platform/Question/QuestionDetails' // 题库管理>题库详情
import FreePractice from '@/pages/Platform/Administration/FreePractice/FreePractice' // 自由练习模式
import Classrooms from '@/pages/Platform/Administration/Classrooms/Classrooms' // 课堂练习模式
import Examination from '@/pages/Platform/Administration/Examination/Examination' // 考试模式

Vue.use(Router)
export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/Entrance',
      name: 'Entrance',
      component: Entrance
    },{
      path: '/Platform',
      name: 'Platform',
      component: Platform,
      children:[{
        path: '/Administration',
        name: 'Administration',
        component: Administration,
        children:[{
          path: '/FreePractice',
          name: 'FreePractice',
          component: FreePractice
        },{
          path: '/Classrooms',
          name: 'Classrooms',
          component: Classrooms
        },{
          path: '/Examination',
          name: 'Examination',
          component: Examination
        }],
        redirect:'/FreePractice'
      },{
        path: '/ScoreQuery',
        name: 'ScoreQuery',
        component: ScoreQuery,
      },{
        path: '/Analysis',
        name: 'Analysis',
        component: Analysis
      },{
        path: '/AnswerData',
        name: 'AnswerData',
        component: AnswerData
      },{
        path: '/Question',
        name: 'Question',
        component: Question
      },{
        path: '/StudentList',
        name: 'StudentList',
        component: StudentList
      },{
        path: '/PaperDetails',
        name: 'PaperDetails',
        component: PaperDetails
      },{
        path: '/QuestionDetails',
        name: 'QuestionDetails',
        component: QuestionDetails
      }],
      redirect:'/Administration'
    }
  ]
})
