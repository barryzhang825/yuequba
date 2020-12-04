import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import '../theme/index.css'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

import { emoji } from './assets/emoji/emoji.js'
Vue.prototype.emoji = emoji


import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

//图片显示Host
Vue.prototype.$baseUrl = 'http://ds-z.com/upload/'
//项目地址Host
Vue.prototype.$baseHost = 'http://ds-z.com'

import Contact from "./components/pc/Contact";
Vue.component('Contact', Contact)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
