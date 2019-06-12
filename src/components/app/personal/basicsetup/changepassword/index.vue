<template>
  <div class="real-div">
    <p class="real-p">密码设置</p>
    <a-form :form="form" @submit="changeSubmit" class="changpwd-form">
      <a-form-item :help="keyValidate1.help" :validateStatus="keyValidate1.status">
        <span class="change-span">原密码</span>
        <a-input
          type="password"
          v-model="oldpassword"
          class="change-input"
          placeholder="请输入您的旧密码"
          @blur="checkOldPassword"
        />
      </a-form-item>
      <a-form-item :help="keyValidate2.help" :validateStatus="keyValidate2.status">
        <span class="change-span">新密码</span>
        <a-input
          type="password"
          v-model="newpassword"
          class="change-input"
          placeholder="请输入您的新密码"
          @blur="checkNewPassword"
        />
      </a-form-item>
      <a-form-item :help="keyValidate3.help" :validateStatus="keyValidate3.status">
        <span class="change-span">确认密码</span>
        <a-input
          type="password"
          v-model="surepassword"
          class="change-input"
          placeholder="请确认您的新密码"
          @blur="checkSurePassword"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" class="sure-button" html-type="submit">确认</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import http from "@/assets/api/index.js";

export default {
  data() {
    return {
      oldpassword: "",
      newpassword: "",
      surepassword: "",
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
      form: this.$form.createForm(this)
    };
  },
  methods: {
    checkOldPassword() {
      if (this.oldpassword === "") {
        this.keyValidate1.status = "error";
        this.keyValidate1.help = "请输入旧密码!";
      } else if (this.oldpassword.length > 15) {
        this.keyValidate1.status = "error";
        this.keyValidate1.help = "密码不超过15位字符!";
      } else {
        this.keyValidate1.status = "success";
        this.keyValidate1.help = "";
      }
    },
    checkNewPassword() {
      if (this.newpassword === "") {
        this.keyValidate2.status = "error";
        this.keyValidate2.help = "请输入新密码!";
      } else if (this.newpassword.length > 15) {
        this.keyValidate2.status = "error";
        this.keyValidate2.help = "密码不超过15位字符!";
      } else {
        this.keyValidate1.status = "success";
        this.keyValidate1.help = "";
      }
    },
    checkSurePassword() {
      if (this.surepassword === "") {
        this.keyValidate3.status = "error";
        this.keyValidate3.help = "请确认新密码!";
      } else if (this.surepassword.length > 15) {
        this.keyValidate3.status = "error";
        this.keyValidate3.help = "密码不超过15位字符!";
      } else if (this.surepassword !== this.newpassword) {
        this.keyValidate3.status = "error";
        this.keyValidate3.help = "两次输入不一致!";
      } else {
        this.keyValidate1.status = "success";
        this.keyValidate1.help = "";
      }
    },
    changeSubmit(e) {
      this.checkOldPassword();
      this.checkNewPassword();
      this.checkSurePassword();
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          http
            .getUserPwdChange({
              oldpassword: this.oldpassword,
              newpassword: this.newpassword
            })
            .then(response => {
              if (response.data.code === 200) {
                this.$message.success("修改成功");
                this.$router.push("/pxx/app/personal/persondata/basic");
              } else if (response.data.code === 302) {
                this.keyValidate1.status = "error";
                this.keyValidate1.help = response.data.message;
              }
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.real-div {
  border: 1px solid #eee;
  .real-p {
    text-align: left;
    margin: 0 10px;
    line-height: 52px;
    color: #30c3a6;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
  .changpwd-form {
    margin-top: 20px;
    text-align: left;
    margin-left: 25px;
    .change-span {
      font-size: 14px;
      display: inline-block;
      width: 80px;
      text-align: center;
    }
    .change-input {
      width: 270px;
      height: 34px;
    }
    .sure-button {
      margin-left: 78px;
      width: 270px;
      height: 40px;
    }
  }
}
</style>

