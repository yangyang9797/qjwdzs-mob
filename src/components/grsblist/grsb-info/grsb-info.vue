<template>
  <div class="grsb-info">
    <div
      v-if="selectBtn == 'grsb'"
      class="content-info"
      style="position: relative"
    >
      
        


     <div class="grsb_main_top" style="position: relative;
    width: 100%;
    height: 200px;
    z-index: 111;" >
        <div
        claas="grsb-head"
        style="
          display: flex;
          height: 116px;
          background-color: #2f62ff;
          text-align: center;
          font-size: 20px;
        "
      >
        <div
          class="nav_left"
          style="
            flex: 1;
            height: 49px;
            line-height: 49px;
            font-size: 16px;
            color: #fff;
          "
          @click="handleGoback"
        >
          返回
        </div>
        <div class="nav_center" style="flex: 3; line-height: 49px; color: #fff">
          信息填写
        </div>
        <div
          class="nav_right"
          @click="preStep"
          style="flex: 1; line-height: 49px; color: #fff; font-size: 16px"
        >
          上一步
        </div>
      </div>

      <div
        style="
          position: absolute;
          top: 55px;
          width: 95%;
          z-index: 1;
          margin-left: 2.5%;
        "
      >
        <el-card>
          <el-steps :active="currentIndex">
            <el-step title="宅基地" icon>
              <img src="@/assets/images/zjd_step.png" style="    width: 25px;
    height: 25px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;" alt="" slot="icon">
            </el-step>
            <el-step title="权利人" icon>
              <img src="@/assets/images/qlr_step.png" style="    width: 25px;
    height: 25px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;" alt="" slot="icon">
            </el-step>
            <el-step title="房屋" icon>
              <img src="@/assets/images/fw_step.png" style="    width: 25px;
    height: 25px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;" alt="" slot="icon">
            </el-step>
          </el-steps>
        </el-card>
      </div>

      <p style="font-size: 14px;color:#999999;margin-top:50px;margin-left:25px;margin-bottom:15px;position: absolute;
    left: 0;
    top: 116px;" v-if="this.currentIndex == 1 ">宅基地信息</p>
        <p style="font-size: 14px;color:#999999;margin-top:50px;margin-left:25px;margin-bottom:15px;position: absolute;
    left: 0;
    top: 116px;" v-if="this.currentIndex == 2 ">权利人信息</p>
        <p style="font-size: 14px;color:#999999;margin-top:50px;margin-left:25px;margin-bottom:15px;position: absolute;
    left: 0;
    top: 116px;" v-if="this.currentIndex == 3 ">房屋信息</p>
     </div>

      <div style="border-radius: 20px; margin: 0px 14px 0px 14px">
        <Form
          ref="formCustom"
          :model="ruleForm"
          :rules="ruleInline"
          :label-width="110"
          class="main_form"
        >
          <el-drawer :show-close="false" :visible.sync="drawer" direction="btt">
            <van-picker
              title="请选择"
              show-toolbar
              :columns="columns"
              @confirm="onConfirm01"
              @cancel="onCancel"
            />
          </el-drawer>

          <el-drawer
            :show-close="false"
            :visible.sync="drawer02"
            direction="btt"
          >
            <van-picker
              title="请选择"
              show-toolbar
              :columns="columns2"
              @confirm="onConfirm02"
              @cancel="onCancel02"
            />
          </el-drawer>

          <el-drawer
            :show-close="false"
            :visible.sync="drawer03"
            direction="btt"
          >
            <van-picker
              title="请选择"
              show-toolbar
              :columns="columns3"
              @confirm="onConfirm03"
              @cancel="onCancel03"
            />
          </el-drawer>

          <el-drawer
            :show-close="false"
            :visible.sync="drawer04"
            direction="btt"
          >
            <van-picker
              title="请选择"
              show-toolbar
              :columns="columns4"
              @confirm="onConfirm04"
              @cancel="onCancel04"
            />
          </el-drawer>

          <div class="main_card_edit">
            <Card
              v-if="this.currentIndex == 1"
              :bordered="false"
              style="border-radius: 15px"
            >
              <div class="form-i">
                <span style="display: block; margin: 10px"></span>


                <FormItem label="土地证号" prop="tdzh">
                  <Input
                    type="text"
                    v-model="ruleForm.tdzh"
                    placeholder="请填写土地证号"
                  />
                </FormItem>
              <Divider />




                <FormItem label="宗地地址" prop="zddz">
                  <Input
                    type="text"
                    v-model="ruleForm.zddz"
                    placeholder="房屋及宗地地址"
                  />
                </FormItem>
                <Divider />

                <FormItem label="宗地面积" prop="zdmj">
                  <Input
                    type="text"
                    v-model="ruleForm.zdmj"
                    placeholder="请输入证载宗地面积"
                  />
                </FormItem>
                <Divider />

                <FormItem label="暂不登记原因" prop="zjdly">
                  <div
                    style="
                      background: #fff;
                      text-align: right;
                      height: 42px;
                      display: flex;
                      align-items: center;
                      justify-content: flex-end;
                    "
                  >
                    <span @click="drawer03 = true"
                      >{{ this.ruleForm.zbdjyy }}
                      <i class="el-icon-arrow-right"></i
                    ></span>
                  </div>
                </FormItem>
                <Divider />
                <FormItem label="宅基地来源" prop="zjdly">
                  <!-- <Select
                      :label-in-value="true"
                      v-model="f_obligee.zjdly"
                      @on-change="getZjdlyType"
                    >-->
                  <!-- <Option
                        v-for="item in zjdlytype"
                        :value="item.label"
                        :key="item.value"
                    >{{ item.label }}</Option>-->
                  <!-- </Select> -->
                  <!-- <van-picker
                      title="标题"
                      show-toolbar
                      :columns="columns"
                      @confirm="onConfirm"
                      @cancel="onCancel"
                      @change="onChange"
                    />-->
                  <div
                    style="
                      background: #fff;
                      text-align: right;
                      height: 42px;
                      display: flex;
                      align-items: center;
                      justify-content: flex-end;
                    "
                  >
                    <span @click="drawer = true"
                      >{{ this.ruleForm.zjdly }}
                      <i class="el-icon-arrow-right"></i
                    ></span>
                  </div>
                </FormItem>
                <Divider />

                <FormItem label="登记类型" prop="djlx">
                  <div
                    style="
                      background: #fff;
                      text-align: right;
                      height: 42px;
                      display: flex;
                      align-items: center;
                      justify-content: flex-end;
                    "
                  >
                    <span @click="drawer02 = true"
                      >{{ this.ruleForm.djlx }}
                      <i class="el-icon-arrow-right"></i
                    ></span>
                  </div>
                </FormItem>
                <Divider />

                <FormItem
                  label="权利人是否外出"
                  prop="sfwc"
                >
                  <div
                    style="
                      background: #fff;
                      text-align: right;
                      height: 42px;
                      display: flex;
                      align-items: center;
                      justify-content: flex-end;
                    "
                  >
                    <i-switch
                      v-model="ruleForm.sfwc"
                      :true-value="Number(1)"
                      :false-value="Number(0)"
                      true-color="#23D192"
                      size="large"
                      style="margin-right: 12px"
                      @on-change="changeSfwc"
                    >
                      <span slot="open">是</span>
                      <span slot="close">否</span>
                    </i-switch>
                  </div>
                </FormItem>
                <Divider />
                <FormItem
                  label="是否委托指界"
                  prop="sfwtzj"
                >
                  <div
                    style="
                      background: #ffff;
                      text-align: right;
                      height: 42px;
                      display: flex;
                      align-items: center;
                      justify-content: flex-end;
                    "
                  >
                    <i-switch
                      v-model="ruleForm.sfwtzj"
                      :true-value="Number(1)"
                      :false-value="Number(0)"
                      true-color="#23D192"
                      size="large"
                      style="margin-right: 12px"
                      @on-change="changeSfwtzj"
                    >
                      <span slot="open">是</span>
                      <span slot="close">否</span>
                    </i-switch>
                  </div>
                </FormItem>
              <Divider />

                <div>
                  <photograph
                    :config="this.config"
                    :tishi="'土地证'"
                    :iswx="this.iswx"
                    :v_show="'false'"
                    :updata="updata_tdz"
                    ref="Photograph"
                  ></photograph>
                </div>
              </div>
            </Card>

            <Card
              v-if="this.currentIndex == 2"
              :bordered="false"
              style="border-radius: 15px"
            >
              <div class="form-i">
                <div>
                  <photograph
                    :config="this.config"
                    :tishi="(this.tishi = '身份证')"
                    :iswx="this.iswx"
                    :des="0"
                    :v_show="'false'"
                    :updata="updata_sfz"
                    ref="Photograph"
                    @sfz="handleSfz(arguments)"
                  ></photograph>
                </div>

                <Divider />
               
                <FormItem label="证载权利人" prop="zzqlr">
                  <Input
                    type="text"
                    v-model="ruleForm.zzqlr"
                    placeholder="请输入姓名"
                  />
                </FormItem>
                <Divider />

                <FormItem label="证件号" prop="zjh">
                  <Input
                    type="text"
                    v-model="ruleForm.zjh"
                    placeholder="请输入证件号"
                  />
                </FormItem>
                <Divider />

                <FormItem label="电话号码" prop="dhhm">
                  <Input
                    type="text"
                    v-model="ruleForm.dhhm"
                    placeholder="请输入手机号"
                  />
                </FormItem>
                <Divider />
                

                <div>
                  <photograph
                    :config="this.config"
                    :tishi="(this.tishi = '户口本')"
                    :iswx="this.iswx"
                    :des="1"
                    :v_show="'false'"
                    :updata="updata_hkb"
                    ref="Photograph"
                  ></photograph>
                </div>

                <Divider />

                
              </div>
              <FormItem label="共有情况">
                <div style="background: #ffff; text-align: right; height: 42px">
                  <i-switch
                    v-model="switch1"
                    true-color="#23D192"
                    size="large"
                    style="margin-right: 12px"
                    @on-change="changeGyqk"
                  >
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                  </i-switch>
                </div>
              </FormItem>
              <Divider />

              <div style="background: #ffff" v-if="this.switch1 == true">
                <div
                  v-for="(link, index) in proName"
                  :key="index"
                  class="input-box g-mt-10"
                  id="link"
                  @mouseenter="showDel(index)"
                  @mouseleave="delName = null"
                >
                  <Row style="display: flex; flex-direction: row">
                    <FormItem class="le_name" style="width: 25vw">
                      <Input
                        type="text"
                        placeholder="姓名"
                        ref="linkName"
                        v-model="link.zzqlr"
                        @on-blur="testProName(link)"
                      />
                    </FormItem>
                    <FormItem class="le_name" style="flex: 1">
                      <Input
                        type="text"
                        v-model="link.zjh"
                        placeholder="证件号"
                        @on-blur="testCardno(link)"
                      />
                    </FormItem>

                    <span
                      class="delSingle"
                      @click="delSingleInput(index)"
                      v-show="delName == index + 1"
                    >
                      <icons style="color: #4183fd" type="shanchu"></icons>
                    </span>
                  </Row>

                  <Divider />
                </div>
                <!--                          <Divider />-->
                <div class="g-mt-10">
                  <span
                    class="nr-form"
                    style="margin-bottom: 10px; display: block"
                    @click="addProName()"
                  >
                    新增共有情况
                    <img class="a_img" src="static/imgs/add.png" />
                  </span>
                  <!--<a  class="g-c-eff g-ml-15" @click="clearName()">清空所有</a>-->
                </div>
              </div>

              <FormItem label="代理人" prop >
                <div style="background: #ffff; text-align: right; height: 42px">
                  <i-switch
                    v-model="switch2"
                    true-color="#23D192"
                    size="large"
                    style="margin-right: 12px"
                  >
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                  </i-switch>
                </div>
              </FormItem>
                <Divider />


              <div style="background: #ffff" v-if="this.switch2 == true">
                <Row style="display: flex; flex-direction: row">
                  <p style="font-size: 14px; font-weight: 100; flex: 1;margin: 9px;">
                    与代理人关系
                  </p>
                  <Input
                    type="text"
                    style="flex: 1"
                    placeholder="例如父子、母子"
                    v-model="dlr.relation"
                  />
                </Row>
                <Row style="display: flex; flex-direction: row">
                  <Input
                    type="text"
                    placeholder="姓名"
                    v-model="dlr.name"
                    @on-blur="testProName(dlr)"
                  />

                  <Input
                    type="text"
                    v-model="dlr.zjh"
                    placeholder="证件号"
                    @on-blur="testCardno(dlr)"
                  />
                </Row>
                <Divider />
              </div>
            </Card>

            <Card
              v-if="this.currentIndex == 3"
              :bordered="false"
              style="border-radius: 15px"
            >
              <div class="form-i">
                
                <FormItem label="房屋预编码" prop="fwybm">
                  <Input
                    type="text"
                    v-model="ruleForm.fwybm"
                    placeholder="请输入"
                  />
                </FormItem>
                <Divider />
                <FormItem label="房屋层数" prop="fwcs">
                  <Input
                    type="text"
                    placeholder="请输入"
                    v-model="ruleForm.fwcs"
                  />
                </FormItem>
                <Divider />

                <FormItem label="建成年份" prop="jcnf">
                  <Input
                    type="text"
                    placeholder="请输入"
                    v-model="ruleForm.jcnf"
                    
                  />
                </FormItem>
                <Divider />
                <div>
                  <photograph
                    :config="this.config"
                    :tishi="'房屋远景照片'"
                    des="2"
                    :iswx="this.iswx"
                    :v_show="'false'"
                    :updata="updata_fwyj"
                    ref="Photograph"
                  ></photograph>
                </div>
                <Divider />

                <div>
                  <photograph
                    :config="this.config"
                    :tishi="'门牌号'"
                    :iswx="this.iswx"
                    :v_show="'false'"
                    :updata="updata_mph"
                    ref="Photograph"
                  ></photograph>
                </div>
                <Divider />

                <div>
                  <photograph
                    :config="this.config"
                    :tishi="'房产证'"
                    :iswx="this.iswx"
                    :v_show="'false'"
                    :updata="updata_fcz"
                    ref="Photograph"
                  ></photograph>
                </div>
