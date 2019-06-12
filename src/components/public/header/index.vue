<template>
  <div>
    <div :class="{indexshow :this.$route.path !== '/pxx/app/index'}" class="header-if-index-main">
      <b-container>
        <b-row>
          <b-col xl="2" class="common-header-slice1">
            <router-link to="/pxx/app/index">
              <img src="../../../../static/imgs/logo.png" class="header-logo">
            </router-link>
          </b-col>
          <b-col
            v-for="(d1,index) in headerdata1"
            :key="index"
            xl="1"
            class="common-header-slice"
            :offset-xl="index===0? 5 : 0"
          >
            <router-link :to="d1.path" :class="{indexActive : $route.path === d1.path}">{{d1.title}}</router-link>
          </b-col>
          <b-col xl="1" class="common-header-slice">
            <router-link
              to="/pxx/signin"
              :class="{indexActive : this.$route.path === '/pxx/signin'}"
              v-if="loginflag"
            >登录</router-link>
            <div class="userlogindiv" @mouseover="loginmouseover" v-else>
              <img :src="useravatar" class="useravatarimg">
              <a-tooltip placement="topLeft">
                <template slot="title">
                  <span>{{this.username}}</span>
                </template>
                <span class="useravatar-p">{{this.username}}</span>
              </a-tooltip>
              <div class="person-div" @mouseout="loginmouseout" v-show="persondivflag">
                <router-link to="/pxx/app/personal">个人中心</router-link>
                <span @click="loginout">退出登录</span>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <div class="header-banner-div">
        <img src="../../../../static/imgs/home1-slide1.jpg">
        <b-container class="header-banner">
          <b-row>
            <b-col xl="9" class="header-banner-span bounceInLeft animated">ITS REAL BATTLE</b-col>
          </b-row>
          <b-row>
            <b-col xl="6" class="header-banner-span bounceInLeft animated">OF MAKING</b-col>
          </b-row>
          <b-row>
            <b-col
              xl="7"
              class="header-banner-span header-banner-span1 bounceInLeft animated"
            >拼夕夕 CARS</b-col>
          </b-row>
          <b-row>
            <b-col xl="3" style="text-align:left">
              <a-button class="gujaibtn bounceInUp animated" @click="showevaluateModal">爱车估价</a-button>
            </b-col>
          </b-row>
        </b-container>
        <globalModal :parentData="parentData"></globalModal>
      </div>
    </div>
    <b-container :class="{indexshow :this.$route.path === '/pxx/app/index'}">
      <b-row>
        <b-col xl="2" class="common-header-slice1">
          <router-link to="/pxx/app/index">
            <img src="../../../../static/imgs/logo.png" class="header-logo">
          </router-link>
        </b-col>
        <b-col
          v-for="(d1,index) in headerdata1"
          :key="index"
          xl="1"
          class="common-header-slice2"
          :offset-xl="index===0? 5 : 0"
        >
          <router-link :to="d1.path" :class="{indexActive : $route.path === d1.path}">{{d1.title}}</router-link>
        </b-col>
        <b-col xl="1" class="common-header-slice2">
          <router-link
            to="/pxx/signin"
            :class="{indexActive : this.$route.path === '/pxx/signin'}"
            v-show="loginflag"
          >登录</router-link>
          <div class="userlogindiv" @mouseover="loginmouseover">
            <img v-show="!loginflag" :src="useravatar" class="useravatarimg">
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>{{this.username}}</span>
              </template>
              <span class="useravatar-p useravatar-p1">{{this.username}}</span>
            </a-tooltip>
            <div class="person-div" @mouseout="loginmouseout" v-show="persondivflag">
              <router-link to="/pxx/app/personal">个人中心</router-link>
              <span @click="loginout">退出登录</span>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { Decrypt, Encrypt } from "../../../../static/js/utils.js";
