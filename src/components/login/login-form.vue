<template>
  <div id="app" class="g-container">
    <!--   <div class="g-header-container">
    </div>-->
    <div class="g-view-container">
      <div class="g-content">
        <div class="logoin-form">
          <el-form :model="form1" :rules="rules" ref="loginForm">
            <div class="title-bt">
              <img src="static/imgs/login_1.png" style="width: 45px; height: 45px" alt="" />
              <p>不动产调查助手</p>
            </div>
            <div class="title-des">调查项目：
              <Select v-model="murl" @on-change="selectChange" style="width:200px">
                <Option v-for="item in cityList" :value="item.qjinid" :key="item.qclid">{{ item.qjinname }}</Option>
              </Select>
            </div>

            <!--            <el-form-item  prop="qjinname">-->
            <!--            <el-input placeholder="项目名称" readonly ='true' v-model="form1.qjinname" autocomplete="off" size="large" class="sousu"/>-->
            <!--            </el-form-item>-->
            <!--                  <el-cascader style="width: 100%;"-->
            <!--                placeholder="选择地区"-->
            <!--                size="large"-->
            <!--                :options="options"-->
            <!--                v-model="selectedOptions"-->
            <!--                @change="addressChange">-->
            <!--            </el-cascader>-->

            <el-form-item prop="username" v-if="toggleLogin == true">
              <el-input placeholder="请输入手机号" v-model="form1.username" autocomplete="off" class="sousu">
                <el-select v-model="select_number" slot="prepend" placeholder="+86">
                  <el-option label="+86" value="1"></el-option>
                  <el-option label="+898" value="2"></el-option>
                  <el-option label="+100" value="3"></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <el-form-item prop="username" v-else>
              <el-input placeholder="请输入帐号" v-model="form1.username" autocomplete="off" class="sousu">
                <template slot="prepend">帐号</template>
              </el-input>
            </el-form-item>

            <el-form-item prop="yzm" v-if="toggleLogin == true">
              <el-input placeholder="请输入验证码" v-model="form1.yzm" autocomplete="off" size="large" class="sousu">
                <template slot="prepend">验证码</template>

                <a slot="suffix" style="line-height: 46px; color: #2f62ff" :disabled="countFlag" :class="btnMsg == '获取验证码' ? 'n' : 's'" @click="sendMobile">{{
                    btnMsg == null ? "重新发送" + "(" + countNum + ")s" : btnMsg
                  }}</a>
              </el-input>
            </el-form-item>

            <el-form-item prop="yzm" v-else>
              <el-input placeholder="请输入密码" type="password" v-model="form1.yzm" autocomplete="off" size="large" class="sousu">
                <template slot="prepend">密码</template>
              </el-input>
            </el-form-item>

            <div class="other_option">
              <el-form-item v-if="toggleLogin == true">
                <a style="float: right; color: #666; margin-left: 10px" @click="handlePassLogin">密码登录</a>
              </el-form-item>

              <el-form-item v-if="toggleLogin == false">
                <a style="float: right; color: #666;margin-left: 10px;font-size:13px" @click="handleRegister"> 注册 </a>
                <a style="float: right; color: #666; font-size:13px" @click="handlePassLogin">验证码登录</a>
                <a style="float: right; color: #666;font-size:13px" @click="handleForget">忘记密码？</a>
              </el-form-item>
            </div>

            <v-btn @click="handleSubmit()" block color="primary" dark style="
                height: 39px !important;
                width: 295px;
                background-color: #2f62ff !important;
                margin-top: 15px;
                font-size: 15px;
              ">登录</v-btn>

            <div class="logoin_btn2" @click="wxLogin">
              <img class="img_wx" src="static/imgs/login_2.png" alt="" />
              <div class="wx_btn">微信登录</div>
            </div>
          </el-form>
        </div>
        <div class="login_img">
          <img class="m_img showblud" src="static/imgs/login_3.png" />
        </div>
      </div>
    </div>
    <div class="g-footer-container">
      <!--<div >主办单位：仙桃市自然资源和规划局</div>-->
      <div></div>

      <tabbar />
    </div>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from 'element-china-area-data'
import { mapActions } from 'vuex'
import Cookies from 'js-cookie'
import Token from '@ocv/web/src/http/token'
import ApiAuth from '../../api/api-auth.js'
import ApiQjydcinstance from '../../api/api-qjydc-instance'
import axios from 'axios'

