<template>
  <div class="footer">
    <b-container>
      <b-row>
        <b-col xl="2">
          <img src="../../../../static/imgs/logo.png" style="width:180px;height:100px">
        </b-col>
        <b-col xl="3" class="footer-second">
          <div>咨询电话：800-820-8888</div>
          <div>服务监督热线：800-820-8888</div>
          <div>互联网违法或不良信息举报联系方式：</div>
          <div>邮箱： jubao@guazi.com</div>
        </b-col>
        <b-col xl="2">
          <img src="../../../../static/imgs/app.png" class="footer-img">
          <p class="footer-p">关注微信</p>
        </b-col>
        <b-col xl="2">
          <img src="../../../../static/imgs/app.png" class="footer-img">
          <p class="footer-p">下载APP</p>
        </b-col>
        <b-col xl="3" class="footer-second">
          <div>地址：合肥</div>
          <div>邮编：232001</div>
          <div>联系人：麻花藤</div>
          <div>电话：010-89191670</div>
          <div>邮箱：wanzhipeng@163.com</div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {};
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
}
</style>

