<template>
  <div>
    <!-- <AppHeadView title="微信绑定"></AppHeadView> -->
    <div
      style="
        display: flex;
        height: 44px;
        background-color: #fff;
        text-align: center;
        font-size: 20px;
        border-bottom: 1px solid #eee;
      "
    >
      <div
        class="nav_left"
        style="
          flex: 1;
          height: 49px;
          line-height: 49px;
          font-size: 15px;
          color: #666;
        "
        @click="handleGoBack"
      >
        返回
      </div>
      <div
        class="nav_center"
        style="flex: 3; line-height: 44px; color: #666; font-size: 18px"
      >
        绑定微信
      </div>
      <div class="nav_right" style="flex: 1; line-height: 44px"></div>
    </div>

    <div class="m-l-5 m-r-5">
      <loginForm
        :model="formModel"
        :data="formData"
        class="m-t-10 register-form"
      >
        <div
          class="send"
          :style="{ color: isWaiting ? '#a2a6b0' : '#1677ff' }"
          @click="sendVerify"
        >
          {{ isWaiting ? isWaiting + "s" : "发送验证码" }}
        </div>
      </loginForm>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Cookies from "js-cookie";
import Token from "@ocv/web/src/http/token";
import loginForm from "../../components/view/loginForm";
import AppHeadView from "../../components/view/app-headview";
import AuthApi from "../../api/api-auth";

export default {
  data() {
    const vm = this;
    return {
      isWaiting: false,
      iid:"",
      timer: null,
      sendCode: "",
      isupCode: "",
      formModel: [
        {
          prop: "phoneNumber",
          bind: { label: "手机号", placeholder: "请输入手机号" },
        },
        {
          prop: "code",
          bind: { label: "验证码", placeholder: "请输入验证码" },
          "right-icon": "slot",
        },
        {
          label: "提交",
          type: "button",
          bind: { block: true, type: "info" },
          class: "m-t-10",
          click: () => {
            for (let key of Object.keys(vm.formData)) {
              if (!vm.formData[key]) {
                this.$toast.fail("请先填写完整");
                return;
              }
            }
            vm.verify();
          },
        },
      ],
      formData: {
        phoneNumber: "",
        code: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["Login"]),
    sendVerify() {
      if (this.isWaiting) return;

      const reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;

      if (reg.test(this.formData.phoneNumber)) {
        AuthApi.sendCode({
          phoneNumber: this.formData.phoneNumber,
          qjinid: "222",
        }).then((res) => {
          this.sendCode = res.data.data.data.code;
          let that = this;
          this.timer = setInterval(() => {
            // debugger

            if (that.isWaiting) {
              that.isWaiting--;
              that.isWaiting == 0 && clearTimeout(this.timer);
            } else {
              that.isWaiting = 60;
            }
          }, 1000);
        });
      } else {
        this.$toast.fail("请输入正确的手机号");
      }
    },
    verify() {
      if (this.sendCode == this.formData.code) {
          this.isupCode = "1";
      }

      const reg = /^\d{6}$/;
      if (window.location.href.split("?")[1]) {
        this.iid = window.location.href.split("?")[1].split("=")[1];
      }
      
      // debugger
      if (reg.test(this.formData.code)) {
        
        AuthApi.checkUserName({
          username: this.formData.phoneNumber,
          password: this.formData.code,
          isupCode: this.isupCode,
        }).then((response) => {
          this.$store.state.userid = response.data.data.userid;

          this.Login({
            username: "admin",
            password: "888888",
          })
            .then((res) => {
              this.$emit("on-success-login", { user: this.formData, res });
              AuthApi.userBinding({
                phoneNum: this.formData.phoneNumber,
                openid: this.iid,
              }).then((res) => {
                this.$router.push({
                  path: "/grsb",
                });
              });

            })
        });
      } else {
        this.$toast.fail("请输入正确的验证码");
      }
    },
    handleGoBack() {
      this.$router.go(-1);
    },
  },
  components: {
    loginForm,
    AppHeadView,
  },
};
</script>

<style lang='scss' scoped>
.register-form {
  ::v-deep .van-field__label,
  ::v-deep input {
    color: #333;
    font-size: 0.85rem;
  }
  .send {
    min-width: 5rem;
    border-left: 1px solid #eee;
    font-size: 0.85rem;
  }
}
.protocol {
  text-align: left;
  color: #a2a6b0;
  font-size: 0.55rem;
  span {
    color: #1677ff;
  }
}
</style>