export default {
  components: {},
  props: {},
  data() {
    const validateMobile = (rule, value, callback) => {
      const reg = /^1(3|4|5|6|7|8|9)\d{9}$/

      if (value == '' || value == undefined || value == null) {
        callback(new Error('请输入正确的电话号码'))
      } else {
        if (!reg.test(value) && value != '') {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      }
    }

    return {
      selectBtn: '',
      form1: {
        qjinname: '',
        username: Cookies.get('username') || '',
        password: '',
        autologin: Token.opt.expires > 0,
        yzm: '',
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', validator: validateMobile },
        ],
        username2: [
          { required: true, trigger: 'blur', message: '帐号不能为空' },
        ],
        yzm: [{ required: true, trigger: 'blur', message: '验证码不能为空' }],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
        ],
      },
      select_number: '+86',
      message: '',
      options: regionData,
      selectedOptions: [],
      murl: '',
      mname: '',
      DataDirList: {},
      // 倒计时周期
      countNum: 60,
      // 用于倒计时标记，true-正在倒计时
      countFlag: false,

      // 定时器
      intervalBtn: {},
      //默认按钮的值
      btnMsg: '获取验证码',
      //手机号码
      mobile: '',
      getcode: '',
      qjinxzqh: '',
      isupCode: '0',
      toggleLogin: false,
      cityList: [
      ],
      model1: '',
    }
  },

  mounted() {
    axios.get('http://39.101.185.215:11002/qjwdzs/qjwdzs/instance/pub/getInstance').then(res=>{
      console.log(res.data.data)
      this.cityList = res.data.data
    })
    // this.murl  = window.location.href;
    // this.murl  = this.murl.match(/id=(\S*)&&&qjinname=/)?this.murl.match(/id=(\S*)&&&qjinname=/)[1]:'';
    // this.form1.qjinname  = (decodeURI(window.location.href).match(/qjinname=(\S*)&qjinxzqh=/)?(decodeURI(window.location.href).match(/qjinname=(\S*)&qjinxzqh=/)[1]):'');
    // var xzq =[]
    // xzq = decodeURI(window.location.href).split("qjinxzqh=");
    // if(xzq.length>1){
    //     this.qjinxzqh =xzq[1]
    // }
    // localStorage.getItem("user") &&
    //   this.toLogin(JSON.parse(localStorage.getItem("user")));
  },
  methods: {
    selectChange(value){
      const current =this.cityList.find(item=>item.qjinid == value)
      this.form1.qjinname = current.qjinname
    },
    handlePassLogin() {
      if (this.toggleLogin == false) {
        this.isupCode = 1
        console.log(this.isupCode)
      } else {
        this.isupCode = 0
        console.log(this.isupCode)
      }
      this.toggleLogin = !this.toggleLogin

      this.form1.username = ''
      this.form1.yzm = ''
    },
    handleRegister() {
      this.$router.push({ path: '/register/stepOne' })
    },
    handleForget() {
      this.$router.push({ path: '/forget/stepOne' })
    },
    getUrlParam(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    //     wxLogin(callback) {

    //     var appId = 'wx6203ae32b1626f34';
    //     var oauth_url = 'wx6203ae32b1626f34/oauth';
    //     var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=http%3A%2F%2Fkjxx.cnovit.com%2Fqjwdzs%2Fpub%2Fauth%2Fweixin%2Fovert%2FcallBack&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
    //     var code = this.getUrlParam("code");

    //     if (!code) {
    //         window.location = url;
    //     } else {
    //         $.ajax({
    //             type: 'GET',
    //             url: oauth_url,
    //             dataType: 'json',
    //             data: {
    //                 code: code
    //             },
    //             success: function (data) {
    //                 if (data.code === 200) {
    //                   this.$router.push('/grsb')
    //                     callback(data.data)

    //                 }
    //             },
    //             error: function (error) {
    //                 throw new Error(error)
    //             }
    //         })
    //     }
    // },
    wxLogin() {
      window.location.href =
        'http://kjxx.cnovit.com/qjwdzs/pub/auth/weixin/overt/login'
      // axios.get('http://kjxx.cnovit.com/qjwdzs/pub/auth/weixin/overt/callBack?code=031Cxg0w3t578V2iNx0w3bxJMj1Cxg0r&state=123').then(res=>{
      //   console.log(res);
      //   // debugger
      // })
    },
    ...mapActions('auth', ['Login']),
    // 倒计时
    countDown() {
      // 设置btn倒计时时显示的信息
      this.btnMsg = null
      // 更改btn状态
      this.countFlag = !this.countFlag
      // 设置倒计时
      this.intervalBtn = setInterval(() => {
        if (this.countNum <= 0) {
          // 重置btn提示信息
          this.btnMsg = '获取验证码'
          // 清除定时器
          clearInterval(this.intervalBtn)
          // 更改btn状态
          this.countFlag = !this.countFlag
          // 重置倒计时状态
          this.countNum = 5
        }
        // 倒计时
        this.countNum--
      }, 1000)
    },
    sendMobile() {
      //获取输入手机号码
      let mobile = this.form1.username
      //正则校验手机号是否合法
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile)) {
        this.$Message.error('手机号错误')
        return
      }
      this.getCode(mobile)
      //触发定时器方法
      this.countDown()
    },

    //获取验证码
    getCode(mobile) {
      if (this.murl) {
        ApiAuth.sendCode({ qjinid: this.murl, phoneNumber: mobile }).then(
          (response) => {
            try {
              if (response.status == 200) {
                this.getcode = response.data.data.data.code
                console.log(this.getcode)
                this.isupCode = '1'
              }
            } catch (e) {
              console.log('数据处理失败：', e)
            }
          }
        )
      } else {
        this.$Message.error('请扫码获取项目信息')
      }
    },

    toLogin(user) {
      if (this.form1.qjinname == '') {
        this.$Message.error('请扫码获取区域')
        return
      }
      if (this.murl == '') {
        this.$Message.error('获取项目编号失败，请重新扫码')
        return
      }
      const that = this
      this.$store.state.qjinname = this.form1.qjinname
      this.$store.state.murl = this.murl
      console.log(user)
      ApiAuth.checkUserName({
        username: user.username,
        code: user.password,
        isupCode: this.isupCode,
      }).then((response) => {
        try {
          console.log(res)
          this.$emit('on-success-valid', user)
          this.Login({ username: user.username, password: user.password })
            .then((res) => {
              that.$emit('on-success-login', { user, res })
              localStorage.setItem('user', JSON.stringify(user))
              this.$router.push({
                name: 'grsb',
                params: {
                  murl: this.murl,
                  visible: true,
                  qjinname: this.form1.qjinname,
                },
              })
            })
            .catch((error) => {
              that.$Message.error({ content: error, duration: 5 })
              that.$emit('on-error-login', { user, error })
              that.loading = false
              that.message = error
            })
        } catch (e) {
          console.log('数据处理失败：', e)
        }
      })
    },
    handleSubmit() {

      if (this.form1.qjinname == '') {
        this.$Message.error('请获取区域')
        return
      }
      // 这里用户就是手机号
      if (this.isupCode == '0') {
        this.$refs.loginForm.validate((valid) => {
          const that = this
          if (valid) {
            const user = {
              username: this.form1.username,
              password: this.form1.yzm,
            }

            this.$store.state.qjinname = this.form1.qjinname
            this.$store.state.murl = this.murl

            this.Login({
              username: user.username,
              password: this.form1.yzm,
            })
              .then((res) => {
                this.$store.state.userid = res.userid
                // console.log(this.$store.state.userid);

                // console.log(res);
                that.$emit('on-success-login', { user, res })
                localStorage.setItem('user', JSON.stringify(user))
                this.$router.push({
                  name: 'grsb',
                  params: {
                    murl: this.murl,
                    visible: true,
                    qjinname: this.form1.qjinname,
                  },
                })
              })
              .catch((error) => {
                console.log(error)
                var user = {
                  username: this.form1.username,
                  password: this.form1.yzm,
                }
                // that.$Message.error({ content: error, duration: 5 });
                that.$emit('on-error-login', { user, error })
                that.loading = false
                that.message = error
              })
          }
        })
      } else if (this.isupCode == '1') {
        this.$refs.loginForm.validate((valid) => {
          const that = this
          if (valid) {
            const user = {
              username: this.form1.username,
              password: this.form1.yzm,
            }
            if (this.getcode != '') {
              if (this.getcode != this.form1.yzm) {
                this.$Message.error('验证码错误')
                return
              }
            }

            this.$store.state.qjinname = this.form1.qjinname
            this.$store.state.murl = this.murl
            ApiAuth.checkUserName({
              username: this.form1.username,
              password: this.form1.yzm,
              isupCode: this.isupCode,
            })
              .then((response) => {
                try {
                  this.$emit('on-success-login', {
                    user: {
                      username: this.form1.username,
                      password: this.form1.yzm,
                    },
                    res: response,
                  })

                  localStorage.setItem('user', JSON.stringify(user))
                  this.$emit('on-success-valid', user)
                  // console.log(response.data.data);

                  this.$store.state.userid = response.data.data.userid
                  // let pass = response.data.data.password

                  // debugger
                  // this.$router.push("/grsb");
                  // return this.$store.dispatch('SetToken', response.data.data);
                  this.Login({
                    username: 'admin',
                    password: '888888',
                  })
                    .then((res) => {
                      // this.$store.state.userid = res.userid;
                      // console.log(this.$store.state.userid);

                      // console.log(responses);
                      // debugger
                      that.$emit('on-success-login', {
                        user: {
                          username: this.form1.username,
                          password: this.form1.yzm,
                        },
                        response,
                      })
                      localStorage.setItem('user', JSON.stringify(user))
                      this.$router.push({
                        name: 'grsb',
                        params: {
                          murl: this.murl,
                          visible: true,
                          qjinname: this.form1.qjinname,
                        },
                      })
                    })
                    .catch((error) => {
                      var user = {
                        username: this.form1.username,
                        password: this.form1.yzm,
                      }
                      // that.$Message.error({ content: error, duration: 5 });
                      that.$emit('on-error-login', { user, error })
                      that.loading = false
                      that.message = error
                    })
                } catch (e) {
                  console.log('数据处理失败：', e)
                }
              })
              .catch((error) => {
                this.$Message.error(error.message)
              })
          }
        })
      }
    },
  },
}
</script>

