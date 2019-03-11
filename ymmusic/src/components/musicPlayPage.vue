<template>
    <div class="musicPlayPage">
      <img src="../../static/images/back.svg" id = "header_l" @click="back()">
      <div class="songname">{{this.$store.state.listData[this.nowI].songName}}</div>
      <div class="singer">{{this.$store.state.listData[this.nowI].singer}}</div>
      <img v-bind:src="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+this.$store.state.listData[this.nowI].musicSrc+'.jpg?max_age=2592000'" class="palyerPic" v-bind:style="'transform: rotate('+this.t+'deg)'" ref="ampic">
      <ul class="process">
        <li class="time1">{{this.$store.state.time}}</li>
        <li class="process_contain" ref="proContain"  @click="runTo($event)">
          <div class="pro" ref="pro" v-bind:style="{width:this.$store.state.process}"></div>
        </li>
        <li class="time2">{{this.$store.state.listData[this.nowI].nowtime}}</li>
      </ul>
      <div class="bottom">
        <img src="../../static/images/before.svg" @click="before()">
        <img src="../../static/images/playy.svg" v-show=this.$store.state.ifshow @click="musicplay()">
        <img src="../../static/images/pausee.svg" v-show=!this.$store.state.ifshow @click="musicplay()">
        <img src="../../static/images/after.svg" @click="after()">
      </div>
      <img class="collect" src="../../static/images/collect.svg" v-if='this.$store.state.listData[this.nowI].collected===false' @click="collect()">
      <img class="collect" src="../../static/images/collected.svg" v-else-if='this.$store.state.listData[this.nowI].collected===true' @click="collect()">
    </div>
</template>

<script>
    export default {
      name: "musicPlayPage",
      data(){
        return{
          t:0,
          nowI:0
        }
      },
      methods:{
        back(){           //返回上一级
          window.history.go(-1);
          this.$store.commit('audioShow');
        },
        musicplay(){
          if(this.$store.state.ifshow===false){
            this.$store.commit('pause');
            this.$refs.audio.pause();
          }else {
            this.$store.commit('play');
            this.$refs.audio.play();
          }
          this.$store.commit('timeRun');
        },
        runTo(e){
          let proNow = (e.pageX-this.$refs.proContain.offsetLeft)/this.$refs.proContain.offsetWidth;
          let total = this.$store.state.listData[this.nowI].totalT;
          // console.log(total);
          // console.log(proNow*total);
          // console.log(this.$refs.pro.offsetWidth);
          this.$store.commit('toPro',{one:proNow*total,two:(e.pageX-this.$refs.proContain.offsetLeft)})
        },
        before(){
          if(this.nowI === 0){
            this.nowI = this.$store.state.listData.length-1;
          }else {
            this.nowI--;
          }
          this.$store.commit('listRun',
            {plyaNow:this.$store.state.listData[this.nowI].plyaNow,
              singer:this.$store.state.listData[this.nowI].singer,
              songName:this.$store.state.listData[this.nowI].songName,
              nowtime:this.$store.state.listData[this.nowI].nowtime,
              musicSrc:this.$store.state.listData[this.nowI].musicSrc,
              totalT:this.$store.state.listData[this.nowI].totalT,
              collected:false});
          this.$store.commit('replay');
          this.$store.commit('timeRun');
          this.$store.state.isautoplay = true;
        },
        after(){
          if(this.nowI === this.$store.state.listData.length-1){
            this.nowI = 0;
          }else {
            this.nowI++;
          }
          this.$store.commit('listRun',
            {plyaNow:this.$store.state.listData[this.nowI].plyaNow,
              singer:this.$store.state.listData[this.nowI].singer,
              songName:this.$store.state.listData[this.nowI].songName,
              nowtime:this.$store.state.listData[this.nowI].nowtime,
              musicSrc:this.$store.state.listData[this.nowI].musicSrc,
              totalT:this.$store.state.listData[this.nowI].totalT,
              collected:false});
          this.$store.commit('replay');
          this.$store.commit('timeRun');
          this.$store.state.isautoplay = true;
        },
        collect(){
          this.$store.commit('collectEvent',this.nowI)
        }
      },
      mounted:function () {
        this.nowI = this.$store.state.listIndex;
        if(this.$store.state.ifshow===true){
          clearInterval(this.time);
        }else {
          this.time = setInterval(()=> {
            this.t+=1;
          },100);
        }
      },
      computed:{
        showOr(){
          return this.$store.state.ifshow
        }
      },
      watch:{
        showOr (newVal, oldVal) {
          if(oldVal===false){
            clearInterval(this.time);
          }else {
            this.time = setInterval(()=> {
              this.t+=1;
            },100);
          }
        }
      }
    }
</script>

<style scoped lang="stylus">
@import "../common/stylus/musicPlayPage.styl"
</style>
