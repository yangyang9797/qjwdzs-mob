<template>
  <div class="current">
    <div class="content">
      <!-- <div v-if="isLoat" class="load">
              <van-loading size="43px" type="spinner" color="#1989fa" vertical>加载中...</van-loading>
      </div> -->
      <div class="main_top">
        <div
          claas="grsb-head"
          style="
            display: flex;
            height: 49px;
            text-align: center;
            color: #fff;
            justify-content: space-between;
          "
        >
          <div
            class="nav_left"
            style="flex: 1; height: 49px; line-height: 49px; font-size: 16px"
            @click="handleGoback"
          >
            <img
              style="width: 16p; height: 16px"
              src="@/assets/images/back.png"
              alt=""
            />
          </div>
          <div
            class="nav_center"
            style="
              flex: 3;
              line-height: 49px;
              font-size: 18px;
              font-weight: 600;
            "
          >
            地块列表
          </div>
          <div
            class="nav_right"
            style="
              flex: 1;
              line-height: 49px;
              font-size: 14px;
              font-weight: 500;
            "
            @click="getGrsbInfo()"
          >
            信息录入
          </div>
        </div>
        <div class="nav_search" style="margin-top: 15px">
          <el-input
            v-model="search"
            class=""
            placeholder="请输入权利人姓名搜索"
          >
            <template slot="append" icon="el-icon-search"
              ><img
                src="static/imgs/search_icon.png"
                @click="handelSearch"
                style="width: 13px; height: 13px"
                alt=""
            /></template>
          </el-input>
        </div>
        <div class="tab_button">
          <div
            @click="handleDtlr"
            class="nav"
            :class="{ active: searchValue === 1 }"
          >
            当天录入({{ this.todayData.length }})
          </div>
          <div
            @click="handleZldb"
            class="nav"
            :class="{ active: searchValue === 2 }"
          >
            资料待补({{ this.lackData.length }})
          </div>
          <div
            @click="handleZglr"
            class="nav"
            :class="{ active: searchValue === 3 }"
          >
            总共录入({{ this.allData.length }})
          </div>
        </div>
      </div>

      <div class="qlr_data_list" v-if="this.allData.length != 0">
        <div v-if="searchValue == 1">
          <div v-for="item in todayData" :key="item.qlrid">
            <QlrDataList :dataList="item" />
          </div>

          <div
            v-if="Object.keys(todayData).length == 0"
            style="text-align: center"
          >
            <img class="b_img" src="static/imgs/bg.png" />
            <span style="display: block; color: #b2b2b2; margin-top: 5px"
              >暂无数据</span
            >
          </div>
        </div>
        <div v-else-if="searchValue == 2">
          <div v-for="item in lackData" :key="item.qlrid">
            <QlrDataList :dataList="item" />
          </div>

          <div
            style="text-align: center"
            v-if="Object.keys(lackData).length == 0"
          >
            <img class="b_img" src="static/imgs/bg.png" />
            <span style="display: block; color: #b2b2b2; margin-top: 5px"
              >暂无数据</span
            >
          </div>
        </div>
        <div v-else-if="searchValue == 3">
          <div v-for="item in allData" :key="item.qlrid">
            <QlrDataList :dataList="item" />
          </div>

          <div
            style="text-align: center"
            v-if="Object.keys(allData).length == 0"
          >
            <img class="b_img" src="static/imgs/bg.png" />
            <span style="display: block; color: #b2b2b2; margin-top: 5px"
              >暂无数据</span
            >
          </div>
        </div>

        <div v-else-if="searchValue == 4">
          <div v-for="item in searchData" :key="item.qlrid">
            <QlrDataList :dataList="item" />
          </div>

          <div
            style="text-align: center"
            v-if="Object.keys(searchData).length == 0"
          >
            <img class="b_img" src="static/imgs/bg.png" />
            <span style="display: block; color: #b2b2b2; margin-top: 5px"
              >暂无数据</span
            >
          </div>
        </div>
      </div>

      <div v-else style="text-align: center">
        <img class="b_img" src="static/imgs/bg.png" />
        <span style="display: block; color: #b2b2b2; margin-top: 5px"
          >暂无数据</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import QlrDataList from "./qlr-data-list";
import ApiSearch from "../../api/api-search";
import ApiSend from "../../api/api-send";
import ApiAuth from "../../api/api-auth";

import { mapActions } from "vuex";

