<template>
    <div class="albumInfo">
      <div class="moreHeader" ref="moreHeader">
        <ul class="header_t">
          <li class="header_left">
            <img src="../../../static/images/back.svg" id = "header_l" @click="back()">
          </li>
          <li class="header_center">
            专辑推荐
          </li>
          <li class="header_right">
            <img src="../../../static/images/search.svg" @click="search()">
          </li>
        </ul>
      </div>
      <ul class="albumList" ref="albumList">
        <li v-for="(list,index) in album" @click="albumInfo(list)">
          <img v-lazy="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+list.album_mid+'.jpg?max_age=2592000'">
          <span class="out">
          <span @click="albumDetail(list)">{{list.album_name}}</span>
          <span>{{list.singers[0].singer_name}}</span>
          <span>发行时间：{{list.public_time}}</span>
        </span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "MVList",
      data(){
        return{
          album:[]
        }
      },
      methods:{
        back() {
          window.history.go(-1);
        },
        search() {
          window.location.href = "/#/searchPage"
        },
        getAlbumData(){
          const url = "/uqq/cgi-bin/musicu.fcg?-=getUCGI6724128661028361&g_tk=791647972&loginUin=525824229&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22albumlib%22%3A%7B%22method%22%3A%22get_album_by_tags%22%2C%22param%22%3A%7B%22area%22%3A1%2C%22company%22%3A-1%2C%22genre%22%3A-1%2C%22type%22%3A-1%2C%22year%22%3A-1%2C%22sort%22%3A5%2C%22get_tags%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A99%2C%22click_albumid%22%3A0%7D%2C%22module%22%3A%22music.web_album_library%22%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D";
          this.$axios.get(url).then(data => {
            this.album = data.data.albumlib.data.list;
            console.log(data.data.albumlib.data.list);
          })
        },
        albumInfo(list){
          this.$store.commit('getAlbum',{one:list.album_mid,two:list.album_name,three:list.public_time});
          window.location.href = "/#/albumShow"
        }
      },
      mounted:function () {
        this.$refs.albumList.style.marginTop = this.$refs.moreHeader.offsetHeight+"px";
          this.getAlbumData()
      }
    }
</script>

<style scoped lang="stylus">
@import "../../common/stylus/albumInfo.styl"
</style>
