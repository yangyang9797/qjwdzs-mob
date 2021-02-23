<template>
  <div class>
    <div class="bt-i">
      <Row>
        <Col span="22" style="margin: 5px 0">
          <div style=" margin-left: 10px">{{this.tishi}}</div>
        </Col>
        <Col span="2" v-if="!['身份证','房屋远景照片'].includes(tishi)">
          <div
            v-if="this.iswx==false"
            class="avatar progress"
            :class="{complete: headerImage}"
            ref="avatar"
          >
            <input
              type="file"
              :id="this.tishi"
              class="avatar-file"
              multiple="multiple"
              capture="camera"
              accpet="image/gif,image/png,image/jpeg,image/jpg,image/bmp"
              @change="uploadFile"
            />
            <label class="avatar-label" :for="this.tishi"></label>
          </div>

          <a v-if="this.iswx==true" href="javascript:;" @click="uploadFilebyWx(tishi)">
            <div class="avatar"></div>
          </a>
        </Col>
      </Row>
      <Row>
        <span
          v-show="this.des=='0'||this.des=='1'||des=='2'"
          style="color: #B2B2B2; margin-left: 12px"
        >{{ getdes(this.des)}}</span>
      </Row>

      <Row>
        <Col span="24">
          <div style="margin:4%">
            <div class="icon-btn" v-if="['身份证','房屋远景照片'].includes(tishi)">
              <input
                style="display:none"
                ref="btn_web_1"
                v-if="!this.iswx"
                type="file"
                multiple="multiple"
                accpet="image/gif,image/png,image/jpeg,image/jpg,image/bmp"
                @change="uploadFile"
              />
              <a
                style="display:none"
                ref="btn_wx_1"
                v-else
                href="javascript:;"
                @click="uploadFilebyWx(tishi,'id_z')"
              ></a>
              <span
                style="display: flex;justify-content: center;align-items: center"
                v-if="!list[0]"
                @click="doUpload(iswx?'btn_wx_1':'btn_web_1')"
              >
                <i class="el-icon-camera-solid i_sfz"></i>
              </span>
              <!--                            <img v-else class="del" src="@/assets/images/del.png" @click="doRemove(list[0])">-->
              <img
              
                :src="(list[0]&&list[0].fileid)?(view_action+list[0].fileid):imgSrc1"
                @click="handleView(list[0])"
                @load="imgload"
              />
            </div>
            <div class="icon-btn" v-if="['身份证','房屋远景照片'].includes(tishi)">
              <input
                style="display:none"
                ref="btn_web_2"
                v-if="!this.iswx"
                type="file"
                multiple="multiple"
                accpet="image/gif,image/png,image/jpeg,image/jpg,image/bmp"
                @change="uploadFile"
              />
              <a
                style="display:none"
                ref="btn_wx_2"
                v-else
                href="javascript:;"
                @click="uploadFilebyWx(tishi,'id_f')"
              >
                <div class="avatar"></div>
              </a>
              <span
                style="display: flex;justify-content: center;align-items: center"
                v-if="!list[1]"
                @click="doUpload(iswx?'btn_wx_2':'btn_web_2')"
              >
                <i class="el-icon-camera-solid i_sfz"></i>
              </span>
              <!--                            <img v-else class="del" src="@/assets/images/del.png" @click="doRemove(list[1])">-->
              <img
                :src="(list[1]&&list[1].fileid)?(view_action+list[1].fileid):imgSrc2"
                @click="handleView(list[1])"
                @load="imgload"
              />
            </div>
            <div class="icon-btn" v-if="['房屋远景照片'].includes(tishi)">
              <input
                style="display:none"
                ref="btn_web_3"
                v-if="!this.iswx"
                type="file"
                multiple="multiple"
                accpet="image/gif,image/png,image/jpeg,image/jpg,image/bmp"
                @change="uploadFile"
              />
              <a
                style="display:none"
                ref="btn_wx_3"
                v-else
                href="javascript:;"
                @click="uploadFilebyWx(tishi)"
              >
                <div class="avatar"></div>
              </a>
              <span
                style="display: flex;justify-content: center;align-items: center"
                v-if="!list[2]"
                @click="doUpload(iswx?'btn_wx_3':'btn_web_3')"
              >
                <i class="el-icon-camera-solid i_sfz"></i>
              </span>
              <img @load="imgload" v-else class="del" src="@/assets/images/del.png" @click="doRemove(list[2])" />
              <img
              @load="imgload"
                :src="(list[2]&&list[2].fileid)?(view_action+list[2].fileid):require('@/assets/images/f_all.png')"
              />
            </div>
            <template v-if="!['身份证','房屋远景照片'].includes(tishi)">
              <div
                :key="item.fileid"
                @click="handleView(item)"
                class="upload-img-list"
                v-for="item in list"
              >
                <img @load="imgload" :src="view_action + item.fileid" />
              </div>
            </template>
          </div>
        </Col>
      </Row>

      <Modal title="查看照片" v-model="visible">
        <img @load="imgload" :src=" view_action+ fileid" style="width: 100%" v-if="visible" />
        <div slot="footer" v-if="!readonly">
          <Button
            @click="remove()"
            class="px-3 py-2"
            icon="md-close"
            size="small"
            type="primary"
            v-if="fileid"
          >删除</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import Exif from "exif-js";
