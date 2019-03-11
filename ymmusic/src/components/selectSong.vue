<template>
    <div class="selectSong">
      <div class="header" ref="header">
        <ul>
          <li class="header_left">
            <img src="../../static/images/back.svg" id = "header_l" @click="back()">
          </li>
          <li class="header_center" style="text-align: center">
            已选择{{this.s}}首歌曲
          </li>
          <li class="header_right" @click="selectAll()">
            全选
          </li>
        </ul>
      </div>
      <ul class="selectSong_list" ref="selectSongList">
        <li v-for="(list,index) in this.$store.state.listUrl" class="clearfix">
          <div class="yj" ref="yj" @click="selectSong(index)">
            <div class="yd" ref="yd"></div>
          </div>
          <div class="songInfo">
            <span>{{list.data.songname}}</span>
            <br>
            <span>{{list.data.singer[0].name}}</span>
          </div>
        </li>
      </ul>
      <div class="select_bottom" ref="selectBottom"></div>
      <div class="selectSong_bottom" ref="selectSongBottom">
        <img src="../../static/images/addSelect.svg">
        <br>
        <span>添加到歌单</span>
      </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isShow:false,
      s:0,
    }
  },
  methods: {
    back(){
      window.history.go(-1);
    },
    selectSong(i){
      if(this.$refs.yd[i].style.visibility=="visible"){
        this.$refs.yd[i].style.visibility = "hidden";
        this.s--;
      }else{
        this.$refs.yd[i].style.visibility = "visible";
        this.s++;
      }
    },
    selectAll(){
      if(this.s!=this.$refs.yj.length){
        for(var q=0;q<this.$refs.yj.length;q++){
          this.$refs.yd[q].style.visibility = "visible";
        }
        this.s=this.$refs.yj.length;
      }else if(this.s==this.$refs.yj.length){
        for(var w=0;w<this.$refs.yj.length;w++) {
          this.$refs.yd[w].style.visibility = "hidden"
        }
        this.s=0;
      }
    }
  },
  mounted:function () {
    this.$refs.selectSongList.style.marginTop = this.$refs.header.offsetHeight+"px";
    this.$refs.selectBottom.style.height = this.$refs.selectSongBottom.offsetHeight+"px";
  }
}
</script>

<style scoped lang="stylus">
@import "../common/stylus/selectSong.styl"
</style>
