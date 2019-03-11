<template>
    <div class="mineMusicList">
      <div class="header" ref="Hheader">
        <ul>
          <li class="header_left">
            <img src="../../static/images/back.svg" id = "header_l" @click="back()">
          </li>
          <li class="header_center">
            管理歌单
          </li>
        </ul>
      </div>
      <ul class="listClassify" ref="listClassify">
        <li v-for="(list,index) in mineSongList" class="clearfix">
          <div class="yj" ref="yj" @click="selectSong(index)">
            <div class="yd" ref="yd"></div>
          </div>
          <img src="../../static/images/test.jpg">
          <div>
            <span>{{list.listName}}</span><br>
            <span>{{list.songNum}}</span>
          </div>
        </li>
      </ul>
      <div class="mineMusicList_bottom" ref="mineMusicListBottom"></div>
      <div class="mineMusicListt_bottom" ref="mineMusicListtBottom">
        <img src="../../static/images/minedelete.svg">
        <br>
        <span>删除歌单</span>
      </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      mineSongList:[
        {
          listName:"歌单一",
          songNum:10,
        },
        {
          listName:"歌单二",
          songNum:10,
        },
        {
          listName:"歌单三",
          songNum:10,
        },
        {
          listName:"歌单四",
          songNum:10,
        },
        {
          listName:"歌单五",
          songNum:10,
        },
        {
          listName:"歌单六",
          songNum:10,
        },
        {
          listName:"歌单七",
          songNum:10,
        },
        {
          listName:"歌单八",
          songNum:10,
        },
        {
          listName:"歌单九",
          songNum:10,
        },
      ]
    }
  },
  methods: {
    back(){
      window.history.go(-1);
    },
    selectSong(i){
      if(this.$refs.yd[i].style.visibility=="visible"){
        this.$refs.yd[i].style.visibility = "hidden";
      }else{
        this.$refs.yd[i].style.visibility = "visible";
      }
    }
  },
  mounted:function () {
    this.$refs.listClassify.style.marginTop = this.$refs.Hheader.offsetHeight+"px";
    this.$refs.mineMusicListBottom.style.height = this.$refs.mineMusicListtBottom.offsetHeight+"px"
  }
}
</script>

<style scoped lang="stylus">
@import "../common/stylus/mineMusicList.styl"
</style>
