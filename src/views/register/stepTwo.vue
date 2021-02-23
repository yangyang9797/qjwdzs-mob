<template>
  <div class="register_form">
    <el-form class="register" :model="formData" :rules="rules" ref="ruleFrom">
      <el-form-item>
        <el-input v-model="formData.password" type="password">
          <template slot="prepend">密码</template>

        </el-input>
      </el-form-item>
      <el-form-item prop="surePassword">
        <el-input v-model="formData.surePassword" type="password">
          <template slot="prepend" >确认密码</template>

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
        >注册</v-btn
      >
    </el-form>
  </div>  
</template>

<script>
import ApiAuth from '../../api/api-auth';
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      // ^({8,}$
      const reg = /^.{6}$/;

      if (value == "" || value == undefined || value == null ) {
        callback(new Error("密码不合法"));
      } 
      else {
        if ( value != this.formData.password) {
          callback(new Error("两次密码不相同"));
        } else {
          callback();
        }
      }
      
    };

    return{
      formData:{
        password:'',
        surePassword:''
      },
      rules:{
        surePassword: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      }
    }
  },
  methods:{
    handleSubmit(){
      if (this.formData.password == this.formData.surePassword && this.formData.password != '') {
        ApiAuth.register({username:this.$route.query.phone,personname:this.$route.query.phone,password:this.formData.password}).then(res=>{
          if (res.status == 200) {
            this.$Message.success('注册成功')
            this.$router.push('/login')
          }
        })
      }
    }
  }

}
</script>

<style lang="scss">

.register_form .el-input-group__prepend {
    border-right: 0;
    background-color: #fff;
    border: #fff;
    font-size: 15px;
    font-weight: 600;
    width: 100px;
}
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

</style>