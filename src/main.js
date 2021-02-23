import Vue from 'vue'
import App from './App'
import ocv from './views/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'area-linkage-vue/dist/index.css';
import './styles/table.scss'
import './styles/app-comm.css'
import qjydcRouterre from './router'
import qjydcStore from './store'
import AMap from "vue-amap";//高德地图
// import datas from './datas/index.js'
import { Area } from 'vant';
import { Form } from 'vant';
import { Picker } from 'vant';

Vue.use(Form);
Vue.use(Picker);
Vue.use(Area);
Vue.use(ElementUI);
Vue.use(AMap);

Vue.prototype.$bus = new Vue()
// 配置首页
ocv.opts.RouterConfig.opt.routes.unshift({path: '/', redirect: '/login'})
// 取消认证不拦截
ocv.opts.RouterConfig.authRequired = false;
const eventBus = new Vue()//兄弟组件传值

console.info("ocv选项", ocv.opts);
ocv.opts.StoreConfig.opt.modules.qjydc = qjydcStore;


const store = ocv.opts.StoreConfig.install();

ocv.opts.RouterConfig.opt.routes = qjydcRouterre.concat(ocv.opts.RouterConfig.opt.routes)

console.info("routes", ocv.opts.RouterConfig.opt.routes);
const router = ocv.opts.RouterConfig.install(store);
const vue = new Vue({
  el: '#app',
  ...ocv.opts,
  store,
  router,
  render: h => h(App),
  data: {
    eventBus
  }
})
window.vue = vue;

// 设置用户信息
/*vue.$nextTick(() => {
  // vue.$store.dispatch('auth/SetToken', datas.userinfo);
  vue.$store.commit('auth/setRoutersData', datas.funcs)
  router.addRoutes(store.state.auth.permission.routers)
  // 动态添加可访问路由表
  console.info("动态添加路由表", store.state.auth.permission.routers)
})*/

