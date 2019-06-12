<template>
  <div>
    <div class="real-div">
      <div class="real-head-div">
        <span class="real-span real-span1">个人资料</span>
        <span class="real-span real-span2" v-show="!editpersonflag" @click="editPerson">编辑</span>
        <span class="real-span real-span2" v-show="editpersonflag" @click="SavePerson(1)">保存</span>
      </div>
      <!-- 用户名 -->
      <a-form @submit="realSubmit" class="basic-form">
        <a-form-item :help="keyValidate.help" :validateStatus="keyValidate.status">
          <span class="change-span">用户名：</span>
          <a-input
            v-show="editpersonflag"
            v-model="username"
            class="change-input"
            placeholder="请输入您的用户名"
            @blur="checkUserName"
          />
          <span v-show="!editpersonflag">{{this.username}}</span>
        </a-form-item>
        <!-- 手机号码 -->
        <a-form-item :help="keyValidate1.help" :validateStatus="keyValidate1.status">
          <span class="change-span">手机号码：</span>
          <a-input
            v-show="editpersonflag"
            v-model="telphone"
            class="change-input"
            placeholder="请输入您的手机号码"
            @blur="checkTelPhone"
          />
          <span v-show="!editpersonflag">{{this.telphone || '未填写'}}</span>
        </a-form-item>
        <!-- 邮箱地址 -->
        <a-form-item :help="keyValidate2.help" :validateStatus="keyValidate2.status">
          <span class="change-span">邮箱地址：</span>
          <a-input
            v-show="editpersonflag"
            v-model="email"
            class="change-input"
            placeholder="请输入您的邮箱"
            @blur="checkEmail"
          />
          <span v-show="!editpersonflag">{{this.email || '未填写'}}</span>
        </a-form-item>
        <!-- 用户头像 -->
        <a-form-item class="avatar-form-item">
          <a-upload
            :disabled="!editpersonflag"
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :beforeUpload="beforeUpload"
            @change="handleAvatar"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:204px;height:164px">
          </a-upload>
        </a-form-item>
      </a-form>
    </div>
    <div class="real-div">
      <!-- 社交信息 -->
      <div class="real-head-div">
        <span class="real-span real-span1">社交信息</span>
        <span class="real-span real-span2" v-show="!editsocialflag" @click="editSocial">编辑</span>
        <span class="real-span real-span2" v-show="editsocialflag" @click="SavePerson(2)">保存</span>
      </div>
      <a-form @submit="realSubmit" class="basic-form">
        <a-form-item>
          <span class="change-span">性别：</span>
          <a-radio-group name="radioGroup" v-model="gender" :disabled="!editsocialflag">
            <a-radio :value="1">男</a-radio>
            <a-radio :value="0">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item>
          <span class="change-span">出生日期：</span>
          <a-date-picker
            v-if="userbirthday ===''"
            @change="onBirChange"
            :disabled="!editsocialflag"
          />
          <a-date-picker
            v-else
            :value="moment(userbirthday, dateFormat)"
            @change="onBirChange"
            :disabled="!editsocialflag"
          />
        </a-form-item>
        <a-form-item>
          <div class="row" style="margin-left:-1px">
            <span class="change-span">家庭地址：</span>
            <!--省市区三级联动-->
            <v-distpicker
              :disabled="!editsocialflag"
              :province="province"
              :city="city"
              :area="area"
              @province="onChangeProvince"
              @city="onChangeCity"
              @area="onChangeArea"
            ></v-distpicker>
          </div>
        </a-form-item>
        <a-form-item>
          <span class="change-span">工作：</span>
          <a-input
            v-show="editsocialflag"
            v-model="userwork"
            class="change-input"
            placeholder="请输入您的职业"
          />
          <span v-show="!editsocialflag">{{this.userwork || '未填写'}}</span>
        </a-form-item>
        <a-form-item>
          <span class="change-span">自我描述：</span>
          <a-textarea v-show="editsocialflag" placeholder="自我描述" v-model="description" :rows="4"/>
          <span v-show="!editsocialflag">{{this.description || '未填写'}}</span>
        </a-form-item>
      </a-form>
    </div>

    <!-- 身份认证 -->
    <!-- 第一部分 -->
    <div class="real-div">
      <div class="real-head-div">
        <span class="real-span real-span1">认证信息</span>
        <span class="real-span real-span2" v-show="!editrealflag" @click="editReal">编辑</span>
        <span class="real-span real-span2" v-show="editrealflag" @click="SavePerson(3)">保存</span>
      </div>
      <a-form class="shiming-form">
        <a-form-item :help="keyValidate3.help" :validateStatus="keyValidate3.status">
          <span class="change-span">真实姓名：</span>
          <a-input
            v-show="editrealflag"
            v-model="truename"
            class="change-input"
            placeholder="请输入您的真实姓名"
            @blur="checkTrueName"
          />
          <span v-show="!editrealflag">{{this.truename || '未填写'}}</span>
        </a-form-item>
        <a-form-item :help="keyValidate4.help" :validateStatus="keyValidate4.status">
          <span class="change-span">身份证号：</span>
          <a-input
            v-show="editrealflag"
            v-model="identityno"
            class="change-input"
            placeholder="请输入您的身份证号"
            @blur="checkIdentno"
          />
          <span v-show="!editrealflag">{{this.identityno || '未填写'}}</span>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import http from "@/assets/api/index.js";
