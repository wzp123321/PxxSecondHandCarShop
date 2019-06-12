<template>
  <a-modal
    :visible="SellData.SellTochild"
    title="卖车之前填好车辆信息"
    width="700px"
    @cancel="hideModal"
    @ok="evaluateCars"
    okText="确认"
    cancelText="取消"
  >
    <!-- 缩略图 -->
    <b-row class="evaluate-row">
      <span class="evaluate-span">缩略图</span>
      <a-upload
        name="avatar"
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        @change="handleCarAvatar"
      >
        <img v-if="carimageUrl" :src="carimageUrl" alt="avatar" style="width:103px;height:103px">
        <div v-else>
          <a-icon :type="caravatarloading ? 'loading' : 'plus'"/>
          <div class="ant-upload-text">{{carAvatarMsg}}</div>
        </div>
      </a-upload>
    </b-row>
    <b-row class="evaluate-row">
      <span class="evaluate-span">车型</span>
      <a-select v-model="selectBrand" class="evaluate-select" @change="handleBrandChange">
        <a-select-option
          v-for="(brand,index) in brands"
          :key="index"
          :value="brand.value"
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
          :value="series.value"
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
          :value="vehicle.value"
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
    <b-row class="evaluate-row">
      <span class="evaluate-span">颜色</span>
      <a-select v-model="carcolor" style="width: 110px" @change="handleColorChange">
        <a-select-option
          v-for="(color, index) in colors"
          :key="index"
          :value="color.value"
        >{{color.value}}</a-select-option>
      </a-select>
      <span class="evaluate-span">座位数</span>
      <a-select v-model="seat" style="width: 110px" @change="handleSeatChange">
        <a-select-option
          v-for="(seat, index) in seats"
          :key="index"
          :value="seat.value"
        >{{seat.value}}</a-select-option>
      </a-select>
      <span class="evaluate-span">浮动价格</span>
      <a-select v-model="spreadPrice" style="width: 110px" @change="handlePriceChange">
        <a-select-option
          v-for="(price, index) in prices"
          :key="index"
          :value="price.value"
        >{{price.value}}</a-select-option>
      </a-select>
    </b-row>
    <b-row class="evaluate-row">
      <span class="evaluate-span">排放量</span>
      <a-select v-model="displacement" style="width: 200px" @change="handledisplacementChange">
        <a-select-option
          v-for="(displacement, index) in displacements"
          :key="index"
          :value="displacement.value"
        >{{displacement.value}}</a-select-option>
      </a-select>
      <span class="evaluate-span">变速箱</span>
      <a-select v-model="transmission" style="width: 200px" @change="handletransmissionChange">
        <a-select-option
          v-for="(transmission, index) in transmissions"
          :key="index"
          :value="transmission.value"
        >{{transmission.value}}</a-select-option>
      </a-select>
    </b-row>
    <!-- 预览图 -->
    <b-row class="evaluate-row">
      <span class="evaluate-span">预览图</span>
      <a-upload multiple :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
        <a-button>
          <a-icon type="upload"/>选择文件
        </a-button>
      </a-upload>
      <a-button
        type="primary"
        @click="handlePreviewAvatar"
        :disabled="fileList.length === 0"
        :loading="uploading"
        style="margin-left: 16px"
      >{{uploading ? '上传中' : '开始上传' }}</a-button>
    </b-row>
  </a-modal>
</template>
<script>
import http from "@/assets/api/index.js";
import axios from "axios";

