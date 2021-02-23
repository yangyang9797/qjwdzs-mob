<template>
  <div>
    <!-- {{$route.params.id}} -->
    <Grsbinfo2 :qlrid='$route.params.id'/>
  </div>  
</template>

<script>
import Grsbinfo2 from "../../../components/grsblist/grsb-info/grsb-info2.vue";
import AppHeadview from "../../../components/view/app-headview";
export default {
  components:{
    Grsbinfo2
  }
}
</script>

<style>

</style>