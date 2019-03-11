<template>
    <div class="singerInfo">
      <singer-detail></singer-detail>
    </div>
</template>

<script>
  import singerDetail from "../components/base/singerDetail"
    export default {
      name: "singerInfo",
      data(){
        return{
          singerId:0
        }
      },
      components:{
        singerDetail
      },
      mounted:function () {
      }
    }
</script>

<style scoped>

</style>
