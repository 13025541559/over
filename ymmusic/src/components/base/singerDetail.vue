<template>
    <div class="singerDetail">
      <div class="header" ref="Hheader">
        <ul>
          <li class="header_left">
            <img src="../../../static/images/back.svg" id = "header_l" @click="back()">
          </li>
          <li class="header_center">
            歌手详情
          </li>
          <li class="header_right">
            <img src="../../../static/images/search.svg" @click="search()">
          </li>
        </ul>
      </div>
      <div class="singerInfo" ref="singerInfo">
        <img v-bind:src="this.$store.state.selectSingerPic" class="hotMusicPage_bg">
        <span class="singerDName">{{this.singerName}}</span>
      </div>
      <div class="hotMusicPage_list" ref="hotMusicPageList">
        <div class="hotMusicPage_list_run" ref="hotMuRun">
          <img src="../../../static/images/run.svg">
          <span>全部播放</span>
          <img src="../../../static/images/musicselectList.svg" @click="toSelect()">
        </div>
        <ul class="songList" ref="songList">
          <li v-for="(list,index) in singer" class=" clearfix">
            <img v-lazy="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+list.musicData.albummid+'.jpg?max_age=2592000'" class="pic">
            <div>
              <span @click="listen(list)">{{list.musicData.songname}}</span>
              <span class="singerName">{{list.musicData.albumname}}</span>
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
      name: "singerDetail",
      data(){
        return{
          singer:[],
          singerName:'',
          singerMid:''
        }
      },
      methods:{
        back(){
          window.history.go(-1);
        },
        selectSong(i){
          if(this.$refs.yd[i].style.visibility==="visible"){
            this.$refs.yd[i].style.visibility = "hidden";
            this.s--;
          }else{
            this.$refs.yd[i].style.visibility = "visible";
            this.s++;
          }
        },
        getSingerD(){
          const url = "/cqq/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&ct=24&singermid="+this.$store.state.selectSingerId+"&order=listen&begin=0&num=30&songstatus=1"
          this.$axios.get(url).then(data => {
            console.log(data);
            this.singer = data.data.data.list;
            this.singerName = data.data.data.singer_name;
            // this.singerMid = "y.gtimg.cn/music/photo_new/T001R300x300M000"+data.data.data.singer_mid+".jpg?max_age=2592000";
          })
        },
        pageScroll(){       //滚动到一定距离固定
          if(Math.round(window.scrollY) >= (this.$refs.hotMusicPageList.offsetTop-this.$refs.Hheader.offsetHeight)){
            this.$refs.hotMuRun.style.position = "fixed";
            this.$refs.hotMusicPageList.style.top -= this.$refs.hotMuRun.offsetHeight;
            this.$refs.hotMuRun.style.top = this.$refs.Hheader.offsetHeight+"px";
            this.$refs.songList.style.marginTop = this.$refs.hotMuRun.offsetHeight+"px";
          }else if(Math.round(window.scrollY) < (this.$refs.hotMusicPageList.offsetTop-this.$refs.Hheader.offsetHeight-this.$refs.hotMuRun.offsetHeight)){
            this.$refs.hotMuRun.style.position = "initial";
            this.$refs.songList.style.marginTop = 0+"px"
            this.$refs.hotMuRun.style.top = 0+"px";
          }
        },
        listen(list){          //点击歌曲名播放
          let src="/cqq/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=003lghpv0jfFXG&filename=C400"+list.musicData.songmid+".m4a&guid=126548448"
          this.$axios.get(src).then(data => {
            let s = this.time(list.musicData.interval);
            this.$store.commit('getPlayNow',
              {one:"http://ws.stream.qqmusic.qq.com/C400"+list.musicData.songmid+".m4a?fromtag=0&guid=126548448&vkey="+data.data.data.items[0].vkey,
                two:list.musicData.singer[0].name,
                three:list.musicData.songname,
                four:s,
                five:list.musicData.albummid,
                six:list.musicData.interval,
                seven:list.musicData.songmid});
            this.$store.commit('listAdd',list.musicData);
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
        window.addEventListener('scroll', this.pageScroll);
        this.$refs.singerInfo.style.marginTop = this.$refs.Hheader.offsetHeight+"px";
        this.getSingerD();
      }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/singerDetail.styl"
</style>
