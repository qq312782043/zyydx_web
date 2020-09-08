import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Q_http: 'https://visit-api.tamiyun.com/',
    Q_http: 'http://192.168.112.83:8383/hospital-service/hospital/admin/',
    Y_http: 'http://192.168.112.83:8383/hospital-service/hospital/partner/',
    loginData: '', // 登录成功用户数据
    SelectSystem: '', // 用户选择的哪个系统
    navList: [ // 二级导航
      {text:'自由练习模式',route:'/FreePractice_mode',class:'Choice'},
      {text:'课堂练习模式',route:'/Classrooms_mode',class:'NoChoice'},
      {text:'考试模式',route:'/Examination_mode',class:'NoChoice'}
    ],
    tabList: [ // 一级导航
      {text:'课堂练习',route:'/Administration',class:'Choice',icon:'el-icon-s-home'},
      {text:'考试成绩查询',route:'/ScoreQuery',class:'NoChoice',icon:'el-icon-s-data'},
      {text:'试题分析',route:'/Analysis',class:'NoChoice',icon:'el-icon-s-flag'},
      {text:'学生答题数据',route:'/AnswerData',class:'NoChoice',icon:'el-icon-s-claim'},
      {text:'题库管理',route:'/Question',class:'NoChoice',icon:'el-icon-menu'},
      {text:'考试管理',route:'/Examination',class:'NoChoice',icon:'el-icon-s-help'},
    ]
  },
})
