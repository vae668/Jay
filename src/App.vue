<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
/* .el-table {
            height: calc(100vh - 280px);//固定高度
            overflow-y: auto;//设置滚动
            scrollbar-color: transparent transparent;//兼容火狐
            &.el-table--scrollable-y ::-webkit-scrollbar {
              display: none !important; //隐藏滚动条
            }
} */
</style>
