// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* global Vue */
/* eslint no-undef: "error" */
import App from './App'
import router from './router'
import app from '@/lib/app'

Vue.prototype.$app = app
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
