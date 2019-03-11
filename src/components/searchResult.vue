<template>
    <div class="searchResult">
      <div class="moreHeader" ref="moreHeader">
        <ul class="header_t">
          <li class="header_left">
            <img src="../../static/images/back.svg" id = "header_l" @click="back()">
          </li>
          <li class="header_center">
            搜索结果
          </li>
        </ul>
      </div>
      <ul class="searchClasify">
        <li @click="linkToSong()">歌曲</li>
        <li @click="linkToSinge()">MV</li>
        <li @click="linkToAlbum()">专辑</li>
      </ul>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
      name: "searchResult",
      methods: {
        back() {
          window.history.go(-1);
        },
        linkToSong(){
          window.location.href = "/#/searchResult/songResult"
        },
        linkToSinge(){
          window.location.href = "/#/searchResult/MVResult"
        },
        linkToAlbum(){
          window.location.href = "/#/searchResult/albumResult"
        },
      }
    }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/searchResult.styl"
</style>
