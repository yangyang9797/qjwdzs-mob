<!--
<template>
    <div class="current" style="background-color: #FFFFFF;">
        <div class="bt-i">
        <img class="a_img" src="static/imgs/guanyu.png"/>{{this.tishi}}</div>

        <div style="margin: 2% 9% 0% 9%;">
            &lt;!&ndash;<div class="sfz-nac">&ndash;&gt;
            <div class="upload-img">
                <div :key="item.fileid" @click="handleView(item)" class="upload-img-list"
                     v-for="item in list"
                >
                    <img :src=" view_action + item.fileid">
                    &lt;!&ndash;            <div class="demo-upload-list-cover">&ndash;&gt;
                    &lt;!&ndash;                <Icon @click.native="handleView(item)" type="ios-eye-outline"></Icon>&ndash;&gt;
                    &lt;!&ndash;                <Icon @click.native="handleRemove(item)" type="ios-trash-outline"></Icon>&ndash;&gt;
                    &lt;!&ndash;            </div>&ndash;&gt;
                </div>
                <template v-if="!(size > 0 && list.length >= size)">
                    <Upload :action="action"
                            :before-upload="handleBeforeUpload"
                            :data="updata"
                            :default-file-list="list"
                            :format="['jpg','jpeg','png']"
                            :headers="headers"
                            :max-size="20480"
                            :on-exceeded-size="handleMaxSize"
                            :on-format-error="handleFormatError"
                            :on-success="handleSuccess"
                            :show-upload-list="false"
                            :style="{width:icon_w,height:icon_h}"
                            multiple
                            name="upfiles"
                            ref="upload"
                            type="drag"
                            v-if="false">
                        &lt;!&ndash; <div :style="{width:icon_w,height:icon_h}">
                            <Icon size="20" type="ios-camera"></Icon>
                        </div> &ndash;&gt;
                    </Upload>
                    &lt;!&ndash;<div :style="{width:icon_w,height:icon_h}" @click="mobpic" class="ivu-upload-drag" v-else>&ndash;&gt;
                        &lt;!&ndash;<Icon size="20" type="ios-camera"></Icon>&ndash;&gt;
                    &lt;!&ndash;</div>&ndash;&gt;

                    <photograph v-model="headImage" @upload="upload" :updata="this.updata"></photograph>
                </template>
                <Modal title="查看照片" v-model="visible">
                    <img :src=" view_action+ fileid" style="width: 100%" v-if="visible">
                    <div slot="footer" v-if="!readonly">
                        <Button
                                @click="remove()"
                                class="px-3 py-2"
                                icon="md-close"
                                size="small" type="primary"
                                v-if="fileid"
                        >删除
                        </Button>
                    </div>
                </Modal>

            </div>

        </div>


    </div>
