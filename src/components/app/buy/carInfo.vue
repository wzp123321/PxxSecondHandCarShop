<template>
  <a-spin tip="加载中..." :spinning="carloading">
    <b-container>
      <b-row class="bread-row">
        <a-breadcrumb>
          <a-breadcrumb-item href>
            <i class="iconfont icon-fl-jia"/>
          </a-breadcrumb-item>
          <a-breadcrumb-item href>
            <i class="iconfont icon-cheliang"/>
            <span>{{this.$route.meta.title}}</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item>{{car.brand}}</a-breadcrumb-item>
          <a-breadcrumb-item>{{car.series}}</a-breadcrumb-item>
          <a-breadcrumb-item>{{car.vehicle}}</a-breadcrumb-item>
        </a-breadcrumb>
      </b-row>
      <b-row class="second-row">
        <b-col xl="6">
          <!-- 跑马灯 -->
          <a-carousel arrows dotsClass="slick-dots slick-thumb">
            <a slot="customPaging" slot-scope="props">
              <img :src="getImgUrl(props.i)">
            </a>
            <div v-for="(img, index) in previewimgs" :key="index">
              <img :src="img" style="border-radius:8px">
            </div>
          </a-carousel>
        </b-col>
        <b-col xl="6">
          <b-row style=" margin-bottom: 22px;">
            <span class="banner-span1">{{car.vehicle}}</span>
            <span class="banner-span2">严选车</span>
            <span class="banner-span3" v-show="parseInt(id) === user.userId">车主</span>
          </b-row>
          <b-row style=" margin-bottom: 22px;">
            <!-- bootstrapvue布局 -->
            <b-col sm>
              <div class="info-second-div1">{{car.registrationTime}}</div>
              <div class="info-second-div2">上牌时间</div>
            </b-col>
            <b-col sm>
              <div class="info-second-div1">{{car.driverlength}}万公里</div>
              <div class="info-second-div2">行驶里程</div>
            </b-col>
            <b-col sm>
              <div class="info-second-div1">{{car.displacement}}</div>
              <div class="info-second-div2">排量</div>
            </b-col>
            <b-col sm>
              <div class="info-second-div1">{{car.transmission}}</div>
              <div class="info-second-div2">变速箱</div>
            </b-col>
          </b-row>
          <b-row>
            <span class="banner-span4">{{car.assessPrice}}万元</span>
            <span class="banner-span5">新车指导价{{car.truePrice}}万(含税)</span>
            <span class="banner-span6">急降{{car.spreadPrice}}元</span>
          </b-row>
          <!-- 车主信息 -->
          <div class="owner-info">
            <b-row>
              <span class="info-second-div1">车主信息 :</span>
            </b-row>
            <b-row class="info-row1">
              <span class="span1">{{user.trueName}}</span>
              <span class="span2" v-text="user.gender === 1 ? '先生' : '女士'"></span>
              <span class="span3">
                <i class="iconfont icon-dianhua" style="font-size:22px"/>
                {{user.phoneNumber}}
              </span>
              <span class="span4">
                <i class="iconfont icon-youxiang" style="font-size:24px"/>
                {{user.email}}
              </span>
            </b-row>
            <b-row class="info-row2">
              <span class="span1">
                <i class="iconfont icon-34" style="font-size:24px"/>
                {{user.work}}
              </span>
              <span class="span2">
                <i class="iconfont icon-dizhi" style="font-size:24px"/>
                {{user.address}}
              </span>
            </b-row>
          </div>
          <b-row class="button-row">
            <a-button
              class="button1"
              @click="showmodal"
              :disabled="parseInt(this.id) === this.user.userId"
            >预约购车</a-button>
            <a-button class="button2">在线咨询</a-button>
          </b-row>
          <!-- 确认预约对话框 -->
          <a-modal
            title="预约购车"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            okText="确认"
            cancelText="取消"
          >
            <a-spin :tip="realtip" :spinning="realloading">
              <div class="order-div1">车型:{{car.vehicle}}</div>
              <div class="order-div2">是否预约看车？</div>
            </a-spin>
          </a-modal>
        </b-col>
      </b-row>
    </b-container>
  </a-spin>
</template>
<script>
import http from "@/assets/api/index.js";
import { Decrypt, Encrypt } from "../../../../static/js/utils.js";

