<template>
    <div class="listTemplet">
      <div class="header" ref="Hheader">
        <ul>
          <li class="header_left">
            <img src="../../static/images/back.svg" id = "header_l" @click="back()">
          </li>
          <li class="header_center">
            {{clasify}}
          </li>
          <li class="header_right">
            <img src="../../static/images/search.svg" @click="search()">
          </li>
        </ul>
      </div>
      <img src="../../static/images/hotMusic_bg.jpg" class="hotMusicPage_bg">
      <div class="hotMusicPage_list" ref="hotMusicPageList">
        <div class="hotMusicPage_list_run" ref="hotMuRun">
          <img src="../../static/images/run.svg">
          <span>全部播放</span>
          <img src="../../static/images/musicselectList.svg" @click="toSelect()">
        </div>
        <ul class="songList" ref="this.$store.state.listUrl">
          <li v-for="(list,index) in this.$store.state.listUrl" class=" clearfix">
            <img v-lazy="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+list.data.albummid+'.jpg?max_age=2592000'" class="pic">
            <div>
              <span @click="listen(list)">{{list.data.songname}}</span>
              <span class="singerName">{{list.data.singer[0].name}}</span>
            </div>
            <img src="../../static/images/download_w.svg">
            <img src="../../static/images/add_w.svg">
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      clasify:0,
      song:[]
    }
  },
  methods: {
    back(){           //返回上一级
      window.history.go(-1);
    },
    search(){          //跳转到搜索页面
      window.location.href = "/#/searchPage"
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
    toSelect(){        //收藏
      window.location.href = "/#/selectSong"
    },
    getDataHot(){      //获取热门歌曲
      const url = "/cqq/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2019-02-21&topid=4&type=top&song_begin=0&song_num=100&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
      this.$axios.get(url).then(data => {
        this.$store.commit('getData',data.data.songlist)    //将请求到的数据区存入vuex
      })
    },
    getDataRandom(){
      const url = "/api/music/tencent/songList?key=579621905&id=5374436553";
      this.$axios.get(url).then(data => {
        this.song = data.data.data.songs;
      })
    },
    getHotMv(){
      const url = "/api/music/tencent/url?key=579621905&id=001fXNWa3t8EQQ&br=192";
      this.$axios.get(url).then(data => {
        console.log(data);
      })
    },
    getDataNewsong(){    //获取新歌
      const url = "/cqq/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2019-02-21&topid=27&type=top&song_begin=0&song_num=100&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
      this.$axios.get(url).then(data => {
        this.$store.commit('getData',data.data.songlist)   //将请求到的数据区存入vuex
      })
    },
    getDataOriginal(){      //获取原创歌曲
      const url = "/cqq/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2019_07&topid=52&type=top&song_begin=0&song_num=100&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
      this.$axios.get(url).then(data => {
        this.$store.commit('getData',data.data.songlist)    //将请求到的数据区存入vuex
      })
    },
    listen(list){          //点击歌曲名播放
      let src="/cqq/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=003lghpv0jfFXG&filename=C400"+list.data.songmid+".m4a&guid=126548448";
      this.$axios.get(src).then(data => {
        let s = this.time(list.data.interval)
        this.$store.commit('getPlayNow',
          {plyaNow:"http://ws.stream.qqmusic.qq.com/C400"+list.data.songmid+".m4a?fromtag=0&guid=126548448&vkey="+data.data.data.items[0].vkey,
           singer:list.data.singer[0].name,
            songName:list.data.songname,
            nowtime:s,
            musicSrc:list.data.albummid,
            totalT:list.data.interval,
           // seven:list.data.songmid,
            listIndex:this.$store.state.listData.length,
            collected:false})
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
    this.clasify = this.$route.params.clasify;
    window.addEventListener('scroll', this.pageScroll);
    if(this.clasify=="热门歌曲"){
      this.getDataHot();
    }else if(this.clasify=="随心听"){
      this.getDataRandom();
    }else if(this.clasify=="热门MV"){
      this.getHotMv();
    }else if(this.clasify=="新歌榜"){
      this.getDataNewsong();
    }else if(this.clasify=="原创榜"){
      this.getDataOriginal();
    }else{
      this.getAlbum();
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../common/stylus/listTemplet.styl"
</style>
