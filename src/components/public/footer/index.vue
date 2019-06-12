<template>
  <div class="footer">
    <b-container>
      <b-row>
        <b-col xl="2">
          <img src="../../../../static/imgs/logo.png" class="footer-logo">
        </b-col>
        <b-col xl="3" class="footer-second">
          <div v-for="(d1,index) in data1" :key="index">{{d1.title}}</div>
        </b-col>
        <b-col xl="2" v-for="(d3,index) in data3" :key="index">
          <img src="../../../../static/imgs/app.png" class="footer-img">
          <p class="footer-p">{{d3.title}}</p>
        </b-col>
        <b-col xl="3" class="footer-second">
          <div v-for="(d2,index) in data2" :key="index">{{d2.title}}</div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: [
        { title: "咨询电话：800-820-8888" },
        { title: "服务监督热线：800-820-8888" },
        { title: "互联网违法或不良信息举报联系方式：" },
        { title: "邮箱： jubao@guazi.com" }
      ],
      data2: [
        { title: "地址：合肥" },
        { title: "邮编：232001" },
        { title: "联系人：麻花藤" },
        { title: "电话：010-89191670" },
        { title: "邮箱：wanzhipeng@163.com" }
      ],
      data3: [
        {
          title: "关注微信"
        },
        {
          title: "下载APP"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.footer {
  padding-top: 20px;
  background: #17171b;
  font-size: 15px;
  .footer-second {
    div {
      text-align: left;
      margin: 4px 0;

      color: #fff;
    }
  }
  .footer-img {
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .footer-p {
    color: #b8b8b8;
  }
  .footer-logo {
    width: 180px;
    height: 100px;
  }
}
</style>

