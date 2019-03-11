<template>
  <div class="moreOther">
    <m-v-list :n="n"></m-v-list>
  </div>
</template>

<script>
  import MVList from "./base/MVList"
    export default {
      name: "moreMV",
      data(){
        return{
          n:0
        }
      },
      components:{
        MVList
      },
      mounted:function () {
        this.n = this.$route.params.n;
      }
    }
</script>

<style scoped lang="stylus">

</style>