export default {
  props: {
    SellData: Object
  },
  data() {
    return {
      loading: false,
      carimageUrl: "", //缩略图
      fileList: [],
      previewimgs: "", //预览图
      caravatarloading: false,
      uploading: false,
      previewurls: [],
      carAvatarMsg: "上传图片",
      selectBrand: "请选择品牌",
      brands: [],
      selectSeries: "请选择车系",
      serieses: [],
      selectVehicle: "请选择车型",
      vehicles: [],
      selectyear: "请选择",
      years: [{ key: 1, value: "18年" }, { key: 2, value: "19年" }],
      selectmonth: "请选择",
      userdriverlength: "",
      selfId: -1,
      // 汽车颜色
      carcolor: "请选择",
      // 座位数
      seat: "请选择",
      // 浮动价格
      spreadPrice: "请选择",
      // 排量
      displacement: "请选择",
      // 变速箱
      transmission: "请选择",
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
      colors: [
        { key: 1, value: "红色" },
        { key: 2, value: "黑色" },
        { key: 3, value: "白色" },
        { key: 4, value: "蓝色" },
        { key: 5, value: "粉红色" },
        { key: 6, value: "橙色" },
        { key: 7, value: "咖啡色" },
        { key: 8, value: "黄色" }
      ],
      seats: [
        { key: 1, value: "2座" },
        { key: 2, value: "3座" },
        { key: 3, value: "5座" },
        { key: 4, value: "6座" },
        { key: 5, value: "7座以上" }
      ],
      prices: [
        { key: 1, value: "2000" },
        { key: 2, value: "3000" },
        { key: 3, value: "4000" },
        { key: 4, value: "5000" },
        { key: 5, value: "6000" }
      ],
      displacements: [
        { key: 1, value: "1.0L以下" },
        { key: 2, value: "1.0-1.6L" },
        { key: 3, value: "1.6L-2.0L" },
        { key: 4, value: "2.0L-3.0L" },
        { key: 5, value: "3.0L-4.0L" }
      ],
      transmissions: [{ key: 1, value: "手动" }, { key: 2, value: "自动" }]
    };
  },

  methods: {
    // 隐藏对话框
    hideModal() {
      this.SellData.SellTochild = false;
      this.initSomedata();
    },
    // 关闭对话框后初始化数据
    initSomedata() {
      this.selectBrand = "请选择品牌";
      this.selectSeries = "请选择车系";
      this.selectVehicle = "请选择车型";
      this.selectyear = "请选择";
      this.selectmonth = "请选择";
      this.carcolor = "请选择";
      this.seat = "请选择";
      this.spreadPrice = "请选择";
      this.displacement = "请选择";
      this.transmission = "请选择";
      this.userdriverlength = "";
      this.carimageUrl = "";
      this.fileList = [];
      this.truePrice = "";
      this.previewimgs = "";
      this.previewurls = [];
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
    // 汽车颜色
    handleColorChange(value) {
      this.carcolor = value;
    },
    // 汽车座次
    handleSeatChange(value) {
      this.seat = value;
    },
    // 浮动价格
    handlePriceChange(value) {
      this.spreadPrice = value;
    },
    // 排量
    handledisplacementChange(value) {
      this.displacement = value;
    },
    // 变速箱
    handletransmissionChange(value) {
      this.transmission = value;
    },
    // 父级id
    getParentId(datas, value) {
      datas.forEach(data => {
        if (data.value === value) {
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

    beforeUpload() {
      return false;
    },
    handleCarAvatar(info) {
      this.caravatarloading = true;
      this.carAvatarMsg = "上传中";
      axios({
        url: "http://127.0.0.1:9898/filemodule/file/upload",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          token:
            localStorage.getItem("token") === null
              ? ""
              : localStorage.getItem("token")
        },
        data: {
          file: info.file
        },
        transformRequest: [
          function(oldData) {
            var form = new FormData();
            for (let item in oldData) {
              form.append(item, oldData[item]);
            }
            return form;
          }
        ]
      }).then(response => {
        if (response.data.code === 200) {
          this.$message.success("上传成功");
          this.carimageUrl = response.data.data.url;
          this.caravatarloading = false;
          this.carAvatarMsg = "上传完成";
        } else {
          this.$message.error("上传失败");
        }
      });
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    // 预览图
    handlePreviewAvatar() {
      const previewurls = [];
      for (var i = 0; i < this.fileList.length; i++) {
        axios({
          url: "http://127.0.0.1:9898/filemodule/file/upload",
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
            token:
              localStorage.getItem("token") === null
                ? ""
                : localStorage.getItem("token")
          },
          data: {
            file: this.fileList[i]
          },
          transformRequest: [
            function(oldData) {
              var form = new FormData();
              for (let item in oldData) {
                form.append(item, oldData[item]);
              }
              return form;
            }
          ]
        }).then(response => {
          if (response.data.code === 200) {
            this.$message.success("上传成功");
            previewurls.push(response.data.data.url);
            this.previewurls = previewurls;
          } else {
            this.$message.error("上传失败");
          }
        });
      }
    },
    // 对话框确认
    evaluateCars() {
      this.getDatacheck();
      const loading = this.$loading({
        lock: true,
        text: "提交数据...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      for (var i = 0; i < this.previewurls.length; i++) {
        this.previewimgs += this.previewurls[i] + ",";
      }
      http
        .getCarInsert({
          brand: this.selectBrand,
          Series: this.selectSeries,
          Vehicle: this.selectVehicle,
          carAvatar: this.carimageUrl,
          priviewAvatar: this.previewimgs,
          spreadPrice: this.spreadPrice,
          driverlength: this.userdriverlength,
          color: this.carcolor,
          seat: this.seat,
          transmission: this.transmission,
          displacement: this.displacement,
          registrationTime: this.selectyear + "-" + this.selectmonth
        })
        .then(response => {
          if (response.data.code === 200) {
            this.$message.success("新增成功!您可前往个人中心查看详情");
            this.SellData.SellTochild = false;
            this.initSomedata();
            loading.close();
          } else {
            this.$message.error("新增失败");
          }
        });
    }
  },
  // 监听
  watch: {
    "SellData.SellTochild": function(newVal, oldVal) {
      if (newVal) {
        this.getModalDicBytypeCode(1000, 0, this.brands);
      }
    }
  }
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
