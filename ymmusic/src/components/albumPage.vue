<template>
    <div class="albumPage">
      <album-info></album-info>
    </div>
</template>

<script>
  import albumInfo from '../components/base/albumInfo'
    export default {
      name: "albumPage",
      components:{
        albumInfo,
      }
    }
</script>

<style scoped>

</style>
