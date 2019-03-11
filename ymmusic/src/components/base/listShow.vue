<template>
    <div class="listShow">
      <div class="list">
        <div class="list-hot-header clearfix">
          <span class="list-hot-title">人气歌手</span>
          <span class="list-hot-more" @click="moreSinger($event)">更多</span>
        </div>
        <div class="list-list">
          <ul class="list1">
            <li v-for="(list,index) in listInfo" @click="singerInfo(index)">
              <img v-bind:src="list.singer_pic">
              <span>{{list.singer_name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list">
        <div class="list-hot-header clearfix">
          <span class="list-hot-title">新歌榜</span>
          <span class="list-hot-more" @click="moreSong($event)">更多</span>
        </div>
        <div class="list-list">
          <ul class="list2">
            <li v-for="(list2,index) in newSong" @click="musicR(list2)">
              <img v-bind:src="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+list2.albummid+'.jpg?max_age=2592000'">
              <span>{{list2.songname}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list">
        <div class="list-hot-header clearfix">
          <span class="list-hot-title">原创榜</span>
          <span class="list-hot-more" @click="moreSong($event)">更多</span>
        </div>
        <div class="list-list">
          <ul class="list3">
            <li v-for="(list3,index) in originalSong" @click="musicR(list3)">
              <img v-bind:src="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+list3.albummid+'.jpg?max_age=2592000'">
              <span>{{list3.songname}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list">
        <div class="list-hot-header clearfix">
          <span class="list-hot-title">专辑推荐</span>
          <span class="list-hot-more" @click="moreAlbum()">更多</span>
        </div>
        <div class="list-list">
          <ul  class="list4">
            <li v-for="(list4,index) in albumData" @click="albumInfo(list4)">
              <img v-bind:src="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+list4.album_mid+'.jpg?max_age=2592000'">
              <span>{{list4.album_name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      listInfo:[],
      newSong:[],
      originalSong:[],
      albumData:[],
    }
  },
  methods: {
    moreSinger(e){
      window.location.href = "/#/moreList/"+e.currentTarget.previousElementSibling.innerHTML;
    },
    moreSong(e){
      window.location.href = "/#/listTemplet/"+e.currentTarget.previousElementSibling.innerHTML;
    },
    moreAlbum(){
      window.location.href = "/#/albumPage"
    },
    singerInfo(i){
      this.$store.commit('getSinger',{one:this.listInfo[i].singer_mid,two:this.listInfo[i].singer_pic});
      window.location.href = "/#/singerInfo";
    },
    albumInfo(list){
      this.$store.commit('getAlbum',{one:list.album_mid,two:list.album_name,three:list.public_time});
      window.location.href = "/#/albumShow"
    },
    musicR(list){
      let src="/cqq/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=003lghpv0jfFXG&filename=C400"+list.songmid+".m4a&guid=126548448"
      this.$axios.get(src).then(data => {
        let s = this.time(list.interval);
        this.$store.commit('getPlayNow',
          {plyaNow:"http://ws.stream.qqmusic.qq.com/C400"+list.songmid+".m4a?fromtag=0&guid=126548448&vkey="+data.data.data.items[0].vkey,
            singer:list.singer[0].name,
            songName:list.songname,
            nowtime:s,
            musicSrc:list.albummid,
            totalT:list.interval,
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
    },
    getDataSinger(){
      const url = "/uqq/cgi-bin/musicu.fcg?-=getUCGI07397950547654308&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D";
      this.$axios.get(url).then(data => {
        for(let i = 0;i<6;i++){
          this.listInfo.push(data.data.singerList.data.singerlist[i]);
        }
      })
    },
    getDataNewsong(){
      const url = "/cqq/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2019-02-21&topid=27&type=top&song_begin=0&song_num=30&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
      this.$axios.get(url).then(data => {
        for(let i = 0;i<6;i++){
          this.newSong.push(data.data.songlist[i].data);
        }
      })
    },
    getDataOriginal(){
      const url = "/cqq/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2019_07&topid=52&type=top&song_begin=0&song_num=30&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
      this.$axios.get(url).then(data => {
        for(let i = 0;i<6;i++){
          this.originalSong.push(data.data.songlist[i].data)
        }
      })
    },
    getalbumData(){
      const url = "/uqq/cgi-bin/musicu.fcg?-=getUCGI6724128661028361&g_tk=791647972&loginUin=525824229&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22albumlib%22%3A%7B%22method%22%3A%22get_album_by_tags%22%2C%22param%22%3A%7B%22area%22%3A1%2C%22company%22%3A-1%2C%22genre%22%3A-1%2C%22type%22%3A-1%2C%22year%22%3A-1%2C%22sort%22%3A5%2C%22get_tags%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A99%2C%22click_albumid%22%3A0%7D%2C%22module%22%3A%22music.web_album_library%22%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D";
      this.$axios.get(url).then(data => {
        for(let i = 0;i<6;i++){
          this.albumData.push(data.data.albumlib.data.list[i]);
        }
      })
    }
  },
  mounted:function () {
    this.getDataSinger();
    this.getDataNewsong();
    this.getDataOriginal();
    this.getalbumData();
  }
}
</script>

<style scoped lang="stylus">
@import "../../common/stylus/listShow.styl"
</style>