<Divider />

                <div v-if="addHouseflag == true">
                  <h2 style="font-size: 24px; color: #eee">辅房信息</h2>
                  <Divider />
                  <div>
                    <photograph
                      :config="this.config"
                      :tishi="'房屋远景照片'"
                      des="2"
                      :iswx="this.iswx"
                      :v_show="'false'"
                      :updata="updata_fwyj"
                      ref="Photograph"
                    ></photograph>
                  </div>

                  <FormItem label="房屋预编码" prop="fffwybm">
                    <Input
                      type="text"
                      v-model="ruleForm.fffwybm"
                      placeholder="调查人员填写"
                    />
                  </FormItem>
                  <Divider />

                  <FormItem label="房屋类型" prop="fflx">
                    <div
                      style="
                        background: #fff;
                        text-align: right;
                        height: 42px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                      "
                    >
                      <span @click="drawer04 = true"
                        >{{ this.ruleForm.fflx }} ></span
                      >
                    </div>
                  </FormItem>
                  <Divider />
                </div>
              </div>
            </Card>
          </div>
        </Form>
        <div
      v-if="selectBtn == 'grsb'"
      class="footer-info"
      style="margin: 10px 10px"
    >
      <v-btn
        v-if="this.currentIndex < 3"
        @click="handleNext"
        block
        color="primary"
        dark
        rounded
        style="
          width: 280px;
          height: 44px !important;
          background-color: #2f62ff !important;
          border-radius: 4px;
        "
        >{{ this.nextStep }}</v-btn
      >
      <v-btn
        block
        dark
        style="
          width: 280px;
          height: 44px !important;
          background-color: #2f62ff !important;
          border-radius: 4px;
        "
        v-else
        @click="savaObj"
        >保存</v-btn
      >
    </div>
      </div>
    </div>

    
  </div>