</template>
<script>
    import ApiImage from "../../../api/api-Image.js";
    import Token from "@ocv/web/src/http/token";
    import Photograph from '../../grsblist/grsb-info/photograph.vue'

    const imageserver = ApiImage.apiUrl_Image;
    export default {
        components: {Photograph},
        props: {
            readonly: {type: Boolean, default: false},
            // upload_data: {refid: this.file.caruseid, reftype: "用车前照片", filepath: this.caruse.caruseid + "/"},
            updata: {type: Object, default: {}}, // 上传附带的其他参数
            size: {type: Number, default: 2}, // 图片张数
            tishi:{type: String, default: ""},
            title: {type: String, default: ""}, // 标题
            icon_w: {type: String, default: "25%"}, // 预览icon宽
            icon_h: {type: String, default: ""},// 预览icon高
            max_w: {type: String, default: ""}, // 上传图片高宽
            max_h: {type: String, default: ""},// 上传图片高高
            quality: {type: String, default: ""}, // 图片质量 1-100
            is_show_time: {type: String, default: "true"},
            place: {type: String, default: ""},// 位置
            username: {type: String, default: ""}


        },
        watch: {
            updata(val) {
                debugger
                console.log(val)
                this.updata = val;
                this.set();
            },
            place(val) {
                this.place = val;
            }
        },
        data: function () {
            return {
                headImage:'',
                headers: {sso: Token.getCredential()},
                action: imageserver + 'image/upload',
                view_action: imageserver + 'view?sso=' + Token.getCredential() + '&fileid=',
                list: [],
                file_sel: null,
                fileid: '',
                visible: false,
                pagelist: {
                    records: [],
                    current: 1,
                    size: 15,
                    total: 0,
                    pages: 0
                }
            };
        },

        mounted() {
//            this.getImages();
        },
        methods: {

            upload(){
                console.log('上传事件')
            },
            set() {
                this.getImages();
            },
            getImages() {
//                debugger
//                console.log(this.updata)
                if (this.updata.refid) {
                    ApiImage.list({
                        refid: this.updata.refid,
                    })
                        .then(r => {
                            try {
                                this.list = r.data.data;
//                                this.list = [...this.pagelist.records];
                            } catch (e) {
                                console.log("数据处理失败：", e);
                            }
                        })
                        .catch(error => {
                            this.$Message.error(error.message);
                        });
                }
            },
            mobpic() {
                const that = this;
                window._piccallback = function (val) {
                    that.getImages();
                }
                console.info(window.location.href);

                let url = this.action + "?sso=" + Token.getCredential() + "";
                Object.keys(this.updata).forEach(k => {
                    url += "&" + k + "=" + encodeURIComponent(this.updata[k]);
                })
                console.info("url", url)
                let href = 'oaction://pic?callback=_piccallback';
                const params = {
                    up_name: "upfiles",
                    is_show_time: this.is_show_time,
                    max_w: this.max_w || 500,
                    max_h: this.max_h || 500,
                    quality: this.quality || 100,
                    title: this.title,
                    username: this.username || this.$store.state.auth.user.personname,
                    place: this.place,
                    up_url: url
                }
                Object.keys(params).forEach(k => {
                    href += "&" + k + "=" + encodeURIComponent(params[k]);
                })
                console.info("href", href)
                window.location.href = href;
            },




            remove() {
                if (this.file_sel) {
                    this.handleRemove(this.file_sel)
                }
            },
            handleView(file) {
                this.fileid = file.fileid;
                this.file_sel = file;
                this.visible = true;
            },
            handleRemove(file) {
                if (file && file.fileid) {
                    ApiImage.deleteById(file.fileid)
                        .then(response => {
                            try {
                                this.$Message.success("删除成功！");
                                this.getImages();
                            } catch (e) {
                                console.log("数据处理失败：", e);
                            }
                        })
                        .catch(error => {
                            this.$Message.error(error.message);
                        });
                } else {
                    this.$Message.error("图片不存在！");
                }
            },
            handleSuccess(res, file) {
                console.log(res,file)
                this.getImages();
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '' + file.name + ' 文件格式不正确, 请上传png、jpg、jpeg.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '文件大小限制',
                    desc: '文件  ' + file.name + ' 太大, 不能超过20M.'
                });
            },
            handleBeforeUpload() {
                if (this.size > 0 && this.list > this.size) {
                    this.$Notice.warning({
                        title: '上传的文件个数超过了限制，不能超过' + this.size + '个'
                    });
                    return false
                }
                return true;
            }
        }
    };
</script>
<style lang="scss">
    .current {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        .bt-i{
            text-align: center;
            color: #B2B2B2;
            margin-top: 4%;
        }
        .a_img{
            width:18PX;
            height: 18px;
            position: relative;
            top: 3px;
        }
        .sfz-nac{
            border: 1px solid #CCCCCC;
            margin: 1% 8% 3% 8%;
            height: 160px;
            width: 310px;
            display:table-cell;
            text-align: center;
            vertical-align:middle;
        }
        .ivu-upload{

        }
        .upload-img {
            display: flex;
            flex-wrap: wrap;

            .upload-img-list {
                display: inline-block;
                width: 100%;
                height: 160px;
                text-align: center;
                /*line-height: 160px;*/
                border: 1px solid transparent;
                border-radius: 4px;
                overflow: hidden;
                background: #fff;
                position: relative;
                box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
                margin-right: 4px;
                cursor: pointer;
            }

            .upload-img-list img {
                width: 100%;
                height: 100%;
            }

            .upload-img-list-cover {
                display: none;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, .6);
            }

            .upload-img-list:hover .upload-img-list-cover {
                display: block;
            }

            .upload-img-list-cover i {
                color: #fff;
                font-size: 20px;
                cursor: pointer;
                margin: 0 2px;
            }

            .ivu-upload-drag {
                justify-content: center;
                display: flex;
                align-items: center;
                min-height: 80px;
            }
        }
    }

</style>
-->
