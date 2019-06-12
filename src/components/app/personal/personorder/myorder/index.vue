<template>
  <div>
    <div v-show="current!==-1">
      <a-steps
        class="steps-module"
        v-for="(order, index) in orders"
        :key="index"
        :current="current-1"
      >
        <a-step>
          <template slot="title">用户看车</template>
          <span slot="description">等待用户看车</span>
        </a-step>
        <a-step>
          <template slot="title">用户付款</template>
          <span slot="description">正在等待用户付款</span>
        </a-step>
        <a-step>
          <template slot="title">卖家审核</template>
          <span slot="description">正在等待卖家审核</span>
        </a-step>
        <a-step>
          <template slot="title">官方审核</template>
          <span slot="description">正在等待官方审核</span>
        </a-step>
        <a-step>
          <template slot="title">订单完成</template>
          <span slot="description">恭喜您此次订单已完成</span>
        </a-step>
      </a-steps>
      <b-row>
        <b-col class="liucheng" v-show="current === 1 && parseInt(id)===orders[0].buyerId">
          <p>当前流程:用户现场看车</p>
          <p>
            <a-button @click="cancelOrder">取消订单</a-button>
            <a-button type="primary" @click="surelook">确认看车</a-button>
          </p>
        </b-col>
        <b-col class="liucheng" v-show="current === 1 && parseInt(id)!==orders[0].buyerId">
          <p>当前流程:等待买家看车</p>
        </b-col>
        <b-col class="liucheng" v-show="current === 2 && parseInt(id)===orders[0].buyerId">
          <p style="text-align:left;margin-left:40px;margin-bottom:20px;">当前流程:用户付款</p>
          <div v-if="orders[0]" style="text-align:center;margin-bottom:15px">
            当前待付金额￥
            <span style="font-size:24px;color:red">{{orders[0].dealprice}}</span>万元
          </div>
          <div class="paydiv">
            <img
              class="payimg"
              src="../../../../../../static/imgs/zhifubao.png"
              style="width:30px;height:30px"
            >
            <span class="payspan">支付宝付款</span>
            <a-radio :checked="zhifu===1" @click="chooespay(1)"></a-radio>
          </div>
          <div class="paydiv">
            <img
              class="payimg"
              src="../../../../../../static/imgs/weixin.png"
              style="width:30px;height:30px"
            >
            <span class="payspan">微信付款</span>
            <a-radio :checked="zhifu===2" @click="chooespay(2)"></a-radio>
          </div>
          <a-button type="primary" class="paybutton" @click="surepay">确认付款</a-button>
        </b-col>
        <b-col class="liucheng" v-show="current === 2 && parseInt(id)!==orders[0].buyerId">
          <p>当前流程:等待买家付款</p>
        </b-col>
        <b-col class="liucheng" v-show="current === 3 && parseInt(id)===orders[0].sellerId">
          <p>当前流程:卖家确认收款</p>
          <p>
            <a-button type="primary" @click="suregetmoney">确认收款</a-button>
          </p>
        </b-col>
        <b-col class="liucheng" v-show="current === 3 && parseInt(id)!==orders[0].sellerId">
          <p>当前流程:等待卖家确认收款</p>
        </b-col>
        <b-col class="liucheng" v-show="current === 4">
          <p>当前流程:等待官方审核</p>
        </b-col>
        <b-col class="liucheng" v-show="current === 5">
          <p>订单完成</p>
        </b-col>
      </b-row>
      <a-modal
        title="用户付款"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
        okText="确认"
        cancelText="取消"
      >
       <InputPwd :id="pwdid"></InputPwd>
      </a-modal>
    </div>
    <b-container v-show="current ===-1">
      <p style=" font-size: 18px;">暂无数据</p>
    </b-container>
  </div>
</template>
<script>
import InputPwd from '../../../../utils/pwdmodule/index.vue'
import { Decrypt, Encrypt } from "../../../../../../static/js/utils.js";
import http from "@/assets/api/index.js";
export default {
  components:{
    InputPwd,
  },
  data() {
    return {
      orders: [],
      current: -1,
      id: "",
      pwdid:"1",
      visible: false,
      zhifu: 0
    };
  },
  methods: {
    chooespay(num) {
      this.zhifu = num;
    },
    // 取消订单
    cancelOrder() {
      this.$confirm("此操作将取消订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http
            .getCancelorder({
              orderId: this.orders[0].orderId
            })
            .then(response => {
              if (response.data.code === 200) {
                this.$notification.open({
                  message: "取消订单通知",
                  description: "您取消了订单！",
                  onClick: () => {}
                });
                this.$router.push("/pxx/app/personal/orderback");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 确认看车
    surelook() {
      this.$confirm("是否确认现场看车?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http
            .getUserLook({
              orderId: this.orders[0].orderId
            })
            .then(response => {
              if (response.data.code === 200) {
                this.$notification.open({
                  message: "已看车通知",
                  description: "您已确认看车",
                  onClick: () => {}
                });
                this.$router.push("/pxx/app/personal/orderback");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    // 确认付款
    surepay() {
      const loading = this.$loading({
        lock: true,
        text: "正在调起支付",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });

      setTimeout(() => {
        loading.close();
        this.visible = true;
      }, 1000);
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      const loading = this.$loading({
        lock: true,
        text: "正在完成支付",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      http
        .getUserPay({
          orderId: this.orders[0].orderId
        })
        .then(response => {
          if (response.data.code === 200) {
            this.$notification.open({
              message: "付款成功通知",
              description: "您已成功支付！",
              onClick: () => {}
            });
            setTimeout(() => {
              loading.close();
              this.visible = false;
            }, 1000);
            this.$router.push("/pxx/app/personal/orderback");
          }
        });
    },
    // 确认收款
    suregetmoney() {
      this.$confirm("是否确认收款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http
            .getSellerSure({
              orderId: this.orders[0].orderId
            })
            .then(response => {
              if (response.data.code === 200) {
                this.$notification.open({
                  message: "确认收款通知",
                  description: "您已确认收款！",
                  onClick: () => {}
                });
                this.$router.push("/pxx/app/personal/orderback");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    getPageData() {
      http.getUserOrders().then(response => {
        if (response.data.code === 200 && response.data.data.length !== 0) {
          const orders = response.data.data;
          this.orders = orders;
          const current = response.data.data[0].status;
          this.current = current;
        }
      });
      if (window.localStorage.getItem("userId")) {
        this.id = Decrypt(window.localStorage.getItem("userId"));
      }
    }
  },
  mounted() {
    this.getPageData();
  }
};
</script>
<style lang="less" scoped>
.steps-module {
  margin-top: 50px;
}
.liucheng {
  margin-top: 20px;
  padding-top: 20px;
  background: #eee;
  p {
    font-size: 18px;
  }

  button {
    width: 130px;
    height: 46px;
    margin: 0 10px;
    border-radius: 4px;
  }
  .paydiv {
    text-align: center;
    margin: 10px 0;
    .payimg {
      margin-right: 10px;
    }
    .payspan {
      display: inline-block;
      margin-right: 120px;
      width: 80px;
      text-align: center;
    }
  }
  .paybutton {
    width: 120px;
    height: 35px;
    margin-left: 520px;
    margin-bottom: 20px;
  }
}
</style>
