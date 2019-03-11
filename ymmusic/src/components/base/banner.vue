<template>
    <div class="banner" id="box" ref="box">
      <ul ref="uu"><!--图片-->
        <li ref="ii" v-for="(list,index) in bannerImg"><img v-bind:src="list.bannerimgSrc" ref="imgHH"></li>
      </ul>
      <div>
        <ol ref="oo">
          <li v-for="(list,index) in dots" :class="['bannerLi',{'current':index==curIndex}]"></li>
        </ol><!--小按钮-->
      </div>
    </div>
</template>

<script>
  import MScroll from 'better-scroll'
export default {
  name: 'banner',
  data () {
    return {
      dots:[],
      curIndex:0
    }
  },
  props:['bannerImg'],
  methods: {
    initWidth(){           //设置ul,li宽
      let imgNum = this.bannerImg.length;
      this.imgNum = imgNum;
      //设ul,li的宽
      this.$refs.uu.style.width = (100*(this.imgNum+2))+"%";
      for(let i=0;i<imgNum;i++){
        this.$refs.ii[i].style.width = (100/this.imgNum)+"%";
      }
    },
    initSlider(){          //设置轮播图参数
      this.slider = new MScroll(this.$refs.box,{
        scrollX:true,
        momentum:false,
        snap:{
          loop:true
        }
      });
      this.slider.on("scrollEnd",()=>{   //监听scrollEnd，滚动结束触发事件
        if(this.slider.getCurrentPage().pageX!=this.imgNum){
          this.autoSilder();
        }else{
          this.autoSilder2();         //消除不会无缝连接的问题
        }
        this.curIndex = this.slider.getCurrentPage().pageX
      });

    },
    autoSilder(){           //设置自动轮播
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{   //延迟1s后触发事件，只触发一次
        this.slider.next();
      },1000)
    },
    autoSilder2(){           //设置自动轮播
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{   //延迟0.001s后触发事件，只触发一次
        this.slider.next();
      },1)
    },
    initDots(){            //添加小圆点
      this.dots = new Array(this.imgNum);
    }
  },
  mounted:function () {
    this.initWidth();
    this.initSlider();
    this.autoSilder();
    this.initDots();
  }
}
</script>

<style scoped lang="stylus">
 @import "../../common/stylus/banner.styl"
</style>
