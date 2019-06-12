<template>
  <div class="fix-silder-div">
    <div>
      <div class="icon1" @mouseover="mouseIn(1)" @mouseout="mouseOut(1)">
        <div class="download-div download-div1" v-show="iconflag1">
          <img src="../../../../static/imgs/app.png">
          <p>下载APP关注更多信息</p>
        </div>
        <i class="iconfont icon-xiazai"/>
      </div>
      <div class="icon2" @mouseover="mouseIn(2)" @mouseout="mouseOut(2)">
        <div class="download-div download-div1" v-show="iconflag2">
          <img src="../../../../static/imgs/app.png">
          <p>关注公众号了解更多信息</p>
        </div>
        <i class="iconfont icon-changyonglogo28"/>
      </div>
      <div class="icon3" @mouseover="mouseIn(3)" @mouseout="mouseOut(3)">
        <div class="download-div download-div2" v-show="iconflag3">
          <p>免费咨询:800-820-8888</p>
        </div>
        <i class="iconfont icon-dianhua"/>
      </div>
      <div class="icon4" @mouseover="mouseIn(4)" @mouseout="mouseOut(4)" @click="backtoIndex">
        <div class="download-div download-div3" v-show="iconflag4">
          <p>回到主页</p>
        </div>
        <i class="iconfont icon-home"/>
      </div>
      <div
        class="icon5"
        v-show="upflag"
        @click="backToTop"
        @mouseover="mouseIn(5)"
        @mouseout="mouseOut(5)"
      >
        <div class="download-div download-div4" v-show="iconflag5">
          <p>返回顶部</p>
        </div>
        <i class="iconfont icon-xiangshangzhanhang"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      upflag: false,
      iconflag1: false,
      iconflag2: false,
      iconflag3: false,
      iconflag4: false,
      iconflag5: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    // 监听（绑定）滚轮 滚动事件
  },
  methods: {
    handleScroll() {
      // 页面滚动距顶部距离
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 0) {
        this.upflag = true;
      } else {
        this.upflag = false;
      }
    },
    // 回到顶部
    backToTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    backtoIndex(){
      this.$router.push('/pxx/app/index');
    },
    mouseIn(value) {
      switch (value) {
        case 1:
          this.iconflag1 = true;
          break;
        case 2:
          this.iconflag2 = true;
          break;
        case 3:
          this.iconflag3 = true;
          break;
        case 4:
          this.iconflag4 = true;
          break;
        case 5:
          this.iconflag5 = true;
          break;
      }
    },
    mouseOut(value) {
      switch (value) {
        case 1:
          this.iconflag1 = false;
          break;
        case 2:
          this.iconflag2 = false;
          break;
        case 3:
          this.iconflag3 = false;
          break;
        case 4:
          this.iconflag4 = false;
          break;
        case 5:
          this.iconflag5 = false;
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.fix-silder-div {
  position: fixed;
  right: 0;
  top: 0;
  width: 40px;
  height: 100%;
  background-color: #2a2c37;
  display: flex;
  flex-direction: row-reverse;
  > div {
    z-index: 110;
    position: absolute;
    right: 0;
    top: 32%;
    color: #fff;
    width: 100%;
    height: 200px;
    .iconfont {
      color: #fff;
      font-size: 22px;
      line-height: 40px;
    }
    .icon1,
    .icon2,
    .icon3,
    .icon4,
    .icon5 {
      margin-bottom: 10px;
    }
    .icon1:hover,
    .icon2:hover,
    .icon3:hover,
    .icon4:hover,
    .icon5:hover {
      background-color: #565656;
    }
    .download-div {
      position: absolute;
      width: 240px;
      background-color: #fff;
      border-radius: 5px;
      right: 70px;
      box-shadow: 0 0 10px #666;
      p {
        text-align: center;
        font-size: 15px;
        margin-top: 15px;
        color: #495056;
      }
    }
    .download-div1 {
      height: 209px;
      top: -30%;
      img {
        margin-top: 25px;
      }
    }
    .download-div2 {
      top: 49%;
      height: 49px;
    }
    .download-div3 {
      top: 72%;
      height: 49px;
    }
    .download-div4 {
      top: 99%;
      height: 49px;
    }
  }
}
</style>