import globalModal from "../../utils/el-modal/GlobalModal.vue";
import Footer from "../footer/index.vue";
export default {
  components: {
    globalModal
  },
  data() {
    return {
      // 父组件传递给估价模板的值
      parentData: {
        dataTochild: false
      },
      loginflag: true,
      useravatar: "",
      username: "",
      persondivflag: false,
      headerdata1: [
        {
          path: "/pxx/app/index",
          title: "首页"
        },
        {
          path: "/pxx/app/buy",
          title: "我要买车"
        },
        {
          path: "/pxx/app/sell",
          title: "我要卖车"
        },
        {
          path: "/pxx/reg",
          title: "注册"
        }
      ]
    };
  },
  methods: {
    // 显示估价对话框
    showevaluateModal() {
      if (window.sessionStorage.getItem("loginflag") !== "true") {
        this.$message.error("您尚未登录，请前往登录！");
        this.$router.push("/pxx/signin");
      } else {
        this.parentData.dataTochild = true;
      }
    },
    loginmouseover() {
      this.persondivflag = true;
    },
    loginmouseout() {
      this.persondivflag = false;
    },
    // 退出登录
    loginout() {
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("password");
      window.localStorage.removeItem("userId");
      window.localStorage.removeItem("useravatar");
      window.sessionStorage.setItem("loginflag", "false");
      location.href = "/";
    }
  },
  mounted() {
    if (window.sessionStorage.getItem("loginflag") === "true") {
      this.loginflag = false;
      this.useravatar = Decrypt(window.localStorage.getItem("useravatar"));
      this.username = Decrypt(window.localStorage.getItem("username"));
    } else {
      this.loginflag = true;
    }
  }
};
</script>
<style lang="less" scoped>
.header-if-index-main {
  height: 900px;
  position: relative;
}

.header-logo {
  width: 100%;
  height: 100%;
}
.common-header-slice1 {
  padding: 10px 0;
}
.common-header-slice {
  padding: 25px 0;
  font-size: 16px;
}
.common-header-slice a {
  text-decoration: none;
  color: #fff;
}

.common-header-slice a:hover {
  text-decoration: none;
}
.header-banner-span {
  text-align: left;
  opacity: 1;
  line-height: 100px;
  font-weight: 500;
  letter-spacing: 7px;
  text-transform: uppercase;
  font-family: "Roboto Slab", serif;
  color: #fff;
  font-size: 80px;
}
.userlogindiv {
  position: relative;
  .useravatarimg {
    width: 25px;
    height: 25px;
    border-radius: 50px;
    margin-left: -17px;
  }
  .useravatar-p {
    position: absolute;
    font-size: 16px;
    color: #fff;
    top: 3px;
    left: 50px;
    width: 75px;
    overflow: hidden;
    padding-left: 15px;
    text-overflow: ellipsis;
    white-space: nowrap; /*强制span不换行*/
    margin-left: 15px;
    border-left: 1px solid #f1f2f6;
  }
  .useravatar-p1 {
    color: black !important;
  }
}
.person-div {
  position: absolute;
  width: 100px;
  height: 88px;
  top: 33px;
  left: 31px;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
  background-color: #fff;
  span,
  a {
    display: inline-block;
    width: 100%;
    color: black;
    padding: 10px 0;
    text-align: center;
  }
  span:hover,
  a:hover {
    color: #06a5ff;
    opacity: 0.8;
  }
}

.person-div:hover {
  box-shadow: 0px 2px 8px #c0c0c0;
  transition: all 400ms ease-in-out;
}

.header-banner-span1 {
  font-weight: 900 !important;
  letter-spacing: 1px !important;
  font-size: 90px !important;
  color: #f85c37;
}
.indexshow {
  display: none;
}
.indexActive {
  padding: 10px 10px;
  border-bottom: 1px solid orange;
}
.header-banner-div {
  img {
    position: absolute;
    left: 0;
    top: 0px;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  .header-banner {
    position: absolute;
    top: 200px;
    // 这里有所修改
    left: 200px;
    z-index: 3;
  }
  .gujaibtn {
    margin-top: 30px;
    background-color: #f85c37;
    font-size: 20px;
    color: #fff;
    width: 200px;
    height: 50px;
    opacity: 0.8;
    border: 1px solid #f85c37;
  }
  .gujaibtn:hover {
    opacity: 1;
    border: 2px;
  }
}

/* 非主页面头部样式 */

.common-header-slice2 a {
  color: black;
  text-decoration: none;
}
.common-header-slice2 {
  padding: 25px 0;
  font-size: 18px;
}
.common-header-slice2 a:hover {
  text-decoration: none;
}
@media screen and( max-width: 1440px) {
  .header-if-index-main {
    height: 600px;
  }
  .common-header-slice,
  .common-header-slice2,
  .useravatar-p {
    font-size: 14px !important;
  }
  .header-banner-span,
  .header-banner-span1 {
    font-size: 50px !important;
    line-height: 72px;
  }
  .header-banner-div .gujaibtn {
    width: 160px;
    height: 40px;

    .header-banner {
      top: 180px;
      left: 130px;
    }
  }
}
</style>