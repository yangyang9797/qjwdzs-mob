<template>
    <div class="bdccl">
        <div v-if="selectBtn=='bdccl'" style="margin:10px;">
            <Card :bordered="false" style="border-radius: 15px;">
            <div class="itme-form"><span class="nr-form">土地证</span>
                <span   @click="getSfZmcl('true','tdz')" :class="this.tips_tdz=='已认证'?'a-tips':'b-tips'">
                    <Icon v-if="this.tips_tdz=='已认证'" type="ios-checkmark-circle" />{{this.tips_tdz}}<Icon class="cl-i" type="ios-arrow-forward" /></span>
            </div>
                <Divider />
            <div class="itme-form"><span class="nr-form">房产证</span>
                <span  @click="getSfZmcl('true','fcz')" :class="this.tips_fcz=='已认证'?'a-tips':'b-tips'">
                    <Icon v-if="this.tips_fcz=='已认证'" type="ios-checkmark-circle" />{{this.tips_fcz}}<Icon class="cl-i" type="ios-arrow-forward" /></span>
            </div>
                <Divider />
            <div class="itme-form"><span class="nr-form">房屋远景照片</span>
                <span  @click="getSfZmcl('true','fwyj')" :class="this.tips_fwyj=='已认证'?'a-tips':'b-tips'">
                    <Icon v-if="this.tips_fwyj=='已认证'" type="ios-checkmark-circle" />{{this.tips_fwyj}}<Icon class="cl-i" type="ios-arrow-forward" /></span>
            </div>
                <Divider />
            <div class="itme-form"><span class="nr-form">门牌号照片</span>
                <span  @click="getSfZmcl('true','mph')" :class="this.tips_mph=='已认证'?'a-tips':'b-tips'">
                    <Icon v-if="this.tips_mph=='已认证'" type="ios-checkmark-circle" />{{this.tips_mph}}<Icon class="cl-i" type="ios-arrow-forward" /></span>
            </div>
                <Divider />
            <div class="itme-form"><span class="nr-form">其他</span>
                <span  @click="getSfZmcl('true','qt')" :class="this.tips_qt=='已认证'?'a-tips':'b-tips'">
                    <Icon v-if="this.tips_qt=='已认证'" type="ios-checkmark-circle" />{{this.tips_qt}}<Icon class="cl-i" type="ios-arrow-forward" /></span>
            </div>
            </Card>
        </div>
        <photograph v-if="selectBtn=='true'" v-model="headImage"
                    @upload="upload"  :tishi="this.tishi" :updata="updata_bdc"></photograph>

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
            }
        },
        data() {
            return {
                tishi:'',
                selectBtn:'bdccl',
                updata_bdc:{},
                rtype:'',
                tips_tdz:'去添加',
                tips_fcz:'去添加',
                tips_fwyj:'去添加',
                tips_mph:'去添加',
                tips_qt:'去添加',
                tem_uuid:'',

            }
        },
        mounted() {
            this.getImages();
        },
        methods: {
            selectBdcBtn(val){
                this.selectBtn = val
                this.getImages();
            },

            getSfZmcl(val,title){
                this.selectBtn = val;
                if(title=='tdz'){
                    this.tishi='请拍摄土地证相关照片'
                    this.rtype='土地证'
                }
                if(title=='fcz'){
                    this.tishi='请拍摄房产证相关照片'
                    this.rtype='房产证'
                }
                if(title=='fwyj'){
                    this.tishi='请拍摄房屋远景相关照片'
                    this.rtype='房屋远景'
                }
                if(title=='mph'){
                    this.tishi='请拍摄门牌号相关照片'
                    this.rtype='门牌号'
                }
                if(title=='qt'){
                    this.tishi='请拍摄其他相关照片'
                    this.rtype='其他'
                }
                this.set();

                this.$emit('showQclTitle',title);
            },

            set() {
                this.updata_bdc = {refid: this.tem_uuid,reftype: this.rtype,filepath: this.tem_uuid+ "/"}
            },

            getImages() {
                ApiImage.list({
                    refid: this.tem_uuid,
                })
                    .then(r => {
                        try {
                            this.tips_tdz='去添加',
                            this.tips_fcz='去添加',
                            this.tips_fwyj='去添加',
                            this.tips_mph='去添加',
                            this.tips_qt='去添加',
                            this.list = r.data.data;
                            this.list.forEach((e,index) => {
                                if(e.reftype=='土地证'){
                                    this.tips_tdz ='已认证'
                                }
                                if(e.reftype=='房产证'){
                                    this.tips_fcz ='已认证'
                                }
                                if(e.reftype=='房屋远景'){
                                    this.tips_fwyj ='已认证'
                                }
                                if(e.reftype=='门牌号'){
                                    this.tips_mph ='已认证'
                                }
                                if(e.reftype=='其他'){
                                    this.tips_qt ='已认证'
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
  .bdccl {
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
  }
</style>
