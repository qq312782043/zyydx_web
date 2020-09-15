<template>
  <div class="whole">
    <div class="header">
      <p class="title">请选择以下模式来控制学生电脑</p>
      <div class="tabBar">
        <div v-for="(item,i) in navList" :key="i">
          <p :class="item.class" @click="clickTabBar(i,item)">开启{{item.text}}</p>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'whole',
  inject:['appendData'],
  data () {
    return {
      SelectSystem: this.$store.state.SelectSystem, // 当前选择哪个平台
      navList: ''
    }
  },
  provide() {
    return{
      FnParent: this.FnParent,
      FnGetStatus: this.FnGetStatus,
    }
  },
  created() {
    let that = this
    that.navList = that.$store.state.navList
    that.FnGetStatus()
  },
  methods: {
    clickTabBar(e,item) { // 点击切换
      let that = this
      if (item.class == 'Close') {
        return
      } else {
        if (that.$route.path!==that.navList[e].route) {
          if (that.$route.path == '/FreePractice_mode' || that.$route.path == '/Classrooms_mode') {
            that.$confirm('有学生正在练习，是否切换到其他模式？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.Fnimplement(e,item.id)
            }).catch(() => {})
          } else {
            that.Fnimplement(e,item.id)
          }
        }
      }
    },

    // 执行函数
    FnGetStatus() { // 获取系统状态
      let that = this
      that.$axios({
        url: that.$store.state.Q_http + 'user/getUser',
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': that.$store.state.loginData.user.requestToken },
        method: 'post',
        data: {
          userId: that.$store.state.loginData.user.id,
        }
      }).then((res) =>{
        if (res.data.code == 200) {
          let index = ''
          if (that.$store.state.SystemID == 1) {
            index = 0
          } else if (that.$store.state.SystemID == 2) {
            index = 1
          } else if (that.$store.state.SystemID == 3) {
            index = 2
          }
          // console.log(res.data.data.systemStatusList[index])
          if (res.data.data.systemStatusList[index].systemStatus == 0) {
            that.navList = [
              {text:'自由练习模式',route:'/FreePractice_mode',class:'Close',id:1},
              {text:'课堂练习模式',route:'/Classrooms_mode',class:'Close',id:2},
              {text:'考试模式',route:'/Examination_mode',class:'Close',id:3}
            ]
            that.$router.replace({path:'/FreePractice_mode'})
            that.$store.state.navList = that.navList
          } else {
            if (res.data.data.systemStatusList[index].patternType == 1) {
              that.navList = [
                {text:'自由练习模式',route:'/FreePractice_mode',class:'Choice',id:1},
                {text:'课堂练习模式',route:'/Classrooms_mode',class:'NoChoice',id:2},
                {text:'考试模式',route:'/Examination_mode',class:'NoChoice',id:3}
              ]
              that.$router.replace({path:'/FreePractice_mode'})
              that.$store.state.navList = that.navList
            } else if (res.data.data.systemStatusList[index].patternType == 2) {
              that.navList = [
                {text:'自由练习模式',route:'/FreePractice_mode',class:'NoChoice',id:1},
                {text:'课堂练习模式',route:'/Classrooms_mode',class:'Choice',id:2},
                {text:'考试模式',route:'/Examination_mode',class:'NoChoice',id:3}
              ]
              that.$router.replace({path:'/Classrooms_mode'})
              that.$store.state.navList = that.navList
            } else if (res.data.data.systemStatusList[index].patternType == 3)  {
              that.navList = [
                {text:'自由练习模式',route:'/FreePractice_mode',class:'NoChoice',id:1},
                {text:'课堂练习模式',route:'/Classrooms_mode',class:'NoChoice',id:2},
                {text:'考试模式',route:'/Examination_mode',class:'Choice',id:3}
              ]
              that.$router.replace({path:'/Examination_mode'})
              that.$store.state.navList = that.navList
            }
          }
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    Fnimplement(e,id) {
      let that = this
      that.$axios({
        url: that.$store.state.Q_http + 'common/modifyPatternType',
        method: 'post',
        data: {
          id: that.$store.state.SystemID,
          userId: that.$store.state.loginData.user.id,
          patternType: id,
        }
      }).then((res) =>{
        // console.log(res.data)
        if (res.data.data.errorCode == 10006) {
          that.$alert('当前有正在进行的考试，请先收卷再切换模式', '提示', {
            confirmButtonText: '确定',
            callback: action => {return}
          })
        } else if (res.data.data.errorCode == 10007) {
          for(var i = 0; i < that.navList.length; i++){
            that.navList[i].class = 'NoChoice'
          }
          that.navList[e].class = 'Choice'
          that.$router.replace({path:that.navList[e].route})
          that.appendData()
        } else {
          that.$message({
            type: 'success',
            message: res.data.data,
            duration: 1000
          })
          for(var i = 0; i < that.navList.length; i++){
            that.navList[i].class = 'NoChoice'
          }
          that.navList[e].class = 'Choice'
          that.$router.replace({path:that.navList[e].route})
          that.appendData()
        }
      }).catch((err) =>{
        that.$message.error('请求失败!')
      })
    },
    FnParent() { // 父级方法
      this.appendData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  color: #333;
  font-size:13px;
}
.header .tabBar{
  display: flex;
  justify-content: space-between;
  margin-top:15px;
}
.header .tabBar div{
  cursor:pointer;
}
.SmallBox{
  width:100%;
  height: calc(100vh - 180px);
  box-sizing: border-box;
  border:1px solid #DCDFE6;
  margin-top:15px;
  padding:15px;
}
.NoChoice{
  width:300px;
  padding:10px 0;
  text-align: center;
  box-sizing: border-box;
  font-size:15px;
  border:1px solid #BF8333;
  color: #BF8333;
  background:#fff;
  border-radius:4px;
}
.Choice{
  width:300px;
  padding:10px 0;
  text-align: center;
  box-sizing: border-box;
  font-size:15px;
  border:1px solid #BF8333;
  color: #fff;
  background:#BF8333;
  border-radius:4px;
}
.Close{
  width:300px;
  padding:10px 0;
  text-align: center;
  box-sizing: border-box;
  font-size:15px;
  border:1px solid #ccc;
  color: #666;
  background:#f5f5f5;
  border-radius:4px;
}
</style>
