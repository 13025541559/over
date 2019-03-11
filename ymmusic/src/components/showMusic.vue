<template>
    <div class="showMusic">
      <banner :bannerImg="bannerImg"></banner>
      <classify></classify>
      <list-show></list-show>
    </div>
</template>

<script>
import banner from "./base/banner"
import classify from "./base/classify"
import listShow from "./base/listShow"
export default {
  name: '',
  data () {
    return {
      bannerImg:[
        {
          "bannerimgSrc":"../../../static/images/banner1.jpg",
        },
        {
          "bannerimgSrc":"../../../static/images/banner2.jpg",
        },
        {
          "bannerimgSrc":"../../../static/images/banner3.jpg",
        },
        {
          "bannerimgSrc":"../../../static/images/banner4.jpg",
        },
        {
          "bannerimgSrc":"../../../static/images/banner5.jpg",
        }
      ]
    }
  },
  methods: {
  },
  components:{
    banner,
    classify,
    listShow
  }
}
</script>

<style scoped>

</style>
