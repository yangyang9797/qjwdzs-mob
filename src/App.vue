<template>
  <div id="app">
    <v-app>
      <router-view v-if="isRouterAlive"></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
.v-system-bar {
  display: none !important;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#app {
  .size;
}
</style>