</template>
<script>
import ApiObligee from "../../../api/api-Obligee";
import ApiareaList from "../../../api/area";
import ApiSend from "../../../api/api-send";
import ApiSearch from "../../../api/api-search";

import Photograph from "../../grsblist/grsb-info/photograph.vue";
import wx from "weixin-js-sdk";
export default {
  name: "",
  cardno: "",
  components: { Photograph },

  data() {
    const validateCard = (rule, value, callback) => {
      const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

      if (value == "" || value == undefined || value == null) {
        callback(new Error("身份证号不能为空"));
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error("身份证号不合法"));
        } else {
          callback();
        }
      }
    };

    validateZddm;
    const validateZddm = (rule, value, callback) => {
      const reg = /^([J|C|G|B]|[0-9]){1,19}$/;

      if (value == "" || value == undefined || value == null) {
        callback(new Error("宗地代码为空"));
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error("宗地代码不合法"));
        } else {
          callback();
        }
      }
    };

    const validateDhhm = (rule, value, callback) => {
      const reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;

      if (value == "" || value == undefined || value == null) {
        callback(new Error("电话不能为空"));
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error("电话号不合法"));
        } else {
          callback();
        }
      }
    };

    const validateQlr = (rule, value, callback) => {
      const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;

      if (value == "" || value == undefined || value == null) {
        callback(new Error("姓名不能为空"));
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error("姓名不合法"));
        } else {
          callback();
        }
      }
    };

    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
    };

    return {
      currentIndex: 1,
      nextStep: "下一步",
      value: "",
      columns: [
        "集体成员",
        "异地搬迁",
        "继承",
        "历史批准",
        "家庭析产",
        "安置",
        "其他",
      ],
      columns2: [
        "正常登记",
        "一户多宅",
        "违法用地",
        "危房",
        "已拆除",
        "非本村村民",
        "其他",
      ],
      columns3: [
        "无(首次登记)",
        "非本集体组织成员",
        "一户多宅",
        "有权属争议",
        "违法违规占用宅基地",
        "其他",
      ],
      columns4: ["厨房", "杂屋", "厕所", "畜舍", "其他"],

      ruleForm: {
        tdzh: "",
        zddm: "",
        zddz: "",
        zdmj: "",
        zbdjyy: "无(首次登记)",
        zjdly: "集体成员",
        djlx: "正常登记",

        sfwc: false,
        sfwtzj: false,

        zzqlr: "",
        zjh: "",
        dhhm: "",

        fwybm: "",
        fwcs: "",
        jcnf: "",
        fwlx: "主房",

        fffwybm: "",
        fffflx: "",

        qlrid: "",
        userid: this.$store.state.userid,
      },

      showArea: false,
      drawer: false,
      drawer02: false,
      drawer03: false,
      drawer04: false,

      addHouseflag: false,

      ruleInline: {
        tdzh: [
          { required: true, message: "土地证号不能为空", trigger: "blur" },
        ],
        fwdz: [
          { required: true, message: "房屋地址不能为空", trigger: "blur" },
        ],
        fwybm: [
          { required: true, message: "房屋预编码不能为空", trigger: "blur" },
        ],
        fffwybm: [
          { required: true, message: "房屋预编码不能为空", trigger: "blur" },
        ],
        fwlx: [
          { required: true, message: "房屋类型不能为空", trigger: "blur" },
        ],
        fwcs: [
          { required: true, message: "房屋层数不能为空", trigger: "blur" },
        ],
        jcnf: [
          { required: true, message: "房屋年份不能为空", trigger: "blur" },
        ],
        xqdz: [
          { required: true, message: "详情地址不能为空", trigger: "blur" },
        ],

        zddz: [
          { required: true, message: "宗地地址不能为空", trigger: "blur" },
        ],
        zdmj: [
          { required: true, message: "宗地面积不能为空", trigger: "blur" },
        ],

        zjdly: [{ required: true, message: "宅基地不能为空", trigger: "blur" }],
        djlx: [
          { required: true, message: "登记类型不能为空", trigger: "blur" },
        ],
        zddm: [{ required: true, validator: validateZddm, trigger: "blur" }],
        dhhm: [{ required: true, validator: validateDhhm, trigger: "blur" }],
        zzqlr: [{ required: true, validator: validateQlr, trigger: "blur" }],
        zjh: [{ required: true, validator: validateCard, trigger: "blur" }],
      },
      switch1: false,
      switch2: false,
      selectBtn: "grsb", //个人申报
      proName: [
        {
          qlrpid: "",
          zzqlr: "",
          zjh: "",
          // updata_sfz:{refid:'c47166ec-37e6-4c58-83d8-6ab0888d984a',reftype:'身份证'},
          // updata_hkb:{refid:'c47166ec-37e6-4c58-83d8-6ab0888d984a',reftype:'户口本'}
        },
      ],
      dlr: [
        {
          relation: "",
          name: "",
          zjh: "",
          // updata_sfz:{refid:'c47166ec-37e6-4c58-83d8-6ab0888d984a',reftype:'身份证'},
          // updata_hkb:{refid:'c47166ec-37e6-4c58-83d8-6ab0888d984a',reftype:'户口本'}
        },
      ],
      proFwybm: [{ fwybm: "" }],
      test: [] /*验证填写是否正确*/,
      delName: null,
      delFwybm: null,
      f_obligee: ApiObligee.getModel(),
      tem_uuid: "",
      gyno: [],
      qjid: "", //关联项目id
      updata_ycq: {},
      updata_sfz: {},
      updata_hkb: {},
      updata_tdz: {},
      updata_fcz: {},
      updata_fwyj: {},
      updata_mph: {},
      updata_dcct: {},
      updata_dcbg: {},
      updata_qt: {},
      tishi: "",
      single: false,
      visible: false,
      lng: "",
      lat: "",
      iswx: false,
      lnglatXY: "",
      config: {
        debug: false,
        appId: "",
        timestamp: "",
        nonceStr: "",
        signature: "",
        jsApiList: "",
      },
    };
  },
  created() {
    this.getQlrId();
  },
  mounted() {
    
    // this.$bus.$on('sfz',(name,id)=>{
    //   alert(name,id)
    //   this.ruleForm.zzqlr == name
    //   this.ruleForm.zjh == id
    // })


    this.isWeiXin();
    var signUrl = window.location.href.split("#")[0];
    var url = config.wxurl + "pub/wx/config?signUrl=" + signUrl;
    const that = this;
    axios
      .post(url)
      .then((res) => {
        try {
          console.log("----wx.config() --->", res);
          (that.config.appId = res.data.data.appid),
            (that.config.timestamp = res.data.data.timestamp),
            (that.config.nonceStr = res.data.data.nonceStr),
            (that.config.signature = res.data.data.signature),
            (that.config.jsApiList = [
              "getLocation",
              "chooseImage",
              "getLocalImgData",
            ]);
          console.log("that.config", that.config);
          this.getWxLocation();
        } catch (e) {
          console.log("数据处理失败：", e);
        }
      })
      .catch((error) => {
        this.$Message.error(error.message);
      });

    if (this.$route.params.visible) {
      this.visible = this.$route.params.visible;
    }
    if (this.$route.params.id) {
      var pid = this.$route.params.id;
      this.getInfo(pid);
    }
    // this.f_obligee.fwdz=this.$store.state.qjinname;
    //            this.f_obligee.xqdz=this.$store.state.qjinname;
    //            this.f_obligee.obladdress=this.$store.state.qjinname;
    this.qjid = this.$store.state.murl;
  },
 
 beforeDestroy() {
   this.$bus.$off("sfz");
 },
 
 methods: {
   handleSfz (data){
     
     this.ruleForm.zzqlr = data[0].toString()
     this.ruleForm.zjh = data[1].toString()
    //  alert(this.ruleForm.zzqlr)
   },
    handleNext() {
      this.$refs.formCustom.validate((valid) => {
        if (valid) {
          if (this.currentIndex < 3) {
            this.currentIndex += 1;
            return;
          }
        }
      });
    },
    preStep() {
      if (this.currentIndex > 1) {
        this.currentIndex -= 1;
      } else {
        return;
      }
    },
    handleSave() {
      console.log(111);
    },
    handleGoback() {
      // ApiSend.deleteByQlrId({ qlrid: this.ruleForm.qlrid }).then((res) => {
      //   // console.log(res);
        
      // });
      this.$router.go(-1);
    },
    getQlrId() {
      ApiSend.saveQlr({
        qjinid: this.$store.state.murl,
        cuserid: this.$store.state.userid,
      }).then((res) => {
        // debugger
        console.log(res.data.data.qlrid);
        this.ruleForm.qlrid = res.data.data.qlrid;
        console.log(this.ruleForm.qlrid);
        this.get_uuid();
      });
    },

    handleClick(tab, event) {
      console.log(tab.name);
    },

    onConfirm01(value, index) {
      this.drawer = false;
      this.ruleForm.zjdly = value;
    },

    onCancel() {
      this.drawer = false;
    },

    onConfirm02(value, index) {
      this.drawer02 = false;
      this.ruleForm.djlx = value;
    },

    onCancel02() {
      this.drawer02 = false;
    },

    onConfirm03(value, index) {
      this.drawer03 = false;
      this.ruleForm.zbdjyy = value;
    },

    onCancel03() {
      this.drawer03 = false;
    },

    onConfirm04(value, index) {
      this.drawer04 = false;
      this.ruleForm.fflx = value;
    },

    onCancel04() {
      this.drawer04 = false;
    },

    addHouse() {
      this.addHouseflag = true;
    },
    changeSfwtzj() {
      if (this.f_obligee.sfwtzj == false) {
        this.f_obligee.wtname = "";
        this.f_obligee.wtidcard = "";
        this.f_obligee.yqlrgx = "";
      }
    },
    onConfirm(values) {
      this.value = values.map((item) => item.name).join("");
      this.f_obligee.xqdz = this.value;
      this.f_obligee.fwdz =
        this.$store.state.qjinname + " " + this.f_obligee.xqdz;
      this.showArea = false;
    },
    //判断是否为微信浏览器
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.iswx = true;
      } else {
        this.iswx = false;
      }
    },

    changeGyqk(status) {
      if (status == false) {
        this.proName = [
          {
            zzqlr: "",
            zjh: "",
          },
        ];
      }
    },
    change(status) {
      console.log(status);
    },
    getWxLocation() {
      if (this.iswx == true) {
        const that = this;
        try {
          console.log("wx.config() --->", this.config);
          wx.config({
            debug: false,
            appId: this.config.appId,
            timestamp: this.config.timestamp,
            nonceStr: this.config.nonceStr,
            signature: this.config.signature,
            jsApiList: this.config.jsApiList,
            success: function (res) {
              //                                        console.log(res)
            },
          });
          wx.ready(function () {
            wx.getLocation({
              type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                that.f_obligee.lat = res.latitude;
                that.f_obligee.lng = res.longitude;
                console.log(that.f_obligee.lng, that.f_obligee.lat);
              },
            });
          });
          wx.error(function (res) {
            console.log("初始化失败！");
          });
        } catch (e) {
          console.log("数据处理失败：", e);
        }
      }
    },

    getCertificatetype(value) {
      if (value) {
        this.f_obligee.certificatetype = value.value;
      }
    },
    getZjdlyType(value) {
      if (value) {
        this.f_obligee.zjdly = value.value;
      }
    },
    getDjType(value) {
      if (value) {
        this.f_obligee.djlx = value.value;
      }
    },
    goqlr(val) {
      this.$refs.qlrcl.selectQlrBtn(val);
      this.$emit("showclTitle", "qlrcl");
    },

    gobdc(val) {
      this.$refs.bdccl.selectBdcBtn(val);
      this.$emit("showclTitle", "bdccl");
    },

    showclTitle(val) {
      this.$emit("showTitle", val);
    },
    showQclTitle(val) {
      this.$emit("showTitle", val);
    },
    getSfZmcl(val) {
      this.selectBtn = val;
    },

    getInfo(pid) {
      //查看详情
      ApiObligee.list({ oblid: pid })
        .then((response) => {
          try {
            this.f_obligee = response.data.data[0];
            if (this.f_obligee.fwdz === "") {
              this.f_obligee.fwdz = this.$store.state.qjinname;
            }
            if (this.f_obligee.publicstate) {
              this.proName = JSON.parse(this.f_obligee.publicstate);
              this.switch1 = false;
              this.proName.forEach((e, index) => {
                if (e.cardno != "") {
                  this.switch1 = true;
                }
              });
            }
            if (this.f_obligee.fwybm) {
              this.proFwybm = JSON.parse(this.f_obligee.fwybm);
            }
          } catch (e) {
            console.log("获取数据失败：", e);
          }
        })
        .catch((error) => {
          this.$Message.error(error.message);
        });
    },

    /*验证填写是否正确*/
    testProName(link) {
      var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      if (!regName.test(link.zzqlr)) {
        this.$Message["error"]({
          background: true,
          content: "请正确的填写姓名",
        });
      }
    },
    testCardno(link) {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (link.zjh == "" || link.zjh == undefined || link.zjh == null) {
        this.$Message["error"]({
          background: true,
          content: "身份证号不能为空",
        });
      } else {
        if (!reg.test(link.zjh) && link.zjh != "") {
          this.$Message["error"]({
            background: true,
            content: "身份证号不合法",
          });
        }
      }
    },
    addProName() {
      let cope = {
        zzqlr: "",
        qlrpid: "",
        zjh: "",
      };
      if (this.proName.length <= 6) {
        this.proName.push(cope);
      }
    },

    addFwybm() {
      let cope = {
        fwybm: "",
      };
      this.proFwybm.push(cope);
    },

    clearName() {
      this.proName = [];
      for (const i in this.$refs.linkName) {
        this.$refs.linkName[i].style.borderColor = "#ececec";
      }
      let cope = {
        qlrpid: "",
        zzqlr: "",
        zjh: "",
      };
      this.proName.push(cope);
      console.log(this.proName);
    },

    // 单个删除
    delSingleInput(index) {
      this.proName.splice(index, 1);
    },
    delFwybmInput(index) {
      this.proFwybm.splice(index, 1);
    },
    showDel(index) {
      this.delName = index + 1;
      if (this.proName.length == 1) {
        this.delName = null;
      }
    },
    showFwybmDel(index) {
      this.delFwybm = index + 1;
      if (this.proFwybm.length == 1) {
        this.delFwybm = null;
      }
    },
    getDate(){
      console.log(Date());
      var myDate = new Date();
      var createTime = `${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()} ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
      console.log(createTime);
      return createTime
    },
    savaObj() {
      // this.getDate()
      // console.log(this.ruleForm,this.proName);
      this.$refs.formCustom.validate((valid) => {
        if (valid) {
          let cuserid = this.$store.state.userid;

          let qlrid = this.ruleForm.qlrid;
          // console.log(this.proName);

          for (let i = 0; i < this.proName.length; i++) {
            this.proName[i].qlrpid = this.ruleForm.qlrid;
          }

          // console.log(this.proName);
          let proName = JSON.stringify(this.proName);

          // let dlr = JSON.stringify(this.dlr)

          ApiSend.saveQlr({
            qjinid: this.$store.state.murl,
            cuserid: this.$store.state.userid,
            zzqlr: this.ruleForm.zzqlr,
            zjh: this.ruleForm.zjh,
            dhhm: this.ruleForm.dhhm,
            publicstate: proName,
            dlr: this.dlr.name,
            dlrzjh: this.dlr.zjh,
            ydlrgx: this.dlr.relation,
            qlrid: qlrid,
            createtime: this.getDate(),
          }).then((res) => {
            console.log(res);
            console.log(qlrid);
            ApiSend.saveHome({
              cuserid: cuserid,
              qlrid: qlrid,
              fwybm: this.ruleForm.fwybm,
              fwcs: this.ruleForm.fwcs,
              jcnf: this.ruleForm.jcnf,
              fwlx: this.ruleForm.fwlx,
            }).then((res) => {
              // console.log(res);
            });
            ApiSend.saveZjd({
              cuserid: cuserid,
              qlrid: qlrid,
              tdzh: this.ruleForm.tdzh,
              qlrwc: this.ruleForm.sfwc == true ? 1 : 0,
              wtzj: this.ruleForm.sfwtzj == true ? 1 : 0,

              zddm: this.ruleForm.zddm,
              zdmj: this.ruleForm.zdmj,
              zddz: this.ruleForm.zddz,
              zbdjyy: this.ruleForm.zbdjyy,
              zjdly: this.ruleForm.zjdly,
              djlx: this.ruleForm.djlx,
            }).then((res) => {
              // console.log(res);
            });
            // debugger
            ApiSend.sendDczt({ qlrid: qlrid }).then((res) => {
              console.log(res);
            });

            this.$router.go(-1);
          });
        }
      });
    },

    //提交表单
    // savaObj() {
    //   this.$refs.formCustom.validate((valid) => {
    //     if (valid) {
    //       if (
    //         this.f_obligee.oblname &&
    //         this.f_obligee.certificatetype &&
    //         this.f_obligee.certificatenumber
    //       ) {
    //         if (this.$store.state.lnglatXY) {
    //           var lnglat = this.$store.state.lnglatXY.split(",");
    //           this.f_obligee.lat = lnglat[0];
    //           this.f_obligee.lng = lnglat[1];
    //         }
    //         this.f_obligee.qjinid = this.qjid; //项目id

    //         this.f_obligee.fwybm = JSON.stringify(this.proFwybm); //房屋预编码
    //         this.f_obligee.publicstate = JSON.stringify(this.proName); //共有情况
    //         this.$route.params.qjinname = this.f_obligee.obladdress;
    //         const user = this.$store.state.auth.user;
    //         if (user) {
    //           this.f_obligee.userid = user.userid;
    //         }
    //         if (this.f_obligee.qjinid) {
    //           if (this.f_obligee.oblid == "") {
    //             this.f_obligee.oblid = this.tem_uuid;
    //             ApiObligee.saveObj(this.f_obligee)
    //               .then((response) => {
    //                 try {
    //                   this.$Message.success("保存成功！");
    //                   this.$router.go(-1);
    //                 } catch (e) {
    //                   console.log("数据处理失败：", e);
    //                 }
    //               })
    //               .catch((error) => {
    //                 this.$Message.error(error.message);
    //               });
    //           } else {
    //             ApiObligee.save(this.f_obligee)
    //               .then((response) => {
    //                 try {
    //                   this.$Message.success("保存成功！");
    //                   this.$router.go(-1);
    //                 } catch (e) {
    //                   console.log("数据处理失败：", e);
    //                 }
    //               })
    //               .catch((error) => {
    //                 this.$Message.error(error.message);
    //               });
    //           }
    //         } else {
    //           this.$Message.error("项目编号不能为空");
    //         }
    //       } else {
    //         this.$Message.error("请填写完整信息");
    //       }
    //     }
    //   });
    // }
    get_uuid() {
      // debugger
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      this.tem_uuid = uuid;
      //  debugger
      var tem_key = "";
      if (this.$route.params.id) {
        tem_key = this.$route.params.id;
      } else {
        tem_key = this.ruleForm.qlrid;
      }
      this.updata_sfz = {
        refid: tem_key,
        reftype: "身份证",
        filepath: tem_key + "/",
      };
      this.updata_hkb = {
        refid: tem_key,
        reftype: "户口本",
        filepath: tem_key + "/",
      };
      this.updata_tdz = {
        refid: tem_key,
        reftype: "土地证",
        filepath: tem_key + "/",
      };
      this.updata_fcz = {
        refid: tem_key,
        reftype: "房产证",
        filepath: tem_key + "/",
      };
      this.updata_fwyj = {
        refid: tem_key,
        reftype: "房屋远景",
        filepath: tem_key + "/",
      };
      this.updata_mph = {
        refid: tem_key,
        reftype: "门牌号",
        filepath: tem_key + "/",
      };
      this.updata_dcct = {
        refid: tem_key,
        reftype: "调查草图",
        filepath: tem_key + "/",
      };
      this.updata_dcbg = {
        refid: tem_key,
        reftype: "调查表格",
        filepath: tem_key + "/",
      };
      this.updata_qt = {
        refid: tem_key,
        reftype: "其它",
        filepath: tem_key + "/",
      };
    },
  },
};
</script>
<style lang="scss" >
.el-step__icon.is-text {
    border-radius: 50%;
    border: 0; 
    border-color: inherit;
}
.grsb_main_top{




.el-step__title.is-wait {
  font-size: 13px;
  transform: translateX(-4px);
    color: #BBD5EB;
}
.el-step__title.is-process {
    font-size: 13px;
    color: #BBD5EB;
    transform: translateX(-4px);
}
.el-step__title.is-finish {
    font-size: 13px;
    color: #2F62FF;
    transform: translateX(-4px);
}

  .el-step__head.is-finish{
    img{
      background-color:rgb(47, 98, 255);
    }
    
  }
}
.grsb-info .ivu-input {
  text-align: right;
  /* margin-top: 2px; */
  /* border-radius: 0px; */
}

.main_form {
  position: relative;
  .ivu-card-body {
    height: calc(100vh - 267px);
    overflow: auto;
  padding: 16px;
}
}
.ivu-steps .ivu-steps-head {
  background: #fff;
}
.tool-t {
  font-size: 28px;
  color: #0d1733;
}

.ivu-steps {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  font-size: 0;
  line-height: 1.5;
  background-color: #fff;
}
.ivu-steps-horizontal .ivu-steps-content {
  font-size: 20px;
  padding-left: 0px;
  /* font-weight: 400; */
}
.ivu-steps .ivu-steps-head-inner > .ivu-steps-icon.ivu-icon {
  font-size: 44px;
}
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner {
  background-color: #fff;
  border-color: #2d8cf0;
  width: 50px;
  height: 50px;
}
.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
  border-color: #2d8cf0;
  background-color: #2d8cf0;
  width: 50px;
  height: 50px;
}
.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner span,
.ivu-steps-item.ivu-steps-status-process
  .ivu-steps-head-inner
  > .ivu-steps-icon {
  color: #fff;
  display: none;
}
.ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner {
  background-color: #fff;
  width: 50px;
  height: 50px;
}
.ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner span,
.ivu-steps-item.ivu-steps-status-process
  .ivu-steps-head-inner
  > .ivu-steps-icon {
  color: #fff;
  display: none;
}
.ivu-steps .ivu-steps-tail {
  width: 100%;
  padding: 0 10px;
  position: absolute;
  left: 0;
  top: 25px;
}


.el-drawer__header {
  display: none;
}

.grsb-info .ivu-form-item-error-tip {
  z-index: 100;
  top: 30px;
  font-size: 12px;
}
.grsb-info {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f8f8fa;
  .ivu-divider-horizontal {
    height: 1px !important;
    color: #EDEFF2;
  }
  .fwdz {
    position: relative;
    .i_arrow {
      position: absolute;
      right: 0px;
      top: 12px;
    }
  }

  .area-select,
  .medium,
  .area-select-wrap {
    margin-left: 0px;
    width: auto;
    .area-selectable-list-wrap {
      width: 40vw;
    }
  }
  .le_name .ivu-form-item-content {
    margin-left: 0px !important;
  }
  .el-dialog {
    border-radius: 20px;
  }
  .sousu {
    /*margin: 0 20px;*/
    /*border: 4px solid white;*/
    outline: white;
    margin-bottom: 12px;
  }
  .form-i {
    
    .i-input__text {
      .ivu-input {
        text-align: left;
      }
    }
    .ivu-input {
      text-align: right;
    }
    .ivu-select {
      height: 21px;
      position: relative;
      text-align: right;

      .ivu-select-selection {
        -webkit-box-shadow: 0 0 0 2px #fff;
        border-color: white !important;
        border-radius: 2px;
        border: none;
        font-size: 20px;
        &:hover {
          /*background: #222222;*/
        }
      }
    }
  }

  .avatar_s {
    position: relative;
    /*margin: 0 auto 80px;*/
    /*width: 144px;*/
    /*height: 144px;*/
    width: 17px;
    height: 28px;
    background: url(../../../assets/images/ic_pic1.png) no-repeat center/contain;
  }
  .ivu-input {
    /*background-color:rgba(247,248,250,1) !important;*/
    border-color: white !important;
    height: 42px;

    /*margin-top: 2px;*/
    /*border-radius: 0px;*/
  }
  .ivu-select-placeholder {
    border-color: white !important;
    line-height: 20px;
  }
  .ivu-input:focus {
    outline: none;
    border: none;
    box-shadow: 0 0 0 2px transparent;
    border-bottom: 1.3px solid gainsboro;
  }
  .a_img {
    width: 18px;
    height: 18px;
    position: relative;
    top: 4px;
  }
  .icon-cl {
    float: right;
    /*margin-right: 12px*/
  }
  .ivu-form-item {
    margin-bottom: 1px;
  }
  .ivu-form-item-label {
    background-color: #ffffff;
    color: #333333;
    font-size: 14px;
    font-weight: unset;
    text-align: left;
    /*padding: 10px 12px 10px 10px;*/
    height: 42px;
    line-height: 22px;
  }
  .ivu-form-item-error-tip {
    padding-top: 2px;
  }
  .nr-form {
    margin-left: 10px;
  }
  .itme-form-i {
    background-color: #ffffff;
    height: 100px;
    margin-top: 1px;
    line-height: 50px;
  }
  .itme-form {
    background-color: #ffffff;
    height: 50px;
    margin-top: 1px;
    line-height: 50px;
  }
  .cl-i {
    font-size: 23px;
    color: #c7c7cc;
  }
  .g-mt-10 {
    /*margin-top: 10px;*/
  }
  .g-ml-15 {
    margin-left: 15px;
  }
  a {
    text-decoration: none;
  }
  .link-txt {
    margin-top: 12px;
    margin-right: 12px;
    width: 15px;
    float: left;
  }
  .link-input {
    /*width: 824px;*/
    height: 40px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #dcdcdc;
    padding-left: 15px;
    float: left;
    display: block;
    padding-right: 35px;
  }
  .addLink {
    width: 90px;
    height: 24px;
    border-radius: 2px;
    border: solid 1px #409eff;
    color: #409eff;
    line-height: 24px;
    text-align: center;
    display: inline-block;
    margin-left: 28px;
  }
  .delFw {
    position: absolute;
    top: 6px;
    right: 0px;
    cursor: pointer;
  }
  .delSingle {
    position: absolute;
    top: 10px;
    right: 38px;
    cursor: pointer;
  }
  .ivu-divider-horizontal {
    color: #EDEFF2;
    height: 0.8px;
    margin: 0px;
  }
}

.content-info {
  background-color: #f8f8fa;
  overflow: auto;
  height: 100%;
}
.footer-info {
  width: 92%;
  // height: 10%;
  /*background-color: #fff;*/
  position: fixed;
  left: 2px;
  bottom: 2px;
}
.el-tabs__nav {
  width: 100%;
}
.el-tabs__item {
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  width: 33%;
  height: 50px;
}
</style>
