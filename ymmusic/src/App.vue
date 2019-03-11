<template>
  <div id="app">
      <router-view></router-view>
      <music-play></music-play>
  </div>
</template>

<script>
  import musicPlay from './components/base/musicPlay'
export default {
  name: 'App',
  components:{
    musicPlay
  },
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  },
  mounted:function () {
    this.$store.commit('pageRefresh')
  }
}
</script>

<style>

</style>
