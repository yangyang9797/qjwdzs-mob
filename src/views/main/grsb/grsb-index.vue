<template>
  <div class="grsb-index">
    <div class="app-comm-content">
      <grsb-list/>
    </div>
  </div>
</template>

<script>

  import GrsbList from "../../../components/grsblist/grsb-list";
  // import AppHeadview from "../../../components/view/app-headview";

  export default {
    name: "grsb-index",
    components: {GrsbList},
    data() {
      return {
        title: "地块列表"
      }
    },
  }
</script>

<style lang="scss">
  .grsb-index {
    height: 100%;
    .v-toolbar__content{
     border-bottom: 1px solid #EEEEEE;
    }
  }
</style>
