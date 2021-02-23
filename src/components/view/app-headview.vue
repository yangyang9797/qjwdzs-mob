<template>
    <v-toolbar
     flat="true">
      <v-btn v-if="close" icon @click.stop="onClickClose" >
        <Icon  class="tool-t" type="md-close" />
      </v-btn>

      <v-btn  style="margin: 0px" v-if="back" icon @click.stop="onClickBack">
        <Icon  class="tool-t" type="ios-arrow-back" />
        <span style="font-size: 15px; color: #0D1733;font-weight: 400;">
          返回</span>
      </v-btn>

       <v-toolbar-title class="mx-auto"
                        style="font-size: 18px;color: #333333;">
         {{title}}
       </v-toolbar-title>
      <v-btn style="margin-left: 25px;" icon>
        <Icon class="tool-t" style=" font-weight: bold;" type="ios-more" />
      </v-btn>

    </v-toolbar>


</template>

<script>
  export default {
    name: "app-headview",
    props: ["close","title", "back","dots","menus","mytitle"],
      watch: {
          title(){
              this.title;

          }
      },
    data() {
      return {
          title:''
      }
    },
    methods: {
      onClickClose(){
          this.$router.push({path:"/login"});
      },

      onClickBack() {
         if(this.title=='信息填写'){
             this.$router.go(-1);
         }else{
             this.$emit('cutPage',this.title);
         }
      },
      onDotsClick(val){
        this.$emit("ondotsclick",val)
      },
      menusClick(){
        this.$emit("menusclick")
      }
    }
  }
</script>

<style  lang="scss" scoped>

  .tool-t{
    font-size: 28px;
    color: #0D1733;
  }

</style>