import Token from "@ocv/web/src/http/token";
import ApiImage from "../../../api/api-Image.js";
import wx from "weixin-js-sdk";

const imageserver = ApiImage.apiUrl_Image;

export default {
  components: {},
  name: "photograph",
  props: {
    updata: { type: Object, default: {} },
    tishi: { type: String, default: "" },
    des: { type: String, default: "" },
    v_show: { type: String, default: "" },
    iswx: { type: Boolean, default: false },
    config: { type: Object, default: {} },
  },
  computed: {
    imgSrc1() {
      return require(`@/assets/images/${
        this.tishi === "房屋远景照片" ? "f_z" : "f_zz"
      }.png`);
    },
    imgSrc2() {
      return require(`@/assets/images/${
        this.tishi === "房屋远景照片" ? "f_f" : "f_ff"
      }.png`);
    },
  },
  watch: {
    updata(val) {
      this.updata = val;
      this.set();
    },
    v_show() {
      this.v_show;
    },
    iswx() {
      this.iswx;
    },
  },
  data() {
    return {
        view_action: imageserver + "view?sso=" + Token.getCredential() + "&fileid=",
      action: imageserver + "image/upload",
      headers: { sso: Token.getCredential() },
      headerImage: "",
      avatarFile: "",
      list: [],
      file_sel: null,
      fileid: "",
      visible: false,
      pagelist: {
        records: [],
        current: 1,
        size: 15,
        total: 0,
        pages: 0,
      },
      uploadRate: 0,
      filename: "",
      uploadStyle: {
        width: "0%",
      },
      c_fileid: "",

    };
  },
  mounted() {
    this.getImages();
//    this.getIdCardInfo();
  },
  methods: {
    imgload(){
      this.$bus.$emit('imgload', 1)
    },
    doRemove(file) {
      this.fileid = file.fileid;
      this.file_sel = file;
      this.remove();
    },
    doUpload(ref) {
      this.$refs[ref].click();
    },

    getdes(val) {
      if (val == "0") {
        return "请上传身份证正反面照片，照片需清晰无反光";
      } else if (val == "1") {
        return "请上传户口首页、户主及相关照片";
      } else if (val === "2") {
        return "请上传房屋远景正面、背面和全景照片";
      } else {
        return "";
      }
    },
    set() {
      this.getImages();
      //                this.uploadFile();
    },
    getImages() {
      //                debugger
      if (this.updata.refid) {
        ApiImage.list({
          refid: this.updata.refid,
          reftype: this.updata.reftype,
        })
          .then((r) => {
            try {
              this.list = r.data.data;
            } catch (e) {
              console.log("数据处理失败：", e);
            }
          })
          .catch((error) => {
            this.$Message.error(error.message);
          });
      }
    },

    uploadFile(e) {
      console.log("e", e);
      this.v_show = "true";
      var vm = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.avatarFile = files[0];
      console.log(" this.avatarFile", this.avatarFile);
      var formData = new FormData();
      formData.append("upfiles", this.avatarFile);
      formData.append("refid", this.updata.refid);
      formData.append("reftype", this.updata.reftype);
      formData.get("file");
      console.log(formData)
      vm.filename = "";
      var config = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (e) {
          //                        console.log("进度：",e);
          if (e.lengthComputable) {
            var rate = (vm.uploadRate = e.loaded / e.total); //已上传的比例
            if (rate < 1) {
              //这里的进度只能表明文件已经上传到后台，但是后台有没有处理完还不知道
              //因此不能直接显示为100%，不然用户会误以为已经上传完毕，关掉浏览器的话就可能导致上传失败
              //等响应回来时，再将进度设为100%
              vm.uploadRate = rate;
              vm.uploadStyle.width = (rate * 100).toFixed(2) + "%";
            }
          }
        },
      };
      let url = imageserver + "image/upload?sso=" + Token.getCredential() + "";
      axios
        .post(url, formData, config)
        .then((response) => {
          try {
            console.log(response.data.status);
            if (response.data.status == "200") {
              vm.uploadRate = 1;
              vm.uploadStyle.width = "100%";
              this.getImages();
              this.v_show = "false";
            }
          } catch (e) {
            console.log("数据处理失败：", e);
          }
        })
        .catch((error) => {
          this.$Message.error(error.message);
        });
    },

    uploadFilebyWx(tishi, val) {
      if (this.config) {
        var appId = this.config.appId;
        var timestamp = this.config.timestamp;
        var nonceStr = this.config.nonceStr;
        var signature = this.config.signature;
        var jsApiList = this.config.jsApiList;
      }
      let that = this;
      wx.config({
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: jsApiList,
        success: function (res) {},
      });
      wx.ready(function () {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            var localId = localIds[0];

            wx.getLocalImgData({
              localId: localId, // 图片的localID
              success: function (res) {
                var basePic64 = res.localData; // 微信返回的base64码；
                if (basePic64.indexOf("base64") > 0) {
                  var file = this.iosDataURLtoFile(basePic64, "jpg");
                  this.saveImg(file, basePic64);
                } else {
                  // var  file =  this.dataURLtoFile(basePic64,'jpg');
                  basePic64 = "data:image/jpeg;base64," + basePic64;
                  // 去掉所以换行符
                  basePic64 = basePic64.replace(/\r|\n/g, "");
                  that.saveImg(that.dataURLtoFile(basePic64, "jpg"));
                }
              },
            });

          },
        });
      });
      wx.error(function (res) {
        console.log("初始化失败！");
      });
    },


    iosDataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },

    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },

    // 微信将上传的图片传给服务器
    saveImg(file) {
      console.log("localId", file);
      var formData = new FormData();
      formData.append("upfiles", file);
      formData.append("refid", this.updata.refid);
      formData.append("reftype", this.updata.reftype);
      formData.get("file");
      var config = { "Content-Type": "multipart/form-data" };
      let url = imageserver + "upload?sso=" + Token.getCredential() + "";
      axios
        .post(url, formData, config)
        .then((response) => {
          try {
            this.c_fileid = response.data.data[0].fileid;
            this.$Message.success("上传成功");
            this.getImages();
              this.getIdCardInfo();
          } catch (e) {
            console.log("数据处理失败：", e);
          }
        })
        .catch((error) => {
          this.$Message.error(error.message);
        });
    },
      getIdCardInfo() {
          axios.post(config.wxurl + "pub/wx/getCardInfo?img_url=" + encodeURIComponent(this.view_action + this.c_fileid)
          )
              .then((response) => {
                  try {
                      var cardObj = JSON.parse(response.data.data)
                      // alert(cardObj.name);
              
                      this.$emit('sfz',cardObj.name,cardObj.id)
                  } catch (e) {
                      console.log("数据处理失败：", e);
                  }
              })
              .catch((error) => {
                  this.$Message.error(error);
              });
      },

    remove() {
      if (this.file_sel) {
        this.handleRemove(this.file_sel);
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
          .then((response) => {
            try {
              this.$Message.success("删除成功！");
              this.visible = false;
              this.getImages();
            } catch (e) {
              console.log("数据处理失败：", e);
            }
          })
          .catch((error) => {
            this.$Message.error(error.message);
          });
      } else {
        this.$Message.error("图片不存在！");
      }
    },

    postImg() {
      this.$emit("upload", this.headerImage);
      this.$emit("input", this.headerImage);
      //                this.$refs.avatar.style.background = `url(${this.headerImage})no-repeat center/contain`
    },
    rotateImg(img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const minStep = 0;
      const maxStep = 3;
      if (img == null) return;
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = minStep;
      }
      if (direction === "right") {
        step++;
        // 旋转到原位置，即超过最大值
        step > maxStep && (step = minStep);
      } else {
        step--;
        step < minStep && (step = maxStep);
      }
      // 旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      // 瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // 如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== "" && Orientation !== 1) {
        switch (Orientation) {
          case 6: // 需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: // 需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: // 需要180度旋转
            this.rotateImg(img, "right", canvas); // 转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      console.log("压缩前：" + initSize);
      console.log("压缩后：" + ndata.length);
      console.log(
        "压缩率：" + ~~((100 * (initSize - ndata.length)) / initSize) + "%"
      );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
  },
};
</script>

