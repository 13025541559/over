<template>
    <div class="songResult">
      <ul class="songList" ref="songlist" >
        <li v-for="(list,index) in this.SongList" class=" clearfix">
          <div>
            <span @click="listen(list)">{{list.songname}}/{{list.singer[0].name}}</span>
            <span class="singerName">{{list.albumname}}</span>
          </div>
          <img src="../../../../static/images/download_w.svg">
          <img src="../../../../static/images/add_w.svg">
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "songResult",
      data(){
        return{
          SongList:[]
        }
      },
      methods:{
        getSongList(){
          this.$axios.get(this.$store.state.serchSong).then(data => {
            let a = data.data.substring(9,data.data.length-1);   //截取字符串
            this.SongList = JSON.parse(a).data.song.list
          })
        },
        listen(list) {          //点击歌曲名播放
          let src = "/cqq/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=003lghpv0jfFXG&filename=C400" + list.songmid + ".m4a&guid=126548448"
          this.$axios.get(src).then(data => {
            console.log(list);
            let s = this.time(list.interval);
            this.$store.commit('getPlayNow',
              {
                plyaNow: "http://ws.stream.qqmusic.qq.com/C400" + list.songmid + ".m4a?fromtag=0&guid=126548448&vkey=" + data.data.data.items[0].vkey,
                singer: list.singer[0].name,
                songName: list.songname,
                nowtime: s,
                musicSrc: list.albummid,
                totalT: list.interval,
                listIndex:this.$store.state.listData.length,
                collected:false});
            this.$store.commit('listAdd', list);
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
      mounted:function(){
        // console.log(this.$route.params);
        this.getSongList();
      }
    }
</script>

<style scoped lang="stylus">
  @import "../../../common/stylus/songResult.styl"
</style>