<style lang="scss">
.other_option {
  height: 25px;
  width: 100%;
  .el-form-item__content {
    line-height: 24px;
    position: relative;
    font-size: 14px;
  }
}
.el-input-group__prepend {
  height: 45px;
  width: 80px;

  /* border-right: 19px; */
}
.g-content .logoin-form .el-input__inner {
  background-color: #fff !important;
  /* border-color: white !important; */
  height: 45px;
  outline: white;
  border-right: white;
  border-left: white;
  border-top: white;
  border-bottom: 1px solid #edeff2;
}

.g-container {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 640px;
  min-width: 320px;
  margin: 0 auto;
  overflow: hidden;
}
.g-header-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
  height: 64px;
  background: white;
}
.g-view-container {
  height: 100%;
  padding-bottom: 50px;
  background: white;
  overflow: hidden;
}
.g-content {
  .el-select > .el-input {
    display: block;
    width: 84px;
  }
  .el-input-group__prepend {
    background-color: #fff;
    color: #333333;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #fff;
    /* border-radius: 4px; */
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
  }
  margin-top: -75px;
  .logoin-form {
    .title-bt {
      font-size: 19px;
      font-weight: bold;
      text-align: center;
      margin: 0 auto;
      width: 150px;
      height: 120px;
    }
    .title-des {
      color: #4183fd;
      text-align: center;
      margin-bottom: 18px;
    }

    .n {
      color: #4183fd;
    }
    .s {
      color: #b2b2b2;
    }
    .sousu {
      /*margin: 0 20px;*/
      /*border: 4px solid white;*/
      outline: white;
      margin-bottom: 5px;
    }
    .ivu-input {
      background-color: rgba(247, 248, 250, 1) !important;
      border-color: white !important;
      height: 45px;
      /*width: 100%;*/
    }
    .el-input__inner {
      background-color: #fff !important;
      border-color: white !important;
      height: 45px;
      outline: white;
      // margin-bottom: 12px;
    }

    .el-form-item__error {
      top: 65%;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
    input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset;
    }

    /*margin-top: 10vh;*/
    margin: 27% 8% 10% 8%;
    .font-weight-light {
      font-size: 14px !important;
    }
  }

  .m_img {
    width: 266px;
    height: 176px;
    /*height: 100%;*/
  }
}

.login_img {
  width: 266px;
  margin: 0 auto;
}
.g-footer-container {
  text-align: center;
  color: #b2b2b2;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  /*box-shadow:0 0 10px 0 hsla(0,6%,58%,0.6);*/
  height: 25px;
  z-index: 999;
  background: white;
  font-size: 12px;
}
.logoin_btn2 {
  width: 90px;
  height: 30px;
  margin: 30px auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  z-index: 1;
  // margin-top: 30px;
}
.wx_btn {
  color: #666666;
  display: inline;
  text-align: center;
}
.img_wx {
  width: 30px;
  height: 30px;
  // border-radius: 35px;
}
p {
  font-size: 18px;
  font-weight: bold;
}
</style>
