<template>
  <div class="index-container">
    <!-- 待售 -->
    <b-container class="car-container">
      <b-row>
        <span class="span1">热卖车型</span>
      </b-row>
      <b-row class="fadeInUp animated">
        <b-col xl="3" class="car-col" v-for="(car, index) in cars" :key="index">
          <img :src="car.carAvatar" @click="gotoCarInfo(car.carId)">
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
            <span class="span3">{{car.assessPrice}}万</span>
            <span style="text-decoration:line-through;margin-right:65px;">{{car.truePrice}}万</span>
            <span class="span4">超值</span>
          </p>
        </b-col>
      </b-row>
      <a-pagination simple :current="current" :total="total" @change="pagechange"/>
    </b-container>
    <!-- 订单 -->
    <b-container class="car-container">
      <b-row>
        <span class="span1">已完成订单</span>
      </b-row>
      <b-row class="fadeInUp animated">
        <b-col xl="3" class="car-col" v-for="(order, index) in orders" :key="index">
          <img :src="order.car.carAvatar" @click="gotoOrderInfo(order.orderId)">
          <p>
            <span>{{order.car.brand}}</span>
            <span>{{order.car.series}}</span>
            <span>{{order.car.vehicle}}</span>
          </p>
          <p class="p1">
            <span class="span2">{{order.car.registrationTime}}</span>
            <span class="span2">{{order.car.driverlength}}公里</span>
          </p>
          <p class="p2">
            <span class="span3">成交价:{{order.car.assessPrice}}万</span>
          </p>
        </b-col>
      </b-row>
       <a-pagination simple :current="current1" :total="total1" @change="pagechange1"/>
    </b-container>
  </div>
</template>

<script>
import http from "@/assets/api/index.js";

export default {
  data() {
    return {
      current: 1,
      total: 10,
      current1: 1,
      total1: 10,
      cars: [],
      orders: []
    };
  },
  methods: {
    pagechange(value) {
      this.current = value;
      this.getAllCarData();
    },
    pagechange1(value) {
      this.current1 = value;
      this.getAllOrders();
    },
    gotoCarInfo(carId) {
      this.$router.push({ name: "carinfo", params: { carId: carId } });
    },
    gotoOrderInfo(orderId){
       this.$router.push({ name: "orderinfo", params: { orderId: orderId } });
    },
    getAllCarData() {
      this.cars = [];
      // 获取全部车辆数据
      http
        .getAllCarsList({ status: 1, currentpage: this.current,limit:12 })
        .then(response => {
          if (response.data.code === 200) {
            const cars = response.data.data.data;
            this.cars = cars;
            const total = response.data.data.total;
            this.total = total;
          }
        });
    },
    getAllOrders() {
      this.orders = [];
      // 获取全部车辆数据
      http.getOrderList({current:this.current,limit:12}).then(response => {
        if (response.data.code === 200) {
          const orders = response.data.data.data;
          this.orders = orders;
        }
      });
    }
  },
  mounted() {
    this.getAllCarData();
    this.getAllOrders();
  }
};
</script>
<style lang="less" scoped>
.index-container {
  width: 100%;
  height: 100%;
}
.car-container {
  margin-bottom: 50px;
  .span1 {
    font-size: 24px;
    display: inline-block;
    padding: 25px 10px 8px 10px;
    margin-left: 15px;
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
      border-radius: 3px;
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
      font-size: 15px;
      span {
        display: inline-block;
      }
      .span2 {
        padding-right: 8px;
        border-right: 1px solid #a5abb2;
      }
      .span3 {
        margin-right: 10px;
        font-size: 20px;
        color: #f95523;
      }
      .span4 {
        padding: 3px;
        color: #f88368;
        background: #ffeae5;
      }
    }
    .p2 {
      font-size: 16px;
      span {
        display: inline-block;
      }
      .span3 {
        color: #f95523;
      }
    }
  }
  .car-col:hover {
    box-shadow: 0px 2px 8px #c0c0c0;
    transition: all 400ms ease-in-out;
  }
}
</style>
