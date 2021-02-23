<template>
  <div>
    <div
          style="
            display: flex;
            height: 44px;
            background-color: #fff;
            text-align: center;
            font-size: 20px;
            border-bottom:1px solid #eee;
          "
        >
          <div
            class="nav_left"
            style="flex: 1; height: 49px; line-height: 49px; font-size: 15px;color:#666"
            @click="handleGoBack"
          >
            返回
          </div>
          <div class="nav_center" style="flex: 3; line-height: 44px;color:#666;font-size:18px">
            忘记密码
          </div>
          <div class="nav_right" style="flex: 1; line-height: 44px"></div>
        </div>
    <router-view></router-view>
  </div>  
</template>

<script>
export default {
  methods: {
    handleGoBack(){
      this.$router.push('/login')
    }
  }

}
</script>

<style>

</style>