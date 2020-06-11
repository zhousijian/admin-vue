import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from 'echarts'
// import 'swiper/dist/css/swiper.css';
Vue.prototype.$echarts = echarts
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false;

import './scss/base.scss';


// typeof (localStorage.getItem('jwt_token')) ==undefined
// if (localStorage.getItem('jwt_token')){
//   window.location.href='http://shadou.cn/'
//   window.history.back(-1);
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