<style lang="less" scoped>
/*.current {*/
/*height: 100%;*/
/*overflow-y: hidden;*/
/*overflow-x: hidden;*/
.i_sfz {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  font-size: 22px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}
.bt-i {
  /*text-align: right;*/
  /*color: #B2B2B2;*/
  margin-top: 1%;
}
.a_img {
  width: 18px;
  height: 18px;
  position: relative;
  top: 3px;
}
/*.upload-img {*/
/*display: flex;*/
/*flex-wrap: wrap;*/

.upload-img-list {
  display: inline-block;
  width: 47%;
  height: 80px;
  text-align: center;
  /*line-height: 160px;*/
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
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
  background: rgba(0, 0, 0, 0.6);
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
/*}*/
.avatar {
  position: relative;
  /*margin: 0 auto 80px;*/
  /*width: 144px;*/
  /*height: 144px;*/
  width: 17px;
  height: 28px;
  background: url(../../../assets/images/ic_pic1.png) no-repeat center/contain;
  /*border-radius: 50%;*/
  &.complete .avatar-label {
    /* top: 93px;
                left: 100px;
                width: 64px;
                height: 64px;
                background: url(../../../assets/images/ic_pic_upload.png) no-repeat center/contain;*/
  }
  .avatar-file {
    display: none;
  }
  .avatar-label {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.icon-btn:nth-child(2n + 1) {
  margin-right: 2%;
}

.icon-btn {
  display: inline-block;
  position: relative;
  background: #f4f8fe;
  /*border: 1px solid #ececec;*/
  height: 13vh;
  width: 49%;
  > span {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
    /*background: rgba(255,255,255,0.4);*/
    color: #fff;
    font-size: 36px;
    text-align: center;
    line-height: 60px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .del {
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    opacity: 0.8;
  }
}

/*}*/
</style>
