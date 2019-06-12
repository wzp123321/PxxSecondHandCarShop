<template>
  <div class="signin-module-div">
    <div class="signin-form">
      <div class="form-all">
        <p>用户登录</p>
        <a-form :form="form" @submit="loginSubmit">
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
              @blur="checkPassword"
              type="password"
              placeholder="请输入您的密码"
            >
              <i slot="prefix" class="iconfont icon-mima"/>
            </a-input>
          </a-form-item>
          <!-- 记住密码多选框 -->
          <a-form-item style="text-align:left;margin-left:20px;margin-bottom:10px">
            <a-checkbox class="form-checkbox" :checked="rememberpass" @click="changeUser">记住密码</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="signin-input">登录</a-button>
          </a-form-item>
          <a-form-item class="goregister">
            <router-link to="/pxx/reg">去注册?</router-link>
            <router-link to="/pxx/app/index" class="backtoindex">回到首页</router-link>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { Decrypt, Encrypt } from "../../../../static/js/utils.js";
import http from "@/assets/api/index.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      keyValidate1: {
        status: "",
        help: ""
      },
      keyValidate2: {
        status: "",
        help: ""
      },
      form: this.$form.createForm(this),
      rememberpass: false
    };
  },
  methods: {
    changeUser() {
      this.rememberpass = !this.rememberpass;
    },
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
      } else if (!/^[\w+-——*/@#$%^&!]{6,16}$/.test(this.password)) {
        this.keyValidate2.status = "error";
        this.keyValidate2.help = "请输入6~15位数字字母或者下划线!";
      } else {
        this.keyValidate2.status = "success";
        this.keyValidate2.help = "";
      }
    },
    loginSubmit(e) {
      this.checkUserName();
      this.checkPassword();
      e.preventDefault();
      // loading
      const loading = this.$loading({
        lock: true,
        text: "登录中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.form.validateFields(err => {
        if (!err) {
          http
            .getUserLogin({ username: this.username, password: this.password })
            .then(response => {
              if (response.data.code === 200) {
                window.sessionStorage.setItem('loginflag','true');
                window.localStorage.setItem(
                  "userId",
                  Encrypt(response.data.data.data.userId)
                );
                window.localStorage.setItem(
                  "useravatar",
                  Encrypt(response.data.data.data.userAvatar)
                );
                window.localStorage.setItem(
                  "username",
                  Encrypt(this.username)
                );
                window.localStorage.setItem(
                  "token",
                  "Bearer" + response.data.data.token
                );
                //  如果选中记住密码
                if (this.rememberpass) {
                  window.localStorage.setItem(
                    "password",
                    Encrypt(this.password)
                  );
                }
                loading.close();
                this.$message.success("登陆成功");
                this.$router.push("/pxx/app/index");
              } else if (response.data.code === 302) {
                loading.close();
                this.keyValidate2.status = "error";
                this.keyValidate2.help = "密码不匹配,请重新输入密码!";
              } else if (response.data.code === 303) {
                loading.close();
                this.keyValidate1.status = "error";
                this.keyValidate1.help = "用户不存在,请重新输入用户名!";
              } else {
                loading.close();
                this.$message.error('登录超时');
              }
            });
        }
      });
    }
  },
  mounted() {
    if (localStorage.getItem("username")) {
      this.username = Decrypt(window.localStorage.getItem("username"));
      this.password = Decrypt(window.localStorage.getItem("password"));
    }
  }
};
</script>
<style lang="less" scoped>
.signin-module-div {
  width: 100%;
  height: 100%;
  background-image: url("../../../../static/imgs/signbackground.jpg");
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
      .signin-input {
        width: 320px;
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

