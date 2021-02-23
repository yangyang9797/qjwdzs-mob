<template>
    <div class="qlrcl">
        <div v-if="selectBtn=='qlrcl'" style="margin:10px;">
            <Card :bordered="false" style="border-radius: 15px;">
                <div class="itme-form"><span class="nr-form">身份证</span>
                    <span   @click="getSfZmcl('true','sfz')" :class="this.tips_sfz=='已认证'?'a-tips':'b-tips'">
                        <Icon style="font-size: 22px;" v-if="this.tips_sfz=='已认证'" type="ios-checkmark-circle" />{{this.tips_sfz}}<Icon class="cl-i" type="ios-arrow-forward" /></span>
                </div>
                <Divider />
                <div class="itme-form"><span class="nr-form">户口本</span>
                    <span   @click="getSfZmcl('true','hkb')" :class="this.tips_hkb=='已认证'?'a-tips':'b-tips'">
                        <Icon style="font-size: 22px;" v-if="this.tips_hkb=='已认证'" type="ios-checkmark-circle" />{{this.tips_hkb}}<Icon class="cl-i" type="ios-arrow-forward" /></span>
                </div>
            </Card>
        </div>
        <photograph v-if="selectBtn=='true'" v-model="headImage"
                    @upload="upload"  :tishi="this.tishi" :updata="updata_ycq"></photograph>
    </div>

</template>
<script>
    import ApiImage from "../../../api/api-Image.js";
    import Clupload from "../../../components/grsblist/grsb-info/cl-upload.vue";
    import Photograph from '../../grsblist/grsb-info/photograph.vue'
    export default {
        name: " ",
        components: {Photograph},
        props:["tem_uuid"],
        watch: {
            tem_uuid(){
                this.tem_uuid;
                this.getImages()
            },
        },
        data() {
            return {
                updata_ycq: {},
                tishi:'',
                selectBtn:'qlrcl', //身份证
                rtype:'',
                list:[],
                tips_sfz:'去添加',
                tips_hkb:'去添加',
                tem_uuid:'',
            }
        },
        mounted() {
            this.getImages();
        },
        methods: {

            selectQlrBtn(val){
                this.selectBtn = val
                this.getImages();
            },

            getSfZmcl(val,title){
                this.selectBtn = val;

                if(title=='sfz'){
                    this.tishi='请拍摄身份证正、反面照片'
                    this.rtype='身份证'
                }
                if(title=='hkb'){
                    this.tishi='请拍摄或上传户口首页、户主页及相关照片'
                    this.rtype='户口本'
                }
                this.set();

                this.$emit('showclTitle',title);
            },

            set() {
                this.updata_ycq = {refid: this.tem_uuid,reftype: this.rtype,filepath: this.tem_uuid+ "/"}
            },

            getImages() {
                    ApiImage.list({
                        refid: this.tem_uuid,
                       })
                        .then(r => {
                            try {
                                this.list = r.data.data;
                                this.tips_sfz='去添加';
                                this.tips_hkb='去添加';
                                this.list.forEach((e,index) => {
                                    if(e.reftype=='身份证'){
                                       this.tips_sfz ='已认证'
                                    }
                                    if(e.reftype=='户口本'){
                                        this.tips_hkb ='已认证'
                                    }
                                })
                               } catch (e) {
                                console.log("数据处理失败：", e);
                            }
                        })
                        .catch(error => {
                            this.$Message.error(error.message);
                        });
                    },
                }
            }
</script>
<style lang="scss">
  .qlrcl {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #F8F8FA;
      .a-tips{
          float: right;
          color:#22D091
      }
      .b-tips{
          float: right;
          color:#B2B2B2
      }
      .sousu{
          /*margin: 0 20px;*/
          /*border: 4px solid white;*/
          outline: white;
          margin-bottom: 12px;
      }
      .ivu-input{
          /*background-color:rgba(247,248,250,1) !important;*/
          border-color: white !important;
          /*margin-top: 2px;*/
          /*border-radius: 0px;*/
      }

      .a_img{
          width:18PX;
          height: 18px;
          position: relative;
          top: 3px;
      }
      .icon-cl{
          float: right;
          /*margin-right: 12px;*/
          color:#B2B2B2
      }
      .ivu-form-item {
          margin-bottom: 3px;
      }
      .ivu-form-item-label{
          background-color: #FFFFFF;
          color: #333333;
          font-size: 14px;
          font-weight: unset;
          text-align: left;
          padding: 10px 12px 10px 10px;
      }
      .nr-form{
          margin-left: 10px
      }
      .itme-form{
          background-color: #FFFFFF;
          height: 50px;
          margin-top: 5px;
          line-height: 52px;
      }
      .ivu-divider-horizontal{
          height: 1px;
          margin:0px;
      }
  }
</style>
