<template>
  <div class="sell-div">
    <!-- banner -->
    <div class="sell-banner">
      <img src=".././../../../static/imgs/sell-bg.jpg">
    </div>
    <!-- 第二屏 -->
    <div class="sell-second">
      <b-container class="container-div">
        <b-row>
          <h1 class="bounceInLeft animated">拼夕夕二手车直卖网 二手车行业领军者</h1>
        </b-row>
        <b-row>
          <b-col xl="2" offset-xl="4">
            <a-button @click="showeSellModal">快速卖车</a-button>
          </b-col>
          <b-col xl="2" offset-xl="1">
            <a-button @click="showevaluateModal">快速估价</a-button>
          </b-col>
        </b-row>
        <globalModal :parentData="parentData"></globalModal>
        <SellModal :SellData="SellData"></SellModal>
      </b-container>
    </div>
    <!-- 第三屏 -->
    <b-container class="third-div fadeInUp animated">
      <b-row>
        <h6 class="title">拼夕夕保卖服务</h6>
      </b-row>
      <b-row>
        <b-col v-for="(banner,index) in banners" :key="index">
          <img :src="banner.imgs">
          <div class="div1">{{banner.div1}}</div>
          <div class="div2">{{banner.div2}}</div>
          <div class="div2">{{banner.div3}}</div>
        </b-col>
      </b-row>
    </b-container>
    <!-- 第四屏 -->
    <b-container class="four-div">
      <b-row>
        <h6 class="title">最新成交</h6>
      </b-row>
      <b-row>
        <b-col xl="3" class="car-col" v-for="(car, index) in cars" :key="index">
          <img :src="car.carAvatar">
          <p>
            <span>{{car.brand}}</span>
            <span>{{car.series}}</span>
            <span>{{car.vehicle}}</span>
          </p>
          <p class="p1">
            <span class="span2">{{car.registrationTime}}</span>
            <span class="span2">{{car.driverlength}}公里</span>
            <span>到店服务</span>
          </p>
          <p class="p1">
            <span>成交价：</span>
            <span class="span3">{{car.assessPrice}}万</span>
            <span class="span4">超值</span>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import globalModal from "../../utils/el-modal/GlobalModal.vue";
import SellModal from "../../utils/el-modal/SellCarModal.vue";
import http from "@/assets/api/index.js";

export default {
  components: {
    globalModal,
    SellModal
  },
  data() {
    return {
      cars: [],
      banners:[
        {
          imgs: '.././../../../static/imgs/third-banner1.png',
          div1:'当天拿钱',
          div2:'最高可得50%',
          div3:'过户得余款',
        },
         {
          imgs: '.././../../../static/imgs/third-banner2.png',
          div1:'快速高价',
          div2:'面向全国买家',
          div3:'锁定最优价格',
        },
         {
          imgs: '.././../../../static/imgs/third-banner3.png',
          div1:'托管省心',
          div2:'专人帮你卖车',
          div3:'每次节省3小时',
        },
      ],
      // 父组件传递给估价模板的值
      parentData: {
        dataTochild: false
      },
      SellData: {
        SellTochild: false
      }
    };
  },
  methods: {
    // 显示估价对话框
    showevaluateModal() {
      if (!window.sessionStorage.getItem("loginflag")) {
        this.$message.error("您尚未登录，请前往登录！");
        this.$router.push("/pxx/signin");
      } else {
        this.parentData.dataTochild = true;
      }
    },
    showeSellModal() {
      if (!window.sessionStorage.getItem("loginflag")) {
        this.$message.error("您尚未登录，请前往登录！");
        this.$router.push("/pxx/signin");
      } else {
        http.getUserCheckReal().then(response => {
          if (response.data.data === true) {
            this.SellData.SellTochild = true;
          } else {
            this.$message.error("您尚未实名认证,请前往个人中心进行实名认证!");
          }
        });
      }
    },
    getAllCarData() {
      this.cars = [];
      // 获取全部车辆数据
      http.getAllCarsList({ status: 1 }).then(response => {
        if (response.data.code === 200) {
          const cars = response.data.data.data;
          this.cars = cars;
        }
      });
    }
  },
  mounted() {
    this.getAllCarData();
  }
};
</script>
<style lang="less" scoped>
.sell-div {
  width: 100%;
  height: 100%;
  .sell-banner {
    position: absolute;
    z-index: -1;
    top: 0px;
    left: 0px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .sell-second {
    z-index: 30;
    margin-top: 300px;
    .container-div {
      position: absolute;
      z-index: 5;
      top: 120px;
      left: 340px;
      h1 {
        width: 100%;
        color: #fff;
        font-size: 48px;
        line-height: 80px;
        text-align: center;
        padding-top: 50px;
      }
      .ant-btn-default {
        z-index: 50;
        background-color: #f85c37;
        font-size: 20px;
        color: #fff;
        width: 200px;
        height: 50px;
        opacity: 0.8;
        border: 1px solid #f85c37;
      }
    }
  }
  .third-div {
    height: 420px;
    background: #fff;
    .title {
      width: 100%;
      margin-top: 35px;
      font-size: 32px;
      color: #22ac38;
      line-height: 48px;
      text-align: center;
    }
    .div1 {
      font-size: 20px;
      color: #373b3f;
      line-height: 38px;
      text-align: center;
      padding-bottom: 5px;
    }
    .div2 {
      font-size: 16px;
      color: #7a838d;
      line-height: 26px;
      text-align: center;
    }
  }
}
.four-div {
  margin-bottom: 20px;
  .title {
    width: 100%;
    font-size: 24px;
    color: #495056;
    line-height: 44px;
    text-align: center;
  }
  .span1 {
    font-size: 24px;
    display: inline-block;
    padding: 25px 10px 8px 10px;
    border-bottom: 3px solid #22ac38;
  }
  .car-col {
    height: 300px;
    padding-top: 10px;
    border: 1px solid #eeeeee;
    margin: 5px 0;
    img {
      width: 100%;
      height: 160px;
      border: 1px solid #e9e9e9;
    }
    p {
      margin: 0px 4px;
      text-align: left;
      width: 100%;
      font-size: 17px;
      color: #495056;
      font-weight: 400;
      padding: 4px 0 6px 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .p1 {
      color: #a5abb2;
      font: 14px;
      .span2 {
        display: inline-block;
        padding-right: 8px;
        border-right: 1px solid #a5abb2;
      }
      .span3 {
        display: inline-block;
        margin-right: 40px;
        font-size: 20px;
        color: #f95523;
      }
      .span4 {
        display: inline-block;
        padding: 3px;
        color: #f88368;
        background: #ffeae5;
      }
    }
  }
  .car-col:hover {
    box-shadow: 0px 2px 8px #c0c0c0;
    transition: all 400ms ease-in-out;
  }
}
@media screen and (max-width: 1440px) {
  .container-div {
    top:40px !important;
    left: 60px !important;
  }
  .sell-second {
    margin-top:240px !important;
  }
}
</style>

