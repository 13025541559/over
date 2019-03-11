<template>
    <div class="albumResult">
      <ul class="albumList" ref="albumList">
        <li v-for="(list,index) in albumList" @click="albumInfo(list)">
          <img v-lazy="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+list.albumMID+'.jpg?max_age=2592000'">
          <span class="out">
          <span>{{list.albumName}}</span>
          <span>{{list.singerName}}</span>
          <span>发行时间：{{list.publicTime}}</span>
        </span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "albumResult",
      data(){
        return{
          albumList:[]
        }
      },
      methods:{
        getAlbumList(){
          this.$axios.get(this.$store.state.serchAlbum).then(data => {
            this.albumList = data.data.data.album.list
          })
        },
        albumInfo(list){
          console.log(list);
          this.$store.commit('getAlbum',{one:list.albumMID,two:list.albumName,three:list.publicTime});
          window.location.href = "/#/albumShow"
        }
      },
      mounted:function () {
        this.getAlbumList()
      }
    }
</script>

<style scoped lang="stylus">
@import "../../../common/stylus/albumResult.styl"
</style>
