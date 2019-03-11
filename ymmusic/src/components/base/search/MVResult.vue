<template>
    <div class="singerResult">
      <video controls autoplay src="" ref="video"></video>
      <div class="shelter" ref="shelter" @click="off()"></div>
      <ul class="MList" ref="MList">
        <li v-for="(list,index) in MVlist" @click="MVPlay(list)">
          <img v-lazy="list.mv_pic_url">
          <span class="out">
          <span>{{list.mv_name}}</span>
          <span>播放次数：{{list.play_count}}</span>
        </span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "singerResult",
      data(){
        return{
          MVlist:[]
        }
      },
      methods:{
        getMVList(){
          this.$axios.get(this.$store.state.serchMV).then(data => {
            this.MVlist = data.data.data.mv.list;
          })
        },
        MVPlay(list){
          this.$refs.video.style.display = 'block';
          this.$refs.shelter.style.display = 'block';
          let src = "https://api.bzqll.com/music/tencent/mvUrl?key=579621905&id="+list.v_id+"&r=4";
          this.$refs.video.src = src;
          console.log(src);
        },
        off(){
          this.$refs.video.style.display = 'none';
          this.$refs.shelter.style.display = 'none';
        }
      },
      mounted:function () {
        this.getMVList();
      }
    }
</script>

<style scoped lang="stylus">
@import "../../../common/stylus/MVResult.styl"
</style>
