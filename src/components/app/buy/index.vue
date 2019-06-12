<template>
  <a-spin tip="加载中..." :spinning="carloading">
    <!-- 选项栏 -->
    <b-container style="margin-top:50px">
      <div class="choose-container">
        <span class="choose-type-span">品牌</span>
        <span class="choose-code-span" @click="getAllCarData">不限</span>
        <span
          class="choose-code-span"
          v-for="(brand, index) in brands"
          :key="index"
          @click="chooseBrand(brand.value)"
        >{{brand.value}}</span>
      </div>
      <div class="choose-container">
        <span class="choose-type-span">车系</span>
        <span class="choose-code-span" @click="getAllCarData">不限</span>
        <span
          class="choose-code-span"
          v-for="(serie, index) in series"
          :key="index"
          @click="chooseSeries(serie.value)"
        >{{serie.value}}</span>
      </div>
      <div class="choose-container">
        <span class="choose-type-span">价格</span>
        <span class="choose-code-span" @click="getAllCarData">不限</span>
        <span
          class="choose-code-span"
          v-for="(price, index) in prices"
          :key="index"
          @click="choosePrice(price.key)"
        >{{price.value}}</span>
      </div>
    </b-container>
    <!-- 车辆部分 -->
    <b-container class="car-container" v-show="cars">
      <b-row>
        <span class="span1">全部</span>
      </b-row>
      <b-row>
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
    <b-container v-show="cars.length===0">
      <b-row>
        <p class="nodata">暂无数据</p>
      </b-row>
    </b-container>
  </a-spin>
</template>
<script>
import http from "@/assets/api/index.js";

export default {
  data() {
    return {
      carloading: false,
      current: 1,
      total: 10,
      brand: "",
      serie: "",
      minprice: 0,
      maxprice: 0,
      params: [],
      brands: [],
      series: [],
      prices: [
        { key: 1, value: "3万以下" },
        { key: 2, value: "3-5万" },
        { key: 3, value: "5-7万" },
        { key: 4, value: "7-10万" },
        { key: 5, value: "10-15万" },
        { key: 6, value: "15-30万" }
      ],
      cars: []
    };
  },
  methods: {
    pagechange(value) {
      this.current = value;
      // 获取全部车辆数据
      http
        .getAllCarsList({ currentpage: this.current, status: 1 })
        .then(response => {
          if (response.data.code === 200) {
            const cars = response.data.data.data;
            this.cars = cars;
          }
        });
    },
    chooseBrand(value) {
      this.carloading = true;
      this.brand = value;
      this.getDatabyType(1);
    },
    chooseSeries(value) {
      this.carloading = true;
      this.serie = value;
      this.getDatabyType(2);
    },
    choosePrice(value) {
      this.carloading = true;
      switch (value) {
        case 1:
          this.minprice = 0;
          this.maxprice = 3;
          break;
        case 2:
          this.minprice = 3;
          this.maxprice = 5;
          break;
        case 3:
          this.minprice = 5;
          this.maxprice = 7;
          break;
        case 4:
          this.minprice = 7;
          this.maxprice = 10;
          break;
        case 5:
          this.minprice = 10;
          this.maxprice = 15;
          break;
        case 6:
          this.minprice = 15;
          this.maxprice = 30;
          break;
        default:
          break;
      }
      this.getDatabyType(3);
    },
    gotoCarInfo(carId) {
      this.$router.push({ name: "carinfo", params: { carId: carId } });
    },
    getAllCarData() {
      this.cars = [];
      // 获取全部车辆数据
      http.getAllCarsList({ status: 1 }).then(response => {
        if (response.data.code === 200) {
          const cars = response.data.data.data;
          this.cars = cars;
          const total = response.data.data.total;
          this.total = total;
        }
      });
    },
    getDatabyType(num) {
      this.cars = [];
      switch (num) {
        case 1:
          this.params = { Brand: this.brand };
          break;
        case 2:
          this.params = { Series: this.serie };
          break;
        case 3:
          this.params = { minprice: this.minprice, maxprice: this.maxprice };
          break;
        default:
          break;
      }
      //按类别获取车辆数据
      http.getCarbySometype(this.params).then(response => {
        if (response.data.code === 200) {
          const cars = response.data.data.data;
          this.cars = cars;
          const total = response.data.data.total;
          this.total = total;
          this.carloading = false;
        }
      });
    }
  },
  async mounted() {
    this.carloading = true;
    await http.getDictionaryBytypecode({ typeCode: 1000 }).then(response => {
      if (response.data.code === 200) {
        const brands = response.data.data.data;
        this.brands = brands;
      }
    });
    await http.getDictionaryBytypecode({ typeCode: 1001 }).then(response => {
      if (response.data.code === 200) {
        const series = response.data.data.data;
        this.series = series;
      }
    });
    await http.getDictionaryBytypecode({ typeCode: 1002 }).then(response => {
      if (response.data.code === 200) {
        const vehicles = response.data.data.data;
        this.vehicles = vehicles;
      }
    });
    this.getAllCarData();
    this.carloading = false;
  }
};
</script>
<style lang="less" scoped>
.choose-container {
  border: 1px solid #999;
  text-align: left;
  .choose-type-span {
    display: inline-block;
    padding: 15px 25px;
    font-size: 14px;
    color: #7a838d;
    background: #fafafa;
  }
  .choose-code-span {
    padding: 15px 15px;
    font-size: 14px;
  }
}
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
.nodata {
  width: 100%;
  font-size: 18px;
  text-align: center;
}
</style>


