<template>
  <div class="qlr_main">
    <div class="qlr">
      <div class="qlr_top"  @click="jumpToDetail">
        <div style="font-size: 17px; font-weight: bold">
          {{ this.dataList.zzqlr }}
        </div>
        <p
          style="color: #12CCA2; font-size: 13px; font-weight: 100"
          v-if="this.dataList.dczt == 'ywc'"
        >
          已完成
        </p>
        <p
          style="color: #ff5b5b; font-size: 13px; font-weight: 100"
          v-else
        >
          待补
        </p>
      </div>
      <div class="qlr_middle"  @click="jumpToDetail">
        <div style="font-size:14px;color:#666666;height:45px;overflow:hidden;text-overflow:ellipsis;padding: 5px 0;">{{this.dataList.zddz}}</div>
        <div style="color:#B2B2B2;font-size:13px;padding-top:7px">{{this.dataList.createtime}}</div>
      </div>
      <div class="qlr_bottom">
        <div style="line-height:40px;border-right: 1px solid #F5F5F5;flex:1;margin:0 auto;    text-align: center;
    height: 40px;"  @click="jumpToDetail">
          <img class="img_list" src="static/imgs/edit.png" alt="">
          <p style="display:inline;font-size:13px;font-weight:100;margin-left:7px;">编辑</p>
        </div>
        <div style="line-height:40px;flex:1;    text-align: center;
    height: 40px;" @click="deleteList">
          <img class="img_list" src="static/imgs/delete.png" alt="">
          <p style="display:inline;font-size:13px;font-weight:100;margin-left:7px;color:#F7B500;">删除</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiSend from "../../api/api-send";
import ApiSearch  from "../../api/api-search";

export default {
  inject:['reload'],
  props: {
    dataList: Object,
  },
  methods: {
    jumpToDetail() {
      this.$router.push(`qlrdetail/${this.dataList.qlrid}`);
    },
    deleteList() {

      this.$confirm('确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          ApiSend.deleteByid({ id: this.dataList.qlrid }).then((res) => {
            // this.$router.go(0);
            // location.reload()
            this.reload()
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(()=>{
           this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })

       

    }
  },
};
</script>

<style lang="scss">
.el-message-box{
  width: 300px;
}
.qlr {
  width: 90%;
  height: 169px;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  border-radius: 4px;
  margin-top: 10px;
  padding: 15px;
  flex-direction: column;
}
.qlr_top {
  flex:1;
  display: flex;
  justify-content: space-between;
}
.qlr_middle{
  flex:2;
}
.qlr_bottom{
  border-top: 1px solid #F5F5F5;
  flex:1;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  /* background-color: red; */
}
.img_list{
  transform: translateY(3px);
  width: 14px;
  height: 14px;
}
</style>