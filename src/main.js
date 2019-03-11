// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import router from './router'
import fastclick from 'fastclick'
import 'babel-polyfill'
import vueResource from 'vue-resource'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'

Vue.use(vueResource);
Vue.use(VueLazyLoad);
Vue.use(Vuex);
Vue.config.productionTip = false;
fastclick.attach(document.body);
Vue.prototype.$axios = axios;

const store = new Vuex.Store({
  state: {
    audioShow:false,
    songName:"可不可以",  //播放框歌曲名
    nowImg:"",
    isautoplay:false,
    nowtime:"04:00",      //每首音乐的总时长，用于显示在播放框，格式为xx:xx
    ifshow:true,     //用于控制播放按钮，true时为播放样式，false时为暂停样式
    time:"00:00",   //音乐播放到的时间显示
    inter:0,        //播放时间，每一秒+1，用于转换为time
    control:0,
    musicSrc:"004VR1w241uBhB",   //专辑id，用于拼接专辑图片
    listUrl:"",    //用于存放请求到的数据
    plyaNow:"http://ws.stream.qqmusic.qq.com/C400000x2ZyK1FYFht.m4a?fromtag=0&guid=126548448&vkey=F5F868B28C2050C3CE8B2C8686A9400155881E674A2D4E363D3401085114A9837714ED24EFBA6D1B1F2A37BEF7F687FEA5B30467F50A40D1",    //当前播放的歌曲链接
    singer:"张紫豪",     //播放框歌手名
    songMid:"",
    process:50,  //进度条
    totalT:0,  //总时长
    listData:[],   //播放列表数据
    listIndex:0,   //歌曲在播放列表中的排列位置
    serchSong:"",    //搜索歌曲
    serchAlbum:"",   //搜索专辑
    serchMV:"",      //搜索MV
    selectSingerId:"",  //选择的歌手
    selectSingerPic:"",   //选择的歌手图片
    selectAlbumMid:"",    //选择的专辑Mid
    selectAlbumName:"",    //选择的专辑名字
    selectAlbumTime:"",    //选择的专辑发行时间
    userPich:"default.jpg",      //用户头像
    uesrsName:"",      //用户名字
    uesrsNameShow:false   //用户名字显示
  },
  mutations: {
    unaudioShow(state){     //播放框隐藏
      state.audioShow = false;
    },
    audioShow(state){          //播放框显示
      state.audioShow = true;
    },
    replay(state){        //点击歌名事件
      clearInterval(this.timer);
      state.ifshow = false;
      state.time="00:00";
      state.inter=0;
    },
    pageRefresh(state){
      clearInterval(this.timer);
      state.time = "00:00";
      state.isautoplay = false;
      state.process = 0;
      state.inter = 0;
      state.ifshow = true;
    },
    play (state) {       //控制播放按钮
      state.ifshow = false;
    },
    pause (state) {      //控制播放按钮
      state.ifshow = true;
    },
    getData (state,url){     //获取请求到的数据
      state.listUrl = url;
    },
    getPlayNow(state,info){         //获取被点击的歌曲信息,并加入播放列表
      state.plyaNow = info.plyaNow,
      state.singer = info.singer,
      state.songName = info.songName,
      state.nowtime = info.nowtime,
      state.musicSrc = info.musicSrc,
      state.totalT = info.totalT,
      state.listIndex = info.listIndex
      state.listData.push(info);
    },
    listRun(state,info){     //播放被点击的播放列表歌曲
      state.plyaNow = info.plyaNow,
      state.singer = info.singer,
      state.songName = info.songName,
      state.nowtime = info.nowtime,
      state.musicSrc = info.musicSrc,
      state.totalT = info.totalT,
      state.listIndex = info.listIndex
    },
    timeRun(state){         //音乐播放时进度条和时间变化事件
      if(state.ifshow===true){
        clearInterval(this.timer);
      }else{
        clearInterval(this.timer);
        this.timer = setInterval(()=> {
          state.inter++;
          state.process = state.inter/state.totalT*100+"%";
          let m = parseInt(state.inter/60);
          let s = parseInt(state.inter%60);
          if(m<10){
            m = "0"+m;
          }
          if(s<10){
            s = "0"+s;
          }
          state.time = m.toString()+":"+s.toString();
          if(state.time===state. nowtime){
            state.ifshow = true;
            state.time="00:00";
            state.inter=0;
            clearInterval(this.timer);
          }
        },1000);
      }
    },
    toPro(state,info){    //点击进度条音乐跳到指定位置
      state.inter = info.one;
      state.process = info.two;
    },
    listRemove(state,i){      //删除播放列表中的指定歌曲
      state.listData.splice(i,1)
    },
    collectEvent(state,i){    //播放列表中歌曲收藏事件
      state.listData[i].collected = !state.listData[i].collected
    },
    listClear(state){        //清空播放列表
      state.listData.splice(0,state.listData.length)
    },
    serchSong(state,url){   //搜索歌曲所用的链接
      state.serchSong = url;
    },
    serchAlbum(state,url){  //搜索专辑所用的链接
      state.serchAlbum = url;
    },
    serchMV(state,url){    //搜索MV所用的链接
      state.serchMV = url;
    },
    getSinger(state,data){   //获取歌手的姓名和头像
      state.selectSingerId = data.one;
      state.selectSingerPic = data.two;
    },
    getAlbum(state,data){   //获取专辑Mid;
      state.selectAlbumMid = data.one;
      state.selectAlbumName = data.two;
      state.selectAlbumTime = data.three;
    },
    updateUserInfo(state,data){    //登录后用户信息显示
      state.userPich = data.one;
      state.uesrsName = data.two;
    },
    removeUserInfo(state){           //退出后用户信息重置
      state.userPich = "default.jpg";
      state.uesrsName = ""
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
