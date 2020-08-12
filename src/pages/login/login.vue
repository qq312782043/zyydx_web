<template>
  <div class="whole">
    <div class="content clear">
      <div class="right_box">
        <h2>欢迎使用</h2>
        <h4>中医药大学实训平台</h4>
      </div>
      <div class="left_box">
        <h2 class="top">登录</h2>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="account">
            <el-input class="input" placeholder="请输入账号" v-model="form.account" prefix-icon="el-icon-user" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="password" placeholder="请输入密码" v-model="form.password" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>
          <el-checkbox-group class="checkbox" v-model="form.type">
            <el-checkbox label="记住密码" name="type"></el-checkbox>
          </el-checkbox-group>
          <el-button class="button" type="primary" @click="onSubmit(form)">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'whole',
  data () {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      } else {
        alert('wawo')
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'));
      }
    };
    return {
      form: {
        account: '',
        password: '',
        type: [],
      },
      rules: {
        account: [
          { validator: checkUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(e) {
      this.$router.replace({path:'/entrance'})
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
