import Vue from 'vue'
import App from './App.vue'
import { VuePluginI18n } from './plugins'

import './style/common.less'

Vue.config.productionTip = false

Vue.use(VuePluginI18n)

new Vue({
  render: h => h(App)
}).$mount('#app')
