<template>
  <div class="search">
    <div class="search_header">
      <div class="back" ref="back" @click="back()">
        <img src="../../../static/images/back.svg">
      </div>
      <div class="search_k">
        <form>
          <input type="text" placeholder="请输入搜索内容" class="search_t" ref="search_t">
          <img src="../../../static/images/search_icon.svg" class="search_icon" @click="searchInfo()">
          <img src="../../../static/images/cancel.svg" class="empty">
        </form>
      </div>
    </div>
    <div class="search_hot">
      热门搜索
    </div>
    <div class="hot_list">
      <ul>
        <li v-for="(list,index) in hotSearch" @click="hot($event)">{{list}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      hotMusic:["张杰",
        "陈奕旭",
        "小酒窝",
        "张学友",
        "刘宇宁",
        "anu",
        "我不愿明白",
        "知否知否",
        "倒数",
        "光辉岁月",
        "可不可以",
        "成都",
        "夜半小夜曲",
        "周杰伦",
        "慢慢喜欢你",
        "好久不见",
        "彩虹",
        "下课等你",
        "童话"
      ],
      hotSearch:[]
    }
  },
  methods: {
    back(){
      window.history.go(-1);
    },
    getHotSearch(){
      this.hotSearch.push(this.hotMusic[Math.floor(Math.random()*this.hotMusic.length)]);
      for(let i=0;i<8;i++){
        let b = Math.floor(Math.random()*this.hotMusic.length);;
        this.hotSearch.push(this.hotMusic[b]);
      }
    },
    searchInfo(){    //输入内容搜索
      let info = this.$refs.search_t.value;
      this.seachFuntion(info);
    },
    hot(e) {      //点击热门小按钮搜索
      let info = e.currentTarget.innerHTML;
      this.seachFuntion(info);
    },
    seachFuntion(info){     //封装搜索函数
      const url1 = "/cqq/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=100&w="+info;
      const url2 = "/cqq/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&remoteplace=txt.yqq.mv&searchid=130468758472058040&aggr=0&catZhida=1&lossless=0&sem=1&t=12&p=1&n=28&w="+info+"&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
      const url3 = "/cqq/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&remoteplace=txt.yqq.album&searchid=75882344076740796&aggr=0&catZhida=1&lossless=0&sem=10&t=8&p=1&n=30&w="+info+"&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0"
      this.$store.commit('serchSong',url1);
      this.$store.commit('serchMV',url2);
      this.$store.commit('serchAlbum',url3);
      this.$router.push({name:'songResult'});
    }
  },
  mounted:function () {
    let header_h = this.$refs.back.offsetHeight;
    this.$refs.search_t.style.height = header_h*0.8+"px";
    this.$refs.search_t.style.marginTop = header_h*0.1+"px";
    this.getHotSearch()
  },
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/search.styl"
</style>