import moment from "moment";
import axios from "axios";
import { Decrypt, Encrypt } from "../../../../../../static/js/utils.js";

export default {
  data() {
    return {
      username: "",
      telphone: "",
      email: "",
      imageUrl: "",
      gender: 1,
      userbirthday: "",
      dateFormat: "YYYY-MM-DD",
      userwork: "",
      description: "",
      truename: "",
      identityno: "",
      //省市区
      address: "",
      province: "",
      city: "",
      area: "",
      // 编辑个人资料
      editpersonflag: false,
      editsocialflag: false,
      editrealflag: false,

      keyValidate: {
        status: "",
        help: ""
      },
      keyValidate1: {
        status: "",
        help: ""
      },
      keyValidate2: {
        status: "",
        help: ""
      },
      keyValidate3: {
        status: "",
        help: ""
      },
      keyValidate4: {
        status: "",
        help: ""
      }
    };
  },
  methods: {
    moment,
    // 校验用户名
    checkUserName() {
      if (this.username === "") {
        this.keyValidate.status = "error";
        this.keyValidate.help = "请输入用户名!";
      }
      if (
        this.username !== "" &&
        !/^[\u4e00-\u9fa5]{2,4}$/.test(this.username)
      ) {
        this.keyValidate.status = "error";
        this.keyValidate.help = "真实姓名输入不合法!";
      } else {
        this.keyValidate.status = "success";
        this.keyValidate.help = "";
      }
    },
    // 校验手机号码
    checkTelPhone() {
      if (
        this.telphone !== "" &&
        !/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.telphone)
      ) {
        this.keyValidate1.status = "error";
        this.keyValidate1.help = "手机号码输入不合法!";
      } else {
        this.keyValidate1.status = "success";
        this.keyValidate1.help = "";
      }
    },
    // 校验email
    checkEmail() {
      if (
        this.email !== "" &&
        !/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(
          this.email
        )
      ) {
        this.keyValidate2.status = "error";
        this.keyValidate2.help = "邮箱输入不合法!";
      } else {
        this.keyValidate2.status = "success";
        this.keyValidate2.help = "";
      }
    },
    // 校验真实姓名
    checkTrueName() {
      if (
        this.truename !== "" &&
        !/^[\u4e00-\u9fa5]{2,4}$/.test(this.truename)
      ) {
        this.keyValidate3.status = "error";
        this.keyValidate3.help = "真实姓名输入不合法!";
      } else {
        this.keyValidate3.status = "success";
        this.keyValidate3.help = "";
      }
    },
    // 校验身份证
    checkIdentno() {
      if (
        this.identino !== "" &&
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.identino)
      ) {
        this.keyValidate4.status = "error";
        this.keyValidate4.help = "身份证输入不合法!";
      } else {
        this.keyValidate4.status = "success";
        this.keyValidate4.help = "";
      }
    },
    // 生日
    onBirChange(date, dateString) {
      this.userbirthday = dateString;
    },
    // 省
    onChangeProvince(value) {
      this.province = value.value;
    },
    // 市
    onChangeCity(value) {
      this.city = value.value;
    },
    // 区
    onChangeArea(value) {
      this.area = value.value;
      this.address = this.province + "-" + this.city + "-" + this.area;
    },
    realSubmit() {},
    // 用户头像
    handleAvatar(info) {
      this.handleUpload(info.file);
    },

    // 处理文件上传
    handleUpload(file) {
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
          file: file
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
          this.imageUrl = response.data.data.url;
        } else {
          this.$message.error("上传失败");
        }
      });
    },
    beforeUpload() {
      return false;
    },
    // 修改用户基本资料
    editPerson() {
      this.editpersonflag = true;
    },
    // 编辑社交资料
    editSocial() {
      this.editsocialflag = true;
    },
    // 编辑实名资料
    editReal() {
      this.editrealflag = true;
    },
    // 保存用户资料
    SavePerson(num) {
      switch (num) {
        case 1:
          this.editpersonflag = false;
          break;
        case 2:
          this.editsocialflag = false;
          break;
        case 3:
          this.editrealflag = false;
          break;
        default:
          break;
      }
      http
        .getUserUpdate({
          userName: this.username,
          phoneNumber: this.telphone,
          email: this.email,
          userAvatar: this.imageUrl,
          gender: this.gender,
          birthday: this.userbirthday,
          address: this.address,
          work: this.userwork,
          description: this.description,
          trueName: this.truename,
          identityNo: this.identityno
        })
        .then(response => {
          if (response.data.code === 200) {
            this.$message.success("修改成功");
            window.localStorage.setItem("useravatar", Encrypt(this.imageUrl));
            this.getUserInfo();
          } else {
            this.$message.error(response.data.message);
          }
        });
    },
    getUserInfo() {
      this.keyValidate1.help = "";
      this.keyValidate2.help = "";
      this.keyValidate3.help = "";
      this.keyValidate4.help = "";
      http.getUserInfo().then(response => {
        this.username = response.data.data.userName;
        this.telphone = response.data.data.phoneNumber || "";
        this.email = response.data.data.email || "";
        this.gender = response.data.data.gender;
        this.imageUrl = response.data.data.userAvatar || "";
        this.userbirthday = response.data.data.birthday || "";
        this.userwork = response.data.data.work || "";
        this.truename = response.data.data.trueName || "";
        this.identityno = response.data.data.identityNo || "";
        if (response.data.data.address) {
          this.province = response.data.data.address.split("-")[0];
          this.city = response.data.data.address.split("-")[1];
          this.area = response.data.data.address.split("-")[2];
        }
        this.description = response.data.data.description || "";
      });
    }
  },
  // 页面加载
  mounted() {
    this.getUserInfo();
  }
};
</script>
<style lang="less" scopeds>
.real-div {
  margin-top: 20px;
  margin-left: 20px;
  border: 1px solid #eee;
  .change-span {
    font-size: 14px;
    display: inline-block;
    width: 80px;
    text-align: center;
  }
  .change-input {
    width: 240px;
    height: 34px;
  }
  .real-head-div {
    margin: 0 10px;
    line-height: 52px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    overflow: hidden;
    .real-span {
      display: inline-block;
      margin: 0 10px;
    }
    .real-span1 {
      color: #30c3a6;
      float: left;
    }
    .real-span2 {
      color: #f05b72;
      float: right;
    }
  }
  .basic-form {
    margin-top: 20px;
    text-align: left;
    margin-left: 25px;
    position: relative;
  }
  .real-p {
    text-align: left;
    margin: 0 10px;
    line-height: 52px;
    color: #30c3a6;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
  .shiming-form {
    text-align: left;
    margin-left: 20px;
    margin-top: 20px;
    .upload-img-span {
      font-size: 18px;
      color: #30c3a6;
      display: inline-block;
      margin: 5px 0 5px 56px;
    }
    .real-input {
      width: 115px;
      height: 40px;
      margin-right: 20px;
    }
  }
  .avatar-form-item {
    position: absolute;
    top: -8px;
    right: 5px;
  }
}
</style>
<style>
.ant-upload.ant-upload-select-picture-card {
  width: 200px;
  height: 140px;
}
.distpicker-address-wrapper select {
  padding: 0;
  width: 115px;
  height: 34px;
  font-size: 16px;
}
</style>

