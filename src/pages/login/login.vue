<template>
  <div class="whole">
    <div class="content clear">
      <div class="right_box">
        <h2>欢迎使用</h2>
        <h4>中医药大学实训平台</h4>
      </div>
      <div class="left_box">
        <h2 class="top">登录</h2>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item prop="user">
            <el-input class="input" placeholder="请输入账号" v-model="ruleForm.user" prefix-icon="el-icon-user" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="password" placeholder="请输入密码" v-model="ruleForm.password" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>
          <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
          <el-button class="button" type="primary" @click="submitForm('ruleForm',ruleForm)">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    return {
      ruleForm: {
        user: '',
        password: '',
        checked: false
      },
      rules: {
        user: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    let that = this
    var ruleForm = JSON.parse(localStorage.getItem('ruleForm'))
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
          if(ruleForm.checked == true){
            let ruleForm = {
              user: that.ruleForm.user,
              password: that.ruleForm.password,
              checked: true
            }
            localStorage.setItem('ruleForm', JSON.stringify(ruleForm))
          } else {
            localStorage.removeItem('ruleForm')
          }
          that.$router.replace({path:'/entrance'})
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whole{
  width:100%;
  height:100%;
  box-sizing: border-box;
  background-image: url(../../assets/background.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display:flex;
  align-items: center;
  justify-content: center;
}
.whole .content{
  width:780px;
  height:420px;
  background:#2E79BA;
  border-radius:10px;
  overflow: hidden;
}
.whole .content .right_box{
  width:60%;
  height:100%;
  float: left;
  color: #fff;
  box-sizing: border-box;
  padding: 30px;
}
.whole .content .right_box h4{
  margin-top:10px;
}
.whole .content .left_box{
  width:40%;
  height:100%;
  background: #fff;
  border-radius:10px;
  float: right;
  box-sizing: border-box;
  padding:0 30px;
}
.whole .content .left_box .top{
  color:#333;
  text-align: center;
  box-sizing: border-box;
  padding: 70px 0 50px;
}
.whole .content .left_box .password{
  margin-top:5px;
}
.whole .content .left_box .checkbox{
  margin-top:5px;
}
.whole .content .left_box .button{
  margin-top:20px;
  width:100%;
}
</style>
