<template>
    <div class="mineMusic">
      <div class="userInf">
        <img v-bind:src="'../../static/images/'+this.$store.state.userPich">
        <span class="login">{{this.$store.state.uesrsName}}</span>
        <span class="btnxg" @click="showEdit()">编辑</span>
      </div>
      <div class="edit" ref="edit">
        <img v-bind:src="'../../static/images/'+this.$store.state.userPich" ref="headerPic">
        <input type="file" class="file" @change="picSelect($event)">
        <span class="filebtn">选择头像</span>
        <span>用户名称：</span>
        <input type="text" class="text">
        <button @click="cancel()">取消</button>
        <button>确定</button>
      </div>
      <ul class="mineMusic_c">
        <li><img src="../../static/images/minecollect.svg"><br><span></span>我喜欢</li>
        <li><img src="../../static/images/mostListen.svg"><br><span>最多播放</span></li>
        <li><img src="../../static/images/minedownload.svg"><br><span>下载</span></li>
      </ul>
      <div class="songList_header">
        <span>我的歌单</span>
        <img src="../../static/images/songlist.svg" @click="mineListShow()">
        <img src="../../static/images/add_w.svg" @click="addListShow()">
      </div>
      <ul class="listClassify">
        <li v-for="(list,index) in mineSongList" class="clearfix">
          <img src="../../static/images/test.jpg">
          <div>
            <span>{{list.listName}}</span><br>
            <span>{{list.songNum}}</span>
          </div>
          <img src="../../static/images/songListJt.svg">
        </li>
      </ul>
      <div class="addList" ref="addList">
        <div>
          <span>歌单名:</span><input type="text">
        </div>
        <div>
          <button @click="addListCancel()">取消</button>
          <button>确定</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      mineSongList:[
        {
          listName:"歌单一",
          songNum:10,
        },
        {
          listName:"歌单二",
          songNum:10,
        },
        {
          listName:"歌单三",
          songNum:10,
        },
        {
          listName:"歌单四",
          songNum:10,
        },
        {
          listName:"歌单五",
          songNum:10,
        },
        {
          listName:"歌单六",
          songNum:10,
        },
      ]
    }
  },
  methods: {
    showEdit(){        //显示编辑框
      this.$refs.edit.style.visibility = "visible";
    },
    cancel(){         //隐藏编辑框
      this.$refs.edit.style.visibility = "hidden";
    },
    picSelect(e){
      console.log(e.target.files[0]);
      let URL = window.URL || window.webkitURL;
      // 通过 file 生成目标 url
      let imgURL = URL.createObjectURL(e.target.files[0]);
      // 用这个 URL 产生一个 <img> 将其显示出来
     this.$refs.headerPic.src = imgURL;
    },
    addListShow(){
      this.$refs.addList.style.visibility = "visible";
    },
    addListCancel(){
      this.$refs.addList.style.visibility = "hidden";
    },
    mineListShow(){
      window.location.href = "/#/mineMusicList";
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../common/stylus/mineMusic.styl"
</style>
