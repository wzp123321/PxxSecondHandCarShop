<template>
  <a-modal
    :visible="parentData.dataTochild"
    title="先估价再卖车，心里倍儿有底"
    width="700px"
    @cancel="hideModal"
    @ok="evaluateCars"
    okText="确认"
    cancelText="取消"
  >
    <b-row class="evaluate-row">
      <span class="evaluate-span">车型</span>
      <a-select v-model="selectBrand" class="evaluate-select" @change="handleBrandChange">
        <a-select-option
          v-for="(brand,index) in brands"
          :key="index"
          :value="brand.key"
        >{{brand.value}}</a-select-option>
      </a-select>
      <a-select
        v-model="selectSeries"
        class="evaluate-select"
        @change="handleSeriesChange"
        :disabled="this.selectBrand ==='请选择品牌'"
      >
        <a-select-option
          v-for="(series,index) in serieses"
          :key="index"
          :value="series.key"
        >{{series.value}}</a-select-option>
      </a-select>
      <a-select
        v-model="selectVehicle"
        class="evaluate-select1"
        :disabled="this.selectSeries ==='请选择车系'"
      >
        <a-select-option
          v-for="(vehicle,index) in vehicles"
          :key="index"
          :value="vehicle.key"
        >{{vehicle.value}}</a-select-option>
      </a-select>
    </b-row>
    <b-row class="evaluate-row">
      <span class="evaluate-span">上牌时间</span>
      <a-select v-model="selectyear" class="evaluate-select1">
        <a-select-option
          v-for="(year,index) in years"
          :key="index"
          :value="year.value"
        >{{year.value}}</a-select-option>
      </a-select>
      <a-select v-model="selectmonth" class="evaluate-select1">
        <a-select-option
          v-for="(month,index) in months"
          :key="index"
          :value="month.value"
        >{{month.value}}</a-select-option>
      </a-select>
    </b-row>
    <b-row class="evaluate-row">
      <span class="evaluate-span">行驶里程</span>
      <a-input placeholder="行驶里程" class="evaluate-input" v-model="userdriverlength"/>
      <span class="evaluate-span">万公里</span>
    </b-row>
    <b-row v-loading="loading">
      <p class="assess-modal-p1">{{this.assessmessage}}</p>
      <p
        v-show="this.assessmessage!=='' && this.assessmessage!== '行驶里程过大,无法估价'"
        class="assess-modal-p2"
      >
        若您对此次估价满意,可
        <a @click="closeModal">点此</a>前往卖车
      </p>
    </b-row>
  </a-modal>
