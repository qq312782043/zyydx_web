import Vue from 'vue'
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
import Question from '@/pages/Platform/Question/Question' // 题库管理
import QuestionDetails from '@/pages/Platform/Question/QuestionDetails' // 题库管理>题库详情
import Examination from '@/pages/Platform/Examination/Examination' // 考试管理

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
          path: '/FreePractice_mode',
          name: 'FreePractice_mode',
          component: FreePractice_mode
        },{
          path: '/Classrooms_mode',
          name: 'Classrooms_mode',
          component: Classrooms_mode
        },{
          path: '/Examination_mode',
          name: 'Examination_mode',
          component: Examination_mode
        }],
        redirect:'/FreePractice_mode'
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
        path: '/Examination',
        name: 'Examination',
        component: Examination
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
