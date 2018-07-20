import Vue from 'vue'
import Router from 'vue-router'
{{{components}}}
// eslint-disable-next-line
Vue.use(Router)

// eslint-disable-next-line
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/{{baseName}}'
    },{{{routers}}}
  ]
})
