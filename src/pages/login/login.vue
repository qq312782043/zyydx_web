<template>
  <div class="whole">
    <div class="content">
      <h3 class="top">中医药大学实训中心</h3>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item prop="user">
          <el-input placeholder="请输入账号" v-model="ruleForm.user" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="ruleForm.password" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
        <el-button type="warning" @click="submitForm('ruleForm',ruleForm)">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'whole',
  data () {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不能为空!'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空!'))
      } else if (value.length <6 || value.length > 16) {
        callback(new Error('密码长度不正确，应为6-16位!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        user: '',
        password: '',
        checked: false
      },
      rules: {
        user: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    let that = this
    let ruleForm = JSON.parse(localStorage.getItem('ruleForm'))
    if (ruleForm) {
      if (ruleForm.user && ruleForm.password) {
        that.ruleForm.user = ruleForm.user
        that.ruleForm.password = ruleForm.password
        that.ruleForm.checked = ruleForm.checked
      }
    }
  },
  methods: {
    submitForm(formName,ruleForm) { // 登录
      let that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.$axios({
            url: that.$store.state.Q_http + 'user/login',
            method: 'post',
            data: {
              phone: ruleForm.user,
              password: ruleForm.password,
              type: 1
            }
          }).then((res) =>{
            // console.log(res.data.data)
            if (res.data.code == 200) {
              let message = res.data.data
              if (message.user) {
                if (ruleForm.checked == true) {
                  let ruleForm = {
                    user: that.ruleForm.user,
                    password: that.ruleForm.password,
                    checked: true
                  }
                  localStorage.setItem('ruleForm', JSON.stringify(ruleForm))
                } else {
                  localStorage.removeItem('ruleForm')
                }
                that.$store.state.loginData = message
                that.$router.replace({path:'/entrance'})
              } else {
                that.$message.error(message.msg)
              }
            } else {
              that.$message.error(res.data.message)
            }
          }).catch((err) =>{
            that.$message.error('请求失败!')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:#BF8333;
  border-color: #BF8333;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #BF8333;
}
.el-checkbox.is-bordered.is-checked{
  border-color: #BF8333;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:  #BF8333;
}
.el-checkbox__inner:hover{
  border-color:  #BF8333;
}
</style>
<style scoped>
.whole{
  width:100%;
  height: calc(100vh);
  box-sizing: border-box;
  background-image: url(../../assets/banner1.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display:flex;
  align-items: center;
  justify-content: center;
}
.whole .content{
  width:520px;
  height:500px;
  background-image: url(../../assets/box_background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  padding:50px 80px;
  box-sizing: border-box;
}
.whole .content .top{
  color:#BF8333;
  text-align: center;
  box-sizing: border-box;
  padding: 70px 0 50px;
}
.whole .content .el-input{
  margin-bottom:5px;
}
.whole .content .checkbox{
  margin-top:5px;
}
.whole .content .el-button{
  margin-top:20px;
  width:100%;
}
</style>
