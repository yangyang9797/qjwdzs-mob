<template>
  <ul class="hzz-form">
    <li v-for="item in model" :key="item.prop" :class="item.class" :style="item.style">
      <svg class="icon" aria-hidden="true" v-if="item['left-icon']">
        <use :xlink:href="item['left-icon']"></use>
      </svg>

      <van-button v-if="item.type==='button'" v-bind="item.bind" @click="item.click">{{item.label}}</van-button>
      
      <template v-else-if="item.type==='calendar'">
        <van-field readonly clickable v-model="data[item.prop]" v-bind="item.bind" @click="item.showPicker=true"></van-field>
        <van-calendar v-model="item.showPicker" @confirm="(date) => {item.showPicker = false;item.confirm(date)}" />
      </template>

      <slot v-else-if="item.type==='slot'"></slot>
      <van-field v-else :type="item.type" v-bind="item.bind" v-model="data[item.prop]"></van-field>

      <!-- 考虑密码框右侧图标用于控制密码显示和隐藏 -->
      <template v-if="item['right-icon']">
        <svg v-if="/^#/.test(item['right-icon'])" class="icon" aria-hidden="true">
          <use :xlink:href="item['right-icon']"></use>
        </svg>
        <slot v-if="item['right-icon']==='slot'"></slot>
        <van-icon v-else :name="item['right-icon']" @click.native="item.rightIconClick"></van-icon>
      </template>
      
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    model: {
      type: Array,
      default() {
        return [
          { prop: 'username', 'left-icon': '#van-icon-user', bind: {} },
          { prop: 'password', type: 'password', bind: {} }
        ]
      }
    },
    data: {
      type: Object,
      default() {
        return {
          username: 'huzouzou'
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.hzz-form {
  > li {
    display: flex;
    align-items: center;
  }
}
</style>