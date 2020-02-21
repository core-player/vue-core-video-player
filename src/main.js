import Vue from 'vue'
import App from './App.vue'
import VueCoreVideoPlayer from './index'

import './style/common.less'

Vue.config.productionTip = false

Vue.use(VueCoreVideoPlayer)

new Vue({
  render: h => h(App)
}).$mount('#app')
