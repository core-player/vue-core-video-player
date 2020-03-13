import Vue from 'vue'
import App from './App.vue'
import VueCoreVideoPlayer from './index'

Vue.config.productionTip = false

Vue.use(VueCoreVideoPlayer)

new Vue({
  render: h => h(App)
}).$mount('#app')
