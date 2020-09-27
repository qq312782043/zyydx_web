<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
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
.el-input.is-active .el-input__inner, .el-input__inner:focus {
  border-color: #BF8333;
  outline: 0;
}
.el-textarea__inner:focus {
  outline: 0;
  border-color: #BF8333;
}
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
.el-dropdown-menu__item{
  color:#BF8333;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  background:rgba(243, 222, 191, 0.4);
  color: #BF8333;
}
.el-table .ascending .sort-caret.ascending {
  border-bottom-color: #BF8333;
}
.el-table .descending .sort-caret.descending {
  border-top-color: #BF8333;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  color: #BF8333;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
  color: #BF8333;
}
.el-dialog__headerbtn .el-dialog__close:hover{
  color: #BF8333;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #BF8333;
}
.el-pager li.active {
  color: #BF8333;
}
.el-pager li:hover {
  color: #BF8333;
}
.el-select-dropdown__item.selected {
  color: #BF8333;
}
.el-select .el-input__inner:focus {
  border-color: #BF8333;
}
.el-pagination__sizes .el-input .el-input__inner:hover {
  border-color: #BF8333;
}
.el-input-number__decrease:hover, .el-input-number__increase:hover {
  color: #BF8333;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #BF8333;
}
</style>
