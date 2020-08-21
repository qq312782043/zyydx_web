<template>
  <div class="SmallBox">
    <p>当前为自由练习模式，学生可自由选题练习</p>
  </div>
</template>

<script>
export default {
  name: 'SmallBox',
  data () {
    return {

    }
  },
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
