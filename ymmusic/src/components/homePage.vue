<template>
    <div class="homePage">
      <div class="logo-content">
        <img src="../../static/images/logo.svg">
      </div>
      <div class="proName">塌塌音乐</div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {

  },
  mounted:function () {
    let tim = setInterval(()=> {
      window.location.href = "/#/mainPage/showMusic";
      this.$store.commit('audioShow');
      console.log(this.$store.state.audioShow);
      clearInterval(tim);
    },3000);
  }
}
</script>

<style scoped lang="stylus">
  @import "../common/stylus/homePage.styl"
</style>
