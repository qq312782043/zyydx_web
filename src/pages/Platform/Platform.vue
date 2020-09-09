<template>
  <el-container>
    <el-header class="clear">
      <div class="left_box"></div>
      <div class="right_box">
        <span class="pattern">当前模式：{{title}}</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">{{loginData.user.phone}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="BackLogin()">退出账号</el-dropdown-item>
            <el-dropdown-item @click.native="dialogVisible = true">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="cursor: pointer" class="pattern" @click="Goback()">返回首页</span>
      </div>
    </el-header>
    <el-aside style="width:10%">
      <div @click="clickTabBar(i)" class="TabBarBox" :class="item.class" v-for="(item,i) in tabList" :key="i">
        <i :class="item.icon"></i><p>{{item.text}}</p>
      </div>
    </el-aside>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="40%" :close-on-press-escape="escape" :close-on-click-modal="escape">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="当前密码" prop="Pass">
          <el-input v-model="ruleForm.Pass" placeholder="请输入当前密码" size="small"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="NewPass">
          <el-input v-model="ruleForm.NewPass" placeholder="请输入新密码" size="small"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="CheckPass">
          <el-input v-model="ruleForm.CheckPass" placeholder="请再次输入新密码" size="small"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning"  @click="submitForm('ruleForm')">保 存</el-button>
      </span>
    </el-dialog>
    <router-view />
  </el-container>
</template>

<script>
export default {
  name: 'Platform',
  data () {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码!'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码!'))
      } else if (value.length <6 || value.length > 16) {
        callback(new Error('密码长度不正确，应为6-16位!'))
      } else {
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.NewPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      escape: false,
      title: '',
      tabList: this.$store.state.tabList,
      loginData: this.$store.state.loginData, // 用户数据
      ruleForm: {
        Pass: '',
        NewPass: '',
        CheckPass: '',
      },
      rules: {
        Pass: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        NewPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        CheckPass: [
          { validator: validatePass3, trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    let that = this
    that.appendData()
  },
  provide() {
    return{
      appendData: this.appendData,
    }
  },
  methods: {
    Goback(e) { // 返回首页
      let that = this
      that.$confirm('确定返回首页？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$store.state.tabList = [
          {text:'课堂练习',route:'/Administration',class:'Choice',icon:'el-icon-s-home'},
          {text:'考试成绩查询',route:'/ScoreQuery',class:'NoChoice',icon:'el-icon-s-data'},
          {text:'试题分析',route:'/Analysis',class:'NoChoice',icon:'el-icon-s-flag'},
          {text:'学生答题数据',route:'/AnswerData',class:'NoChoice',icon:'el-icon-s-claim'},
          {text:'题库管理',route:'/Question',class:'NoChoice',icon:'el-icon-menu'},
          {text:'考试管理',route:'/Examination',class:'NoChoice',icon:'el-icon-s-help'},
        ]
        that.$router.replace({path:'/Entrance'})
      }).catch(() => {})
    },
    appendData() { // 获取当前模式
      let that = this
      let navList = that.$store.state.navList
      that.tabList = that.$store.state.tabList
      for(var i = 0; i < navList.length; i++){
        if (navList[i].class == 'Choice') {
          that.title = navList[i].text
        }
      }
    },
    submitForm(formName) { // 提交修改密码
      let that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.$confirm('密码修改成功后将返回登录页面重新登录，确定修改？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.$axios({
              url: that.$store.state.Q_http + 'user/modifyPassWord',
              method: 'post',
              data: {
                userId: that.loginData.user.id,
                newPassword: that.ruleForm.NewPass,
                password: that.ruleForm.Pass,
              }
            }).then((res) =>{
              // console.log(res.data)
              if (res.data.data == '修改成功！') {
                that.$message({
                  message: '修改成功！',
                  type: 'success',
                  duration: '1000',
                  onClose: function () {
                    localStorage.removeItem('ruleForm')
                    that.$router.replace({path:'/'})
                  }
                })
              } else {
                that.$message.error(res.data.data.msg)
              }
            })
          }).catch(() => {})
        } else {
          return false
        }
      });
    },
    BackLogin(e) { // 返回登录页
      let that = this
      that.$confirm('确定退出账号？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$axios({
          url: that.$store.state.Q_http + 'user/loginOut',
          method: 'post',
          data: {
            userId: that.loginData.user.id
          }
        }).then((res) =>{
          if(res.data.code == 200){
            that.$router.replace({path:'/'})
          }
        })
      }).catch(() => {})
    },
    clickTabBar(e) { // 点击切换路由
      let that = this
      for(var i = 0; i < that.tabList.length; i++){
        that.tabList[i].class = 'NoChoice'
      }
      that.tabList[e].class = 'Choice'
      if (that.$route.path!==that.tabList[e].route) {
        if (that.$route.path=='/FreePractice_mode'||that.$route.path=='/Classrooms_mode'||that.$route.path=='/Examination_mode') {
          if (that.tabList[e].route!=='/Administration') {
            that.$router.replace({path:that.tabList[e].route})
          }
        } else {
          that.$router.replace({path:that.tabList[e].route})
        }
      }
      that.$store.state.tabList = that.tabList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-dropdown-menu__item{
  color:#BF8333;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  background:rgba(243, 222, 191, 0.4);
  color: #BF8333;
}
</style>
<style scoped>
.el-container {
  width:100%;
  height: calc(100vh);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.el-container .el-header{
  width:100%;
  height:60px;
  line-height:60px;
  box-sizing: border-box;
  background: #BF8333;
  padding:0 20px;
  position: absolute;
  top:0;
  left:0;
}
.el-container .el-header .left_box{
  width:160px;
  height:40px;
  box-sizing: border-box;
  background-image: url(../../assets/logo.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top:10px;
  float: left;
}
.el-container .el-header .right_box{
  float: right;
}
.el-container .el-header .right_box .pattern{
  color:#fff;
  font-size:14px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  margin:0 20px
}
.el-icon-arrow-down {
  font-size: 12px;
  color:#fff;
}
.el-container .el-aside{
  height:100%;
  height: calc(100vh - 60px);
  border-right:1px solid #DCDFE6;
  position: absolute;
  top:60px;
  left:0;
}
.el-menu-vertical-demo{
  border:none;
}
.el-container .el-aside .item{
  height:50px;
  line-height:50px;
  font-size:15px;
  color:#333;
  text-decoration:none;
}
.el-container .el-aside .item .el-button{
  border:none;
}
.el-container .whole{
  width: 90%;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding:15px;
  position: absolute;
  top:60px;
  left:10%;
  z-index:50;
}

/* 导航样式 */
.TabBarBox{
  padding:18px 10px 18px 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.TabBarBox p{
  font-size:14px;
  margin-left:5px;
}
.Choice{
  background:rgba(243, 222, 191, 0.4);
  color:#BF8333;
}
.NoChoice{
  background:#fff;
  color:#444;
}
</style>
