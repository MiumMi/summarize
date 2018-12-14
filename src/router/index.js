/* global Vue VueRouter */
/* eslint no-undef: "error" */
import test from '@/page/test'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'test',
      component: test
    }
  ]
})
