<template>
    <div class="bzxx">

        <div style="margin: 15px 15px;">
            <el-input
                    height="200px"
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="description"
                    maxlength="126"
                    show-word-limit
                    :autosize="{ minRows: 5, maxRows: 10}"
            >
            </el-input>
        </div>


    </div>
</template>
<script>
    export default {
        name: " ",
        props: ["title"],
        data() {
            return {
                description: '',
            }
        },
        methods: {

        },
        mounted () {

        },
    }
</script>
<style lang="scss">
  .bzxx {
    /*height: 100%;*/
    /*overflow-y: hidden;*/
    /*overflow-x: hidden;*/

      .b-nac{
          border: 1px solid #CCCCCC;
          height: 100px;
          width: 100px;
          display:table-cell;
          text-align: center;
          vertical-align:middle;
          .a_img_add{
              width:18PX;
              height: 18px;
          }
      }
      .ivu-upload{

      }
  }

</style>
