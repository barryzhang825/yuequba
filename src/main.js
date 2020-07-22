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

Vue.prototype.$baseUrl = 'http://yuequba.zhengshangwl.com/upload/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
