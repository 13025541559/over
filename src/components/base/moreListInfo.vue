<template>
    <div class="moreListInfo">
      <div class="moreHeader" ref="moreHeader">
        <ul>
          <li class="header_left">
            <img src="../../../static/images/back.svg" id = "header_l" @click="back()">
          </li>
          <li class="header_center">
            {{type}}
          </li>
          <li class="header_right">
            <img src="../../../static/images/search.svg" @click="search()">
          </li>
        </ul>
      </div>
      <ul class="singerList" ref="singerList">
        <li v-for="(list,index) in listInfo">
          <img v-lazy="list.singer_pic">
          <span @click="serchSinger(list)">{{list.singer_name}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      listInfo:[]
    }
  },
  props:["type"],
  methods: {
    back(){
      window.history.go(-1);
    },
    search(){
      window.location.href = "/#/searchPage"
    },
    getDataSinger(){
      const url = "/uqq/cgi-bin/musicu.fcg?-=getUCGI07397950547654308&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D";
      this.$axios.get(url).then(data => {
        this.listInfo=data.data.singerList.data.singerlist;
        console.log(this.listInfo);
      })
    },
    serchSinger(list){
      this.$store.commit('getSingerMid',{one:list.singer_mid,two:list.singer_pic})
      window.location.href = "/#/singerInfo";
    }
  },
  mounted:function () {
    this.$refs.singerList.style.marginTop = this.$refs.moreHeader.offsetHeight+"px";
    this.getDataSinger();
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/moreListInfo.styl"
</style>
