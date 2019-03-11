<template>
    <div class="classify">
      <ul>
        <li @click="toList($event)">
          <img src="../../../static/images/classify2.svg">
          <br>
          <a>随心听</a>
        </li>
        <li @click="toHotSongList($event)">
          <img src="../../../static/images/classify1.svg">
          <br>
          <a>热门歌曲</a>
        </li>
        <li @click="toMVList($event)">
          <img src="../../../static/images/classify3.svg">
          <br>
          <a>热门MV</a>
        </li>
      </ul>
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
    toHotSongList(e){
      window.location.href="/#/listTemplet/"+e.currentTarget.children[2].innerHTML;
    },
    toMVList(e){
      window.location.href="/#/MVPage/"+e.currentTarget.children[2].innerHTML;
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../common/stylus/classyfi.styl"
</style>
