<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
.clear::after{
  display: block;
  clear: both;
  content: '';
}
body,html{
  width:100%;
  height:100%;
}
#app {
  width:100%;
  height:100%;
  box-sizing: border-box;
  font-family: "Helvetica Neue";
}
</style>
