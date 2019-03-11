<template>
   <div class="musicPlay" v-show="this.$store.state.audioShow">
     <div class="musicListPlay" v-show="listShow">
       <div class="musicListPlay_header">
         <div v-if="o==1" @click="change(o)">
           <img src="../../../static/images/xhbf.svg">
           <span>顺序播放</span>
         </div>
         <div v-else-if="o==2" @click="change(o)">
           <img src="../../../static/images/sjbf.svg">
           <span>随机播放</span>
         </div>
         <div v-else-if="o==3" @click="change(o)">
           <img src="../../../static/images/dqxh.svg">
           <span>单曲循环</span>
         </div>
         <span class="clear" @click="clearAll()">清空</span>
       </div>
       <ul ref="uuu">
         <li v-for="(list,index) in this.$store.state.listData" ref="lll">
           <span>{{index+1}}</span>
           <span @click="musicR(list,index)">{{list.songName}}</span>
           <span>/</span>
           <span>{{list.singer}}</span>
           <img src="../../../static/images/deleteMusic.svg" @click="deleteListData(index)">
           <!--<img src="../../../static/images/download.svg">-->
           <img src="../../../static/images/collect.svg" v-if='list.collected===false' @click="collect(index)">
           <img src="../../../static/images/collected.svg" v-else-if='list.collected===true' @click="collect(index)">
         </li>
       </ul>
     </div>
     <audio ref="audio" v-bind:src=this.$store.state.plyaNow :autoplay=this.$store.state.isautoplay></audio>
     <div class="play" ref="play">
       <img v-bind:src="'http://y.gtimg.cn/music/photo_new/T002R90x90M000'+this.$store.state.musicSrc+'.jpg?max_age=2592000'" class="runMV" @click="toPlay()">
       <div @click="toPlay()">
         <span>
           <span>{{this.$store.state.songName}}</span>(
           <span>{{this.$store.state.singer}}</span>)
         </span>
         <span>
           <span ref="time">{{this.$store.state.time}}</span>/<span>{{this.$store.state.nowtime}}</span>
         </span>
       </div>
       <img src="../../../static/images/music_list.svg" class="musiclist" @click="clistShow()">
       <img src="../../../static/images/run.svg" class="musicrun" ref="btn" v-show=this.$store.state.ifshow @click="musicplay()">
       <img src="../../../static/images/stop.svg" class="musicrun" v-show=!this.$store.state.ifshow @click="musicplay()">
       <div class="progressBar">
         <div class="progressContain" v-bind:style="{width:this.$store.state.process}"></div>
       </div>
     </div>
     <div class="bottom" ref="bottom"></div>
   </div>
</template>

<script>
export default {
  name: 'musicPlay',
  data () {
    return {
      listShow:false,
      select:-1,
      o:1,
      songInfo:[]
    }
  },
  methods: {
    musicplay(){
      if(this.$store.state.ifshow===false){
        this.$store.commit('pause');
      }else {
        this.$store.commit('play');
      }
    },
    clistShow(){
      this.listShow = !this.listShow
    },
    collect(index){
      this.$store.commit('collectEvent',index)
    },
    deleteListData(i){
      this.$store.commit('listRemove',i)
    },
    clearAll(){
      this.$store.commit('listClear')
    },
    musicR(list,index){
      this.$store.commit('listRun',
        {plyaNow:list.plyaNow,
          singer:list.singer,
          songName:list.songName,
          nowtime:list.nowtime,
          musicSrc:list.musicSrc,
          totalT:list.totalT,
          listIndex:index
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
    change(i){
      if(i!=3){
        i++;
        this.o = i;
      }else {
        this.o = 1;
      }
    },
    toPlay(){
      this.$store.commit('unaudioShow');
      window.location.href = "/#/musicPlayPage"
    }
  },
  computed:{
    showOr(){
      return this.$store.state.ifshow
    },
    runto(){
      return this.$store.state.inter;
    }
  },
  watch:{
    showOr (newVal, oldVal) {
      if(oldVal===false){
        this.$refs.audio.pause();
      }else {
        this.$refs.audio.play();
      }
      this.$store.commit('timeRun');
    },
    runto (newVal, oldVal) {
      this.$refs.audio.currentTime = oldVal;
    }
  },
  mounted:function () {
    this.$refs.bottom.style.height = this.$refs.play.offsetHeight+"px";
    console.log(this.$store.state.listData);
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/musicPlay.styl"
</style>