export default {
  data() {
    return {
      realloading: false,
      realtip: "",
      carloading: false,
      visible: false,
      ownerflag: false,
      id: "",
      car: {},
      user: {},
      previewimgs: [],
      previewavatar: ""
    };
  },
  methods: {
    getImgUrl(i) {
      return this.previewimgs[i];
    },
    handleCancel() {
      this.realloading = false;
      this.visible = false;
      this.realtip = "校验身份中...";
    },
    showmodal() {
      this.realloading = false;
      this.visible = true;
      this.realtip = "校验身份中...";
    },
    async handleOk() {
      if (!window.sessionStorage.getItem("loginflag")) {
        this.$message.error("您尚未登录，请前往登录！");
        this.$router.push("/pxx/signin");
      } else {
        this.realloading = true;
        this.realtip = "校验身份中...";
        await http.getUserCheckReal().then(response => {
          if (response.data.data) {
            this.realtip = "提交信息中...";
            http
              .getOrderAdd({
                sellerId: this.car.ownerId,
                carId: this.car.carId,
                price: this.car.assessPrice
              })
              .then(response => {
                if (response.data.code === 200) {
                  this.$message.success("预约成功,可前往个人中心查看进度!");
                  this.visible = false;
                  this.realtip = "";
                }
              });
          } else {
            this.$message.error("您尚未实名认证!");
          }
        });
      }
    }
  },
  // 异步加载
  async mounted() {
    this.carloading = true;
    // 等待
    await http
      .getCarInfo({ carId: this.$route.params.carId })
      .then(response => {
        if (response.data.code === 200) {
          const car = response.data.data.car;
          this.car = car;
          const user = response.data.data.user;
          this.user = user;
          const previewavatar = response.data.data.car.priviewAvatar;
          this.previewavatar = previewavatar;
          this.previewimgs = this.previewavatar.split(",");
          this.previewimgs.splice(this.previewimgs.length - 1, 1);
        }
      });
    if (window.localStorage.getItem("userId")) {
      this.id = Decrypt(window.localStorage.getItem("userId"));
    }
    this.carloading = false;
  }
};
</script>
<style scoped >
.bread-row {
  margin-top: 20px;
  color: #495056;
  line-height: 63px;
  font-size: 13px;
}
.second-row {
  margin-top: 20px;
  padding-bottom: 40px;
}

.banner-span1 {
  display: inline-block;
  color: #495056;
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
  padding-top: 7px;
  max-height: 60px;
  overflow: hidden;
}
.banner-span2 {
  color: #7a838d;
  display: inline-block;
  padding: 10px 7px;
  font-size: 14px;
  text-align: center;
  background-color: #f6f6f6;
  margin-left: 10px;
}
.banner-span3 {
  display: inline-block;
  padding: 10px 7px;
  font-size: 16px;
  text-align: center;
  color: red;
  background: #fcf2d5;
  margin-left: 10px;
}
.banner-span4 {
  display: inline-block;
  font-size: 28px;
  color: #f95523;
  font-weight: 400;
  line-height: 30px;
  padding-top: 12px;
  padding-left: 17px;
  max-height: 60px;
  overflow: hidden;
}
.banner-span5 {
  text-decoration: line-through;
  color: #a5abb2;
  padding-top: 20px;
  padding-left: 20px;
  font-size: 14px;
  display: inline-block;
}
.banner-span6 {
  display: inline-block;
  font-size: 14px;
  padding-top: 20px;
  padding-left: 150px;
  text-align: center;
  color: #f95523;
}
.info-second-div1 {
  color: #495056;
  font-size: 18px;
  font-family: Microsoft Yahei;
  padding-bottom: 3px;
}
.info-second-div2 {
  text-align: center;
  color: #a5abb2;
  line-height: 24px;
  font-size: 12px;
  position: relative;
}

/* For demo */
.ant-carousel >>> .slick-dots {
  height: auto;
}
.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
.ant-carousel >>> .slick-thumb {
  bottom: -75px;
}
.ant-carousel >>> .slick-thumb li {
  width: 100px;
  height: 65px;
}
.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  border: 3px solid #22ac38;
  filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
<style lang="less">
.owner-info {
  padding: 15px 24px;
  background: #d4efd6;
  margin-top: 10px;
  border-radius: 3px;
}
.info-row1 {
  .span1 {
    display: inline-block;
    font-size: 18px;
    padding-top: 10px;
    text-align: center;
    color: #f95523;
  }
  .span2 {
    display: inline-block;
    font-size: 14px;
    padding-top: 15px;
    margin-left: 5px;
  }
  .span3 {
    display: inline-block;
    font-size: 14px;
    padding-top: 6px;
    padding-left: 70px;
    margin-left: 5px;
  }
  .span4 {
    display: inline-block;
    font-size: 14px;
    padding-top: 6px;
    padding-left: 70px;
    margin-left: 5px;
  }
}
.info-row2 {
  .span1 {
    display: inline-block;
    font-size: 14px;
    padding-top: 6px;
    margin-left: 5px;
  }
  .span2 {
    display: inline-block;
    font-size: 14px;
    padding-top: 6px;
    padding-left: 86px;
    margin-left: 5px;
  }
}
.button-row {
  margin-top: 20px;
  .button1 {
    background-color: #fd6c34;
    width: 174px;
    height: 52px;
    line-height: 52px;
    vertical-align: top;
    color: #fff;
    margin: 0 60px;
    border-radius: 2px;
    text-align: center;
    font-size: 20px;
  }
  .button2 {
    width: 172px;
    height: 52px;
    line-height: 52px;
    border: 1px solid #2abd53;
    background-color: #f6fcf7;
    color: #2abd53;
    margin-right: 0;
  }
}
.order-div1 {
  font-size: 20px;
}
</style>


