<template>
  <div class="FreePractice">
    <p>当前为自由练习模式，学生可自由选题练习</p>
  </div>
</template>

<script>
export default {
  name: 'FreePractice',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.FreePractice{
  width:100%;
  height:87%;
  box-sizing: border-box;
  border:1px solid #DCDFE6;
  margin-top:15px;
  padding:15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.FreePractice p{
  color: #333;
  font-size:16px;
  letter-spacing:3px;
  font-weight: bold;
}
</style>
