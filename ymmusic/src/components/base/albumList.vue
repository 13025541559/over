<template>
  <div class="albumList">
    <div class="header" ref="Hheader">
      <ul>
        <li class="header_left">
          <img src="../../../static/images/back.svg" id = "header_l" @click="back()">
        </li>
        <li class="header_center">
          专辑详情
        </li>
        <li class="header_right">
          <img src="../../../static/images/search.svg" @click="search()">
        </li>
      </ul>
    </div>
    <div class="albumInfo" ref="albumInfo">
      <img class="albumPic" v-bind:src="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+this.$store.state.selectAlbumMid+'.jpg?max_age=2592000'">
      <span class="albumName">{{this.$store.state.selectAlbumName}}</span>
      <span class="time">{{this.$store.state.selectAlbumTime}}</span>
    </div>
    <div class="hotMusicPage_list" ref="hotMusicPageList">
      <div class="hotMusicPage_list_run" ref="hotMuRun">
        <img src="../../../static/images/run.svg">
        <span>全部播放</span>
        <img src="../../../static/images/musicselectList.svg" @click="toSelect()">
      </div>
      <ul class="songList" ref="songList">
        <li v-for="(list,index) in albumList" class=" clearfix">
          <img v-lazy="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+list.albummid+'.jpg?max_age=2592000'" class="pic">
          <div>
            <span @click="listen(list)">{{list.songname}}</span>
            <span class="singerName">{{list.albumname}}</span>
          </div>
          <img src="../../../static/images/download_w.svg">
          <img src="../../../static/images/add_w.svg">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: "albumList",
      data(){
        return{
          albumList:[]
        }
      },
      methods:{
        back(){
          window.history.go(-1);
        },
        getAlbumList(){
          let src = "/cqq/v8/fcg-bin/fcg_v8_album_info_cp.fcg?ct=24&albummid="+this.$store.state.selectAlbumMid+"&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0"
          this.$axios.get(src).then(data=>{
            this.albumList = data.data.data.list
          })
        },
        listen(list){          //点击歌曲名播放
          let src="/cqq/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=003lghpv0jfFXG&filename=C400"+list.songmid+".m4a&guid=126548448";
          this.$axios.get(src).then(data => {
            let s = this.time(list.interval)
            this.$store.commit('getPlayNow',
              {plyaNow:"http://ws.stream.qqmusic.qq.com/C400"+list.songmid+".m4a?fromtag=0&guid=126548448&vkey="+data.data.data.items[0].vkey,
                singer:list.singer[0].name,
                songName:list.songname,
                nowtime:s,
                musicSrc:list.albummid,
                totalT:list.interval,
                listIndex:this.$store.state.listData.length,
                collected:false});
          });
          this.$store.commit('replay');
          this.$store.commit('timeRun');
          this.$store.state.isautoplay = true;
        },
        time(t){         //将s为单位的数转换为xx:xx格式
          let m = parseInt(t/60);
          let s = parseInt(t%60);
          if(m<10){
            m = "0"+m;
          }
          if(s<10){
            s = "0"+s;
          }
          return m.toString()+":"+s.toString()
        }
      },
      mounted:function () {
        this.$refs.albumInfo.style.marginTop = this.$refs.Hheader.offsetHeight+"px";
        this.getAlbumList();
      }
    }
</script>

<style scoped lang="stylus">
@import "../../common/stylus/albumList.styl"
</style>
