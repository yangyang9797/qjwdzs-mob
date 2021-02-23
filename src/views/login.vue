<template>
  <div class="login">
    <login-form></login-form>
  </div>
</template>

<script>
  import LoginForm from "../components/login/login-form";

  export default {
    name: "login",
    components: {LoginForm},
    data: () => ({})
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    width: 100%;
    height: 100%;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0 auto;
  }
</style>
