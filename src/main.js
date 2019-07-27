// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import MetaInfo from 'vue-meta-info'
// mock
// import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

Vue.config.productionTip = false
Vue.use(MetaInfo)
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
