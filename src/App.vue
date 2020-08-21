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
#app{
  font-family: "Helvetica Neue";
}
</style>
