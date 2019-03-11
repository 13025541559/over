<template>
    <div class="MVList">
      <video ref="video" src="https://y.qq.com/n/yqq/mv/v/x00238uavss.html" controls autoplay></video>
      <div class="moreHeader" ref="moreHeader">
        <ul class="header_t">
          <li class="header_left">
            <img src="../../../static/images/back.svg" id = "header_l" @click="back()">
          </li>
          <li class="header_center">
            {{n}}
          </li>
          <li class="header_right">
            <img src="../../../static/images/search.svg" @click="search()">
          </li>
        </ul>
      </div>
      <ul class="MList" ref="MList">
        <li v-for="(list,index) in hotMV" @click="MVRun(list)">
          <img v-lazy="list.picurl">
          <span class="out">
          <span>{{list.title}}/{{list.singers[0].name}}</span>
          <span>播放次数：{{list.playcnt}}</span>
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
          hotMV:[]
        }
      },
      props:["n"],
      methods:{
        back() {
          window.history.go(-1);
        },
        search() {
          window.location.href = "/searchPage"
        },
        getDataHotMV(){
          const url = "/uqq/cgi-bin/musicu.fcg?-=mvlib7779496489667446&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22mv_list%22%3A%7B%22module%22%3A%22MvService.MvInfoProServer%22%2C%22method%22%3A%22GetAllocMvInfo%22%2C%22param%22%3A%7B%22start%22%3A0%2C%22size%22%3A20%2C%22version_id%22%3A7%2C%22area_id%22%3A15%2C%22order%22%3A0%7D%7D%7D";
          this.$axios.get(url).then(data => {
            this.hotMV = data.data.mv_list.data.list
          })
        },
        MVRun(list){
          let playsrc = "https://api.bzqll.com/music/tencent/mvUrl?key=579621905&id="+list.vid+"&r=4";
          this.$refs.video.src = playsrc;
        }
      },
      mounted:function () {
        console.log(this.n);
        this.$refs.video.style.marginTop = this.$refs.moreHeader.offsetHeight+"px";
        this.getDataHotMV();
      }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/MVList.styl"
</style>