export default {
  name: "",
  components: {
    QlrDataList,
  },
  data() {
    return {
      search: "",
      searchValue: 1,
      searchData: [],
      todayData: [],
      lackData: [],
      allData: [],
    };
  },
  beforeCreate() {},
  created() {
    // 拿到微信登录的userid
    // console.log(window.location.href);
    let href = window.location.href;
    let a = (href || "").split("?")[1];
    // console.log(a);
    let b = (a || "").split("=")[1];
    // console.log(b);

    if(b){
      this.getUser(b);
    }

    if (this.$store.state.userid) {
      this.handleDtlr();
      this.handleZldb();
      this.handleZglr();
    }
  },

  methods: {
    ...mapActions("auth", ["Login"]),

    handleGoback() {
      this.$router.push("/login");
    },

    getUser(b) {
      // console.log(1);
      ApiAuth.checkUserName({
        username: b,
        code: "888888",
        isupCode: 1,
      }).then((res) => {
        // debugger

        // console.log(res);
        this.Login({ username: b, password: "888888" }).then((res) => {
          // console.log(res.userid);
          this.$store.state.userid = res.userid;
          this.handleDtlr();
          this.handleZldb();
          this.handleZglr();

          that.$emit("on-success-login", { user, res });
          localStorage.setItem("user", JSON.stringify(user));
        });
      });
    },

    handleDtlr() {
      this.searchValue = 1;
      ApiSearch.toDayInfo({ cuserid: this.$store.state.userid }).then(
        (response) => {
          try {
            if (response.status == 200) {
              this.todayData = response.data.data;
              // console.log(this.todayData, response);
            }
          } catch (e) {
            console.log("数据处理失败：", e);
          }
        }
      );
    },

    handleZldb() {
      this.searchValue = 2;

      ApiSearch.lackInfo({ cuserid: this.$store.state.userid }).then(
        (response) => {
          try {
            if (response.status == 200) {
              this.lackData = response.data.data;
              // console.log(this.lackData, response);
            }
          } catch (e) {
            console.log("数据处理失败：", e);
          }
        }
      );
    },
    handleZglr() {
      this.searchValue = 3;
      // console.log(this.searchValue);
      ApiSearch.allInfo({ cuserid: this.$store.state.userid }).then(
        (response) => {
          try {
            if (this.allData == response.data.data) {
              return;
              // console.log(this.allData, response);
            } else {
              this.allData = response.data.data;
            }
          } catch (e) {
            console.log("数据处理失败：", e);
          }
        }
      );
    },

    handelSearch() {
      this.searchValue = 4;

      ApiSearch.searchInfo({
        zzqlr: this.search,
        cuserid: this.$store.state.userid,
      }).then((res) => {
        // console.log(res);
        this.searchData = res.data.data;
      });
    },

    getGrsbInfo() {
      ApiSend.deleteNull().then((res) => {
        console.log(res);
      });

      //新增
      this.$router.push({
        name: "grsbinfo",
        params: {},
      });
    },
  },
};
</script>
<style lang="scss">
.qlr_data_list {
  overflow: auto;
  height: calc(100vh - 166px);
}
.app-comm-content {
  height: 100%;
}
.nav_search {
  width: 92%;
  margin: 0 auto;
  .el-input-group--append .el-input__inner,
  .el-input-group__prepend {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    height: 28.5px;
    line-height: 28.5px;
  }
  .el-input-group--prepend .el-input__inner,
  .el-input-group__append {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    background-color: #fff;
  }
}

.main_top {
  height: 166px;
  background-color: #2f62ff;
  .el-button--default {
    color: #fff;
    background-color: #2f62ff;
    border-color: #2f62ff;
  }
}
.current {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f8f8fa;

  .b_img {
    width: 29%;
    height: 29%;
    margin-top: 20%;
  }
}

.content {
  background-color: #f8f8fa;
  overflow: auto;
  height: 100%;
}
.footer {
  width: 92%;
  height: 10%;
  /*background-color: #fff;*/
  position: fixed;
  /*left: 0;*/
  bottom: 2;
}
.tab_button {
  .nav {
    color: rgba($color: #fff, $alpha: 0.59);
    font-size: 14px;
  }
  .active {
    color: #fff;
    font-size: 14px;
    border-bottom: 2px solid #fff;
  }
  display: flex;
  width: 100%;
  margin-top: 27px;
  justify-content: space-around;
}
</style>
