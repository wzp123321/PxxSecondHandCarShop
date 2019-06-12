<template>
  <div class="signin-module-div">
    <div class="signin-form">
      <div class="form-all">
        <p>用户注册</p>
        <a-form :form="form" @submit="regSubmit">
          <a-form-item :help="keyValidate1.help" :validateStatus="keyValidate1.status">
            <a-input
              class="signin-input"
              v-model="username"
              @blur="checkUserName"
              placeholder="请输入您的用户名"
            >
              <i slot="prefix" class="iconfont icon-person"/>
            </a-input>
          </a-form-item>
          <a-form-item
            style="margin-bottom:10px"
            :help="keyValidate2.help"
            :validateStatus="keyValidate2.status"
          >
            <a-input
              class="signin-input"
              v-model="password"
              type="password"
              @blur="checkPassword"
              placeholder="请输入您的密码"
            >
              <i slot="prefix" class="iconfont icon-mima"/>
            </a-input>
          </a-form-item>
          <!-- 验证码 -->
          <a-form-item
            class="verifyform"
            :help="keyValidate3.help"
            :validateStatus="keyValidate3.status"
          >
            <a-input
              class="signin-input1"
              v-model="verifycode"
              @blur="checkidenfyCode"
              type="verifycode"
              placeholder="请输入您的验证码"
            >
              <i slot="prefix" class="iconfont icon-tupianyanzhengma"/>
            </a-input>
            <div style="float:left" @click="initVerifyCode">
              <VerifyCode :identifyCode="identifyCode"></VerifyCode>
            </div>
          </a-form-item>
          <a-form-item style="margin-top:30px;">
            <a-button type="primary" html-type="submit" class="signin-input">注册</a-button>
          </a-form-item>
          <a-form-item class="goregister">
            <router-link to="/pxx/signin">前往登录?</router-link>
            <router-link to="/pxx/app/index" class="backtoindex">回到首页</router-link>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { Decrypt, Encrypt } from "../../../../static/js/utils.js";
// 引入验证码
import VerifyCode from "../../utils/verifyCode/index.vue";
import http from "@/assets/api/index.js";
export default {
  components: {
    VerifyCode
  },
  data() {
    return {
      username: "",
      password: "",
      verifycode: "",
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
      form: this.$form.createForm(this),
      identifyCode: "",
      words: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  methods: {
    // 用户名校验
    checkUserName() {
      if (this.username === "") {
        this.keyValidate1.status = "error";
        this.keyValidate1.help = "请输入您的用户名!";
      } else {
        this.keyValidate1.status = "success";
        this.keyValidate1.help = "";
      }
    },
    // 密码校验
    checkPassword() {
      if (this.password === "") {
        this.keyValidate2.status = "error";
        this.keyValidate2.help = "请输入您的密码!";
      } else if (!/^[\w+-——*//@#$%^&!]{6,16}$/.test(this.password)) {
        this.keyValidate2.status = "error";
        this.keyValidate2.help = "请输入6~15位数字字母或者下划线!";
      } else {
        this.keyValidate2.status = "success";
        this.keyValidate2.help = "";
      }
    },
    checkidenfyCode() {
      if (this.verifycode === "") {
        this.keyValidate3.status = "error";
        this.keyValidate3.help = "验证码为空!";
      } else if (
        this.verifycode.toUpperCase() !== this.identifyCode.toUpperCase()
      ) {
        this.keyValidate3.status = "error";
        this.keyValidate3.help = "验证码有误，请重新输入!";
        callback("");
      } else {
        this.keyValidate3.status = "success";
         this.keyValidate3.help = "";
      }
    },
    // 生成验证码字符
    initVerifyCode() {
      this.identifyCode = "";
      for (var i = 0; i < 4; i++) {
        const num = Math.floor(Math.random() * 62);
        this.identifyCode += this.words[num];
      }
    },
    // 表单提交
    regSubmit(e) {
      this.checkUserName();
      this.checkPassword();
      e.preventDefault();
      // loading
      const loading = this.$loading({
        lock: true,
        text: "注册中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.form.validateFields(err => {
        if (!err) {
          http
            .getUserRegister({
              username: this.username,
              password: this.password
            })
            .then(response => {
              if (response.data.code === 200) {
                this.$message.success("注册成功");
                // 登陆成功后记住账号密码
                  window.localStorage.setItem(
                    "password",
                    Encrypt(this.password)
                  );
                  window.localStorage.setItem(
                    "username",
                    Encrypt(this.username)
                  );
                loading.close();
                this.$router.push("/pxx/signin");
              } else {
                loading.close();
                this.$message.error("注册失败");
              }
            });
        } else {
          this.initVerifyCode();
        }
      });
    }
  },
  mounted() {
    this.initVerifyCode();
  }
};
</script>
<style lang="less" scoped>
.signin-module-div {
  width: 100%;
  height: 100%;
  background-image: url("../../../../static/imgs/newsignback.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  .signin-form {
    position: fixed;
    right: 0;
    top: 0;
    width: 400px;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    .form-all {
      position: absolute;
      top: 30%;
      width: 100%;
      background-color: #fff;
      opacity: 1 !important;
      .verifyform {
        margin-left: 40px;
        margin-top: 20px;
        overflow: hidden;
      }
      .signin-input {
        width: 320px;
        height: 40px;
      }
      .signin-input1 {
        float: left;
        width: 200px;
        margin-right: 10px;
        height: 40px;
      }
      p {
        text-align: center;
        font-size: 18px;
        margin: 15px 0px;
      }
      .form-checkbox {
        text-align: left;
        display: inline-block;
        margin-left: 20px;
      }
      .iconfont {
        font-size: 18px;
      }
      .iconfont:hover {
        color: #06a5ff;
      }
      .goregister {
        margin-top: -20px;
        text-align: left;
        margin-left: 75px;
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: none;
        }
        .backtoindex {
          margin-left: 148px;
        }
      }
    }
  }
}
</style>

