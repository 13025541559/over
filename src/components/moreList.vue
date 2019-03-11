<template>
    <div class="listTemplet">
      <more-list-info :type="type"></more-list-info>
    </div>
</template>

<script>
  import moreListInfo from "../components/base/moreListInfo"
export default {
  name: '',
  data () {
    return {
      type:0,
    }
  },
  methods: {
  },
  components:{
    moreListInfo
  },
  mounted:function () {
    this.type = this.$route.params.type;
  }
}
</script>

<style scoped>

</style>
