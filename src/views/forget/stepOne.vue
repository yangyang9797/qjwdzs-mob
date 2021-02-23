<template>
  <div class="register_form">
    <el-form class="register" :model="formData" :rules="rules" ref="loginForm">

      <el-form-item prop="username">
        <el-input
          placeholder="请输入手机号"
          v-model="formData.username"
          autocomplete="off"
        >
          <template slot="prepend">手机号</template>
        </el-input>

      </el-form-item>


      <el-form-item prop="password">
        <el-input
          placeholder="请输入验证码"
          v-model="formData.password"
          autocomplete="off"
          size="large"
          class="sousu"
        >
          <template slot="prepend">验证码</template>
          <a
            slot="suffix"
            style="line-height: 40px; color: #2f62ff"
            :disabled="countFlag"
            :class="btnMsg == '获取验证码' ? 'n' : 's'"
            @click="sendMobile"
            >{{
              btnMsg == null ? "重新发送" + "(" + countNum + ")s" : btnMsg
            }}</a
          >
        </el-input>

      </el-form-item>
      <v-btn
        @click="handleSubmit()"
        block
        color="primary"
        dark
        style="
          height: 39px !important;
          width: 295px;
          background-color: #2f62ff !important;
          margin-top: 15px;
          font-size: 15px;
        "
        >下一步</v-btn
      >

      <!-- <p class="protocol">
        注册即代表你同意<span>《用户协议》</span>和<span>《隐私保护指引》</span>
      </p> -->
    </el-form>
  </div>
</template>

<script>
import ApiAuth from "../../api/api-auth.js";

export default {
  data() {
    const validateMobile = (rule, value, callback) => {
      const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;

      if (value == "" || value == undefined || value == null) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error("请输入正确的电话号码"));
        } else {
          callback();
        }
      }
    };

    return {
      countNum: 60,
      // 用于倒计时标记，true-正在倒计时
      countFlag: false,

      // 定时器
      intervalBtn: {},
      userid: '',
      //默认按钮的值
      btnMsg: "获取验证码",
      getcode:'',
      formData: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", validator: validateMobile },
        ],
        password: [
          { required: true, trigger: "blur", message: "验证码不能为空" },
        ],
      },
    };
  },
  methods: {
    sendMobile() {
      //获取输入手机号码
      let mobile = this.formData.username;
      //正则校验手机号是否合法
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile)) {
        this.$Message.error("手机号错误");
        return;
      }
      this.getCode(mobile);
      //触发定时器方法
      this.countDown();
    },
    getCode(mobile) {
      ApiAuth.sendCode({ qjinid: "222", phoneNumber: mobile }).then(
        (response) => {
          try {
            if (response.status == 200) {
              this.getcode = response.data.data.data.code;
              // console.log(this.getcode);
              this.isupCode = 1;
              ApiAuth.selectUsername({username:this.formData.username}).then(res=>{
          // console.log(res.data.data.userid);
          this.userid = res.data.data.userid
          // console.log(this.userid);
          
        })
            }
          } catch (e) {
            console.log("数据处理失败：", e);
          }
        }
      );
    },
    countDown() {
      // 设置btn倒计时时显示的信息
      this.btnMsg = null;
      // 更改btn状态
      this.countFlag = !this.countFlag;
      // 设置倒计时
      this.intervalBtn = setInterval(() => {
        if (this.countNum <= 0) {
          // 重置btn提示信息
          this.btnMsg = "获取验证码";
          // 清除定时器
          clearInterval(this.intervalBtn);
          // 更改btn状态
          this.countFlag = !this.countFlag;
          // 重置倒计时状态
          this.countNum = 5;
        }
        // 倒计时
        this.countNum--;
      }, 1000);
    },
    handleSubmit(){
      if(this.formData.password == this.getcode && this.formData.password != ''){
        // console.log(1);
        
        this.$router.push({ path: "/forget/stepTwo" ,
          query: {
            phone: this.userid
          }}
        )




      }
      
    }

  },
};
</script>

<style lang="scss">
.register_form {
  .register {
    margin: 20px auto;
    width: 90%;
  }
  .el-form-item {
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
  }
  .el-input-group__prepend {
    border-right: 0;
    background-color: #fff;
    border: #fff;
    font-size: 15px;
    font-weight: 600;
  }
  .el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    left: 87px;
    top: 39px;
    position: absolute;
  }
  .el-input__inner{
    border: #fff;
  }
}
.protocol {
  margin-top: 12px;
  text-align: left;
  color: #a2a6b0;
  font-size: 0.55rem;
  span {
    color: #1677ff;
  }
}
</style>