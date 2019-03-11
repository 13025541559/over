<template>
  <div class="mainPage">
    <div class="headerAll" @click="getData()">
      <ul>
        <li class="manager">
          <img src="../../static/images/totallist.svg" id = "header_l" @click="openTab()">
        </li>
        <li class="music" ref="headermusic">
          <ul ref="headeru">
            <li class="discover" @click="linkToShowMusic()">
              乐库
            </li>
            <li class="mineMusic" @click="linkToMineMusic()">
              我的音乐
            </li>
            <li class="community">
              乐圈
            </li>
          </ul>
        </li>
        <li class="search">
          <img src="../../static/images/search.svg" @click="search()">
        </li>
      </ul>
    </div>
    <div class="tab">
      <div class="tabb" ref="tabb">
        <div class="tab_left">
          <div class="tab_header">
            <!--<img src="../../static/images/default.jpg">-->
            <img v-bind:src="'../../static/images/'+this.$store.state.userPich">
            <br>
            <span class="login" v-show="this.$store.state.uesrsNameShow">{{this.$store.state.uesrsName}}</span>
            <a href="javascript:void(0)" class="login" @click="dologinShow()" v-show="!this.$store.state.uesrsNameShow">登录/注册</a>
          </div>
          <div class="tab_bottom">
            <ul>
              <li><img src="../../static/images/style.svg">主题换肤</li>
              <li><img src="../../static/images/alarm-clock.svg">定时关闭</li>
            </ul>
            <span class="tab_exit" @click="exitLogin()">退出</span>
          </div>
        </div>

      </div>
      <div class="tab_right" ref="tabr" @click="closeTab()">

      </div>
    </div>
    <div class="doLogin" ref="dologin">
      <div class="doLoginH">
        <span class="loginH clicked" @click="toLogin()" ref="loginH">登录</span>
        <span class="registerH" @click="toRegister()" ref="registerH">注册</span>
      </div>
      <div><span>账号：</span><input type="text" ref="username" @click="wr()"></div>
      <div><span>密码：</span><input type="password" ref="password" @click="wr()"></div>
      <div class="loginButton" ref="loginButton">
        <span class="errV" ref="loginerrV">账号或密码错误</span>
        <button @click="exit()">退出</button>
        <button @click="login()">登录</button>
      </div>
      <div class="registerButton" ref="registerButton">
        <span class="errV" ref="errV">账号已存在</span>
        <button @click="exit()">退出</button>
        <button @click="register()">注册</button>
      </div>
    </div>
    <div class="success" ref="success">
      <div>注册成功！</div>
      <button @click="ok()">确定</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
      }
    },
    methods: {
      toLogin(){    //切换登录
        this.$refs.loginButton.style.display = "block";
        this.$refs.registerButton.style.display = "none";
        this.$refs.registerH.classList.remove("clicked");
        this.$refs.loginH.classList.add("clicked");
      },
      toRegister(){   //切换注册
        this.$refs.loginButton.style.display = "none";
        this.$refs.registerButton.style.display = "block";
        this.$refs.registerH.classList.add("clicked");
        this.$refs.loginH.classList.remove("clicked");
      },
      wr(){            //显示错误提示
        this.$refs.errV.style.visibility = "hidden";
        this.$refs.loginerrV.style.visibility = "hidden";
      },
      login(){          //登录判断
        const that = this;
        let url="/lh/userLogin";
        let params = {
          username:that.$refs.username.value,
          password:that.$refs.password.value
        };
        this.$axios.post(url,params)
          .then(function (response) {
            if(response.data.length===0){
              that.$refs.loginerrV.style.visibility = "visible";
            }else{
              that.$refs.dologin.style.visibility = "hidden";
              that.$store.state.uesrsNameShow = !that.$store.state.uesrsNameShow;
              if(response.data[0].pic===undefined){
                response.data[0].pic = "default.jpg"
              }
              if(response.data[0].name===undefined){
                response.data[0].name = "用户007"
              }
              console.log(response.data[0].pic);
              that.$store.commit('updateUserInfo',{one:response.data[0].pic,two:response.data[0].name})
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      register(){    //注册事件
        const that = this;
        let url="/lh/userRegister";
        let params = {
          username:that.$refs.username.value,
          password:that.$refs.password.value
        };
        this.$axios.post(url,params)      //检查用户名是否存在
          .then(function (response) {
            if(response.data.length === 0){    //用户名不存在执行添加用户
              let url="/lh/userAdd";
              let params = {
                username:that.$refs.username.value,
                password:that.$refs.password.value
              };
              that.$axios.post(url,params)
                .then(function (response) {
                  if(response.data.n===1){
                    that.$refs.success.style.visibility = "visible";
                  }
                }).catch(function (error) {
                console.log(error);
              });
            }else{
              that.$refs.errV.style.visibility = "visible";
            }
          })
      },
      ok(){          //注册成功确定事件
        this.$refs.success.style.visibility = "hidden";
      },
      exitLogin(){                //退出登录
        this.$store.commit('removeUserInfo');
        this.$store.state.uesrsNameShow = false
      },
      dologinShow(){     //显示登录框
        this.$refs.dologin.style.visibility = "visible";
      },
      exit(){           //隐藏登录框
        this.$refs.dologin.style.visibility = "hidden";
      },
      openTab(){       //打开侧边栏
        this.$refs.tabb.style.transitionDuration = 1000+"ms";
        this.$refs.tabb.style.left = 0+"px";
        this.$refs.tabr.style.visibility = "visible";
      },
      closeTab(){     //隐藏侧边栏
        this.$refs.tabb.style.transitionDuration = 1000+"ms";
        this.$refs.tabb.style.left = -this.$refs.tabb.offsetWidth+"px";
        this.$refs.tabr.style.visibility = "hidden"
      },
      search(){
        window.location.href = "/#/searchPage"
      },
      linkToShowMusic(){
        window.location.href = "/#/mainPage/showMusic"
      },
      linkToMineMusic(){
        window.location.href = "/#/mainPage/mineMusic"
      }
    },
    mounted:function () {
      this.$refs.headeru.style.marginTop = (this.$refs.headermusic.offsetHeight-this.$refs.headeru.offsetHeight)/2+"px";
      this.$refs.tabb.style.left = -this.$refs.tabb.offsetWidth+"px"
    }
  }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/mainPage.styl"
</style>
