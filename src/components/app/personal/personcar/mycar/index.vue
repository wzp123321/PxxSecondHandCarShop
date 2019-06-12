<template>
  <!-- 车辆部分 -->
  <b-container class="car-container">
    <b-row>
      <b-col xl="4" class="car-col" v-for="(car, index) in cars" :key="index">
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
  </b-container>
</template>
<script>
import http from "@/assets/api/index.js";
export default {
  data() {
    return {
      cars: []
    };
  },
  methods: {
    gotoCarInfo(carId) {
      this.$router.push({ name: "carinfo", params: { carId: carId } });
    }
  },
  mounted() {
    http.getUserOwnCar().then(response => {
      if (response.data.code === 200) {
        const cars = response.data.data;
        this.cars = cars;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.car-container {
  margin-bottom: 50px;
  .span1 {
    font-size: 24px;
    display: inline-block;
    padding: 25px 10px 8px 10px;
    border-bottom: 3px solid #22ac38;
  }
  .car-col {
    height: 300px;
    padding-top: 10px;
    img {
      width: 100%;
      height: auto;
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
        margin-right: 10px;
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
</style>

