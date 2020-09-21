import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Q_http: 'http://192.168.113.88:8080/hospital-service/hospital/admin/',
    Y_http: 'http://192.168.113.88:8080/hospital-service/hospital/partner/', // 生产环境

    // Q_http: 'http://192.168.112.73:8080/hospital-service/hospital/admin/',
    // Y_http: 'http://192.168.112.73:8080/hospital-service/hospital/partner/', // 测试环境

    loginData: '', // 登录成功用户数据
    SelectSystem: '', // 用户选择的哪个系统
    SystemID: '', // 系统ID
    StudentListData: '', // 考试成绩查询跳转数据
    PaperDetails: '', // 考试成绩查询跳转数据详情页
    navList: [ // 二级导航
      {text:'自由练习模式',route:'/FreePractice_mode',class:'Choice',id:1},
      {text:'课堂练习模式',route:'/Classrooms_mode',class:'NoChoice',id:2},
      {text:'考试模式',route:'/Examination_mode',class:'NoChoice',id:3}
    ],
    tabList: [ // 一级导航
      {text:'课堂管理',route:'/Administration',class:'Choice',icon:'el-icon-s-home'},
      {text:'考试成绩查询',route:'/ScoreQuery',class:'NoChoice',icon:'el-icon-s-data'},
      {text:'试题分析',route:'/Analysis',class:'NoChoice',icon:'el-icon-s-flag'},
      {text:'学生答题数据',route:'/AnswerData',class:'NoChoice',icon:'el-icon-s-claim'},
      {text:'题库管理',route:'/Question',class:'NoChoice',icon:'el-icon-menu'},
      {text:'考试管理',route:'/Examination',class:'NoChoice',icon:'el-icon-s-help'},
    ]
  },
})