</template>
<script>
import http from "@/assets/api/index.js";
export default {
  props: {
    parentData: Object
  },
  data() {
    return {
      loading: false,
      selectBrand: "请选择品牌",
      brands: [],
      selectSeries: "请选择车系",
      serieses: [],
      selectVehicle: "请选择车型",
      vehicles: [],
      selectyear: "请选择",
      years: [{ key: 1, value: "18年" }, { key: 2, value: "19年" }],
      selectmonth: "请选择",
      months: [
        { key: 1, value: "1月" },
        { key: 2, value: "2月" },
        { key: 3, value: "3月" },
        { key: 4, value: "4月" },
        { key: 5, value: "5月" },
        { key: 6, value: "6月" },
        { key: 7, value: "7月" },
        { key: 8, value: "8月" },
        { key: 9, value: "9月" },
        { key: 10, value: "10月" },
        { key: 11, value: "11月" },
        { key: 12, value: "12月" }
      ],
      userdriverlength: "",
      selfId: -1,
      assesscheck: false,
      assessprice: 0,
      assessmessage: ""
    };
  },

  methods: {
    // 隐藏对话框
    hideModal() {
      this.parentData.dataTochild = false;
      this.initSomedata();
    },
    closeModal() {
      this.parentData.dataTochild = false;
      this.initSomedata();
      this.$router.push("/pxx/app/sell");
    },
    // 关闭对话框后初始化数据
    initSomedata() {
      this.selectBrand = "请选择品牌";
      this.selectSeries = "请选择车系";
      this.selectVehicle = "请选择车型";
      this.selectyear = "请选择";
      this.selectmonth = "请选择";
      this.userdriverlength = "";
    },
    // 品牌修改
    handleBrandChange(value) {
      this.getParentId(this.brands, value);
      this.serieses = [];
      this.selectSeries = "请选择车系";
      this.getModalDicBytypeCode(1001, this.selfId, this.serieses);
    },
    // 车系修改
    handleSeriesChange(value) {
      this.vehicles = [];
      this.getParentId(this.serieses, value);
      this.selectVehicle = "请选择车型";
      this.getModalDicBytypeCode(1002, this.selfId, this.vehicles);
    },
    // 父级id
    getParentId(datas, value) {
      datas.forEach(data => {
        if (data.key === value) {
          this.selfId = data.id;
        }
      });
    },
    // 按照类别获取字典列表
    getModalDicBytypeCode(typeCode, parentId, datas) {
      http
        .getDicBytypeCode({ typeCode: typeCode, parentId: parentId })
        .then(response => {
          const data = response.data.data;
          for (var i = 0; i < data.length; i++) {
            datas.push(data[i]);
          }
        });
    },
    // 校验方法
    getDatacheck() {
      this.assesscheck = false;
      if (this.selectBrand === "请选择品牌") {
        this.$message.error("请选择品牌！");
        this.assesscheck = true;
        return;
      }
      if (this.selectSeries === "请选择车系") {
        this.$message.error("请选择车系！");
        this.assesscheck = true;
        return;
      }
      if (this.selectVehicle === "请选择车型") {
        this.$message.error("请选择车型！");
        this.assesscheck = true;
        return;
      }
      if (this.selectyear === "") {
        this.$message.error("请选择上牌年份");
        this.assesscheck = true;
        return;
      }
      if (this.selectmonth === "") {
        this.$message.error("请选择上牌月份");
        this.assesscheck = true;
        return;
      }
      if (this.userdriverlength === "") {
        this.$message.error("请选择行驶里程");
        this.assesscheck = true;
        return;
      }
      if (
        !/^(([1-9][0-9]*)|(([0]\.\d{0,3}|[1-9][0-9]*\.\d{0,3})))$/.test(
          this.userdriverlength
        )
      ) {
        this.$message.error("行驶里程应为正数");
        this.assesscheck = true;
        return;
      }
    },
    // 对话框确认
    evaluateCars() {
      this.getDatacheck();
      if (this.assesscheck === false) {
        this.assessprice = 0;
        this.loading = true;
        http
          .getDicAssess({
            key: this.selectVehicle,
            lisencedate: this.selectyear + "" + this.selectmonth,
            drivelength: parseFloat(this.userdriverlength)
          })
          .then(response => {
            const assessprice = response.data.data;
            this.assessprice = assessprice;
            setTimeout(() => {
              this.loading = false;
              this.assessmessage =
                this.assessprice <= 0
                  ? "行驶里程过大,无法估价"
                  : "预估价格:" + this.assessprice + "万元";
            }, 2000);
          });
      }
    }
  },
  // 监听
  watch: {
    "parentData.dataTochild": function(newVal, oldVal) {
      if (newVal) {
        this.getModalDicBytypeCode(1000, 0, this.brands);
      }
    }
  },
  
};
</script>
<style lang="less" scoped>
.assess-modal-p1 {
  width: 100%;
  text-align: center;
  font-size: 28px;
  color: #f81717;
}
.assess-modal-p2 {
  width: 80%;
  margin: 0 10%;
  text-align: right;
  a {
    color: #06a5ff;
  }
}
.evaluate-row {
  margin: 35px 0;
}
.evaluate-span {
  display: inline-block;
  font-size: 18px;
  width: 100px;
  text-align: center;
  line-height: 30px;
  color: #495056;
}
.evaluate-select {
  width: 115px;
  margin-right: 15px;
}
.evaluate-select1 {
  width: 245px;
  margin-right: 15px;
}

.evaluate-input {
  width: 430px;
  height: 40px;
}
</style>

<style>
.ant-modal-title {
  font-size: 24px !important;
  color: #495056;
  text-align: center !important;
}
.ant-select-selection--single {
  height: 40px;
}
.ant-select-selection__rendered {
  padding-top: 5px;
}
</style>
