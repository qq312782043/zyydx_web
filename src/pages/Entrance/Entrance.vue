<template>
  <el-container>
    <el-header class="clear">
      <div class="left_box"></div>
      <div class="right_box">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">{{loginData.user.phone}} <i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="BackLogin()">退出账号</el-dropdown-item>
            <el-dropdown-item @click.native="dialogVisible = true">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <div class="mian_box">
        <div class="title">请选择使用的系统</div>
        <div class="content">
          <div class="btn_box">
            <div class="item" style="background:#923222">
              <h4>经典原文实训</h4><h6>原文实训</h6>
            </div>
            <div class="switch">
              <el-switch v-model="System_1" active-color="#13ce66" inactive-color="#ccc"></el-switch>
              <p @click="clickSwitch(ImplementData1)">12345</p>
            </div>
          </div>
          <div class="btn_box">
            <div class="item" style="background:#015AA7" @click="jumpPlatform('案例实训')">
              <h4>经典案例实训</h4><h6>案例实训</h6>
            </div>
            <div class="switch">
              <el-switch v-model="System_2" active-color="#13ce66" inactive-color="#ccc"></el-switch>
              <p @click="clickSwitch(ImplementData2)">12345</p>
            </div>
          </div>
          <div class="btn_box">
            <div class="item" style="background:#363680">
              <h4>经典案例实训问诊</h4><h6>问诊实训</h6>
            </div>
            <div class="switch">
              <el-switch v-model="System_3" active-color="#13ce66" inactive-color="#ccc"></el-switch>
              <p @click="clickSwitch(ImplementData3)">12345</p>
            </div>
          </div>
        </div>
        <div class="footer">关闭开关学生将无法使用该系统，不影响教师使用</div>
      </div>

    </el-main>
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
  </el-container>
</template>
<script>
export default {
  name: 'whole',
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
      loginData: this.$store.state.loginData, // 用户数据
      dialogVisible: false,
      escape: false,
      ImplementData1: '',
      ImplementData2: '',
      ImplementData3: '',
      System_1: true, // 原文系统状态
      System_2: true, // 案例系统状态
      System_3: true, // 问诊系统状态
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
    that.FnGetStatus1()
    that.FnGetStatus2()
    that.FnGetStatus3()
  },
  methods: {
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
    jumpPlatform(e) { // 跳转平台页面
      let that = this
      that.$router.replace({path:'/Platform'})
      that.$store.state.SelectSystem = e
    },
    clickSwitch(e) { // 开关
      let that = this
      console.log(e)
      if (e.systemStatus == 1) {
        if (e.examStatus == 1) {
          that.$confirm('有学生正在进行练习，是否关闭该系统？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.Fnimplement(e)
          }).catch(() => {})
        } else {
          that.Fnimplement(e)
        }
      } else {
        that.Fnimplement(e)
      }
    },

    // 执行函数
    FnGetStatus1() { // 获取原文系统状态
      let that = this
      that.$axios({
        url: that.$store.state.Q_http + 'common/reloadSystemStatus',
        method: 'post',
        data: {
          systemType: 1,
        }
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          that.ImplementData1 = res.data.data
          if (res.data.data.systemStatus == 1) {
            that.System_1 = true
          } else {
            that.System_1 = false
          }
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    FnGetStatus2() { // 获取案例系统状态
      let that = this
      that.$axios({
        url: that.$store.state.Q_http + 'common/reloadSystemStatus',
        method: 'post',
        data: {
          systemType: 2,
        }
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          that.ImplementData2 = res.data.data
          if (res.data.data.systemStatus == 1) {
            that.System_2 = true
          } else {
            that.System_2 = false
          }
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    FnGetStatus3() { // 获取问诊系统状态
      let that = this
      that.$axios({
        url: that.$store.state.Q_http + 'common/reloadSystemStatus',
        method: 'post',
        data: {
          systemType: 3,
        }
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          that.ImplementData3 = res.data.data
          if (res.data.data.systemStatus == 1) {
            that.System_3 = true
          } else {
            that.System_3 = false
          }
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    Fnimplement(e) {
      let that = this
      console.log({
          id: e.systemType,
          userId: that.loginData.user.id,
          systemStatus: e.systemStatus
        })

      that.$axios({
        url: that.$store.state.Q_http + 'common/modifySytemStatus',
        method: 'post',
        data: {
          id: e.systemType,
          userId: that.loginData.user.id,
          systemStatus: e.systemStatus==0?1:0
        }
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.code == 200) {
          if (e.systemType == 1) {
            that.FnGetStatus1()
          } else if (e.systemType == 2) {
            that.FnGetStatus2()
          } else {
            that.FnGetStatus3()
          }
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
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
.el-container{
  width:100%;
  height: calc(100vh);
  box-sizing: border-box;
  background-image: url(../../assets/banner2.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.el-header{
  width:100%;
  height:60px;
  line-height:60px;
  box-sizing: border-box;
  background: #BF8333;
  padding:0 40px 0 20px;
}
.el-header .left_box{
  width:160px;
  height:40px;
  box-sizing: border-box;
  background-image: url(../../assets/logo.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top:10px;
  float: left;
}
.el-header .right_box{
  float: right;
}
.el-header .el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-header .el-icon-arrow-down {
  font-size: 12px;
  color:#fff;
}
.el-main{
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mian_box{
  width:80%;
}
.el-main .title{
  font-size:20px;
  font-weight: bold;
  color: #333;
  text-align: center;
}
.el-main .content{
  display: flex;
  justify-content: space-around;
  margin:70px auto 0;
  padding:0 100px;
}
.el-main .content .btn_box{
  width:200px;
}
.el-main .content .btn_box .item{
  text-align: center;
  color:#F5F5F5;
  padding:30px 0;
  border-radius:8px;
  cursor: pointer;
}
.el-main .content .btn_box .switch{
  margin-top:30px;
  display: flex;
  justify-content: center;
  position: relative;
}
.el-main .content .btn_box .switch p{
  background:red;
  position: absolute;
  opacity:0;
  cursor: pointer;
}
.el-main .content .btn_box .item h6{
  margin-top:10px;
}
.footer{
  width:100%;
  text-align: center;
  color:#FD952E;
  font-size:12px;
  margin-top:50px;
}
.el-form{
  width:400px;
  margin:0 auto;
}
</style>
