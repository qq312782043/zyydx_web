<template>
  <div class="SmallBox">
    <p>{{GetStatus}}</p>
  </div>
</template>

<script>
export default {
  name: 'SmallBox',
  data () {
    return {
      GetStatus: ''
    }
  },
  created() {
    let that = this
    that.$axios({
      url: that.$store.state.Q_http + 'user/getUser',
      headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': that.$store.state.loginData.user.requestToken },
      method: 'post',
      data: {
        userId: that.$store.state.loginData.user.id,
      }
    }).then((res) =>{
      // console.log(res.data.data.systemStatusList)
      if (res.data.code == 200) {
        let index = ''
        if (that.$store.state.SystemID == 1) {
          index = 0
        } else if (that.$store.state.SystemID == 2) {
          index = 1
        } else if (that.$store.state.SystemID == 3) {
          index = 2
        }
        if (res.data.data.systemStatusList[index].systemStatus == 0) {
          that.GetStatus = '该系统已关闭'
        } else {
          that.GetStatus = '当前为自由练习模式，学生可自由选题练习'
        }
      }
    }).catch((err) =>{
      that.$message.error('请求失败!')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SmallBox p{
  height:100%;
  color: #333;
  font-size:16px;
  letter-spacing:3px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